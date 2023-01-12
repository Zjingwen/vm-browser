const parser = require("@babel/parser");
const generate = require("@babel/generator").default;
const traverse = require("@babel/traverse").default;
const types = require("@babel/types");

const fs = require("fs");
const code = fs.readFileSync(`${__dirname}/webmssdk.js`, "utf-8");

const ast = parser.parse(code, { sourceType: "module" });

const visitor = {
  FunctionDeclaration(path) {
    // path.scope.dump();

    const { id } = path.node;
    const binding = path.scope.parent.getBinding(id.name);

    if (!binding || binding.constantViolations.length > 0) {
      return;
    }

    if (binding.referencePaths.length === 0) {
      path.remove();
    }
  },
  VariableDeclarator(path) {
    const binding = path.scope.getBinding(path.node.id.name);

    // 如标识符被修改过，则不能进行删除动作。
    if (!binding || binding.constantViolations.length > 0) {
      return;
    }

    // 未被引用
    if (!binding.referenced) {
      path.remove();
    }

    // 被引用次数为0
    // if (binding.references === 0) {
    //     path.remove();
    // }

    // 长度为0，变量没有被引用过
    // if (binding.referencePaths.length === 0) {
    //     path.remove();
    // }
  },
  enter(path) {
    if (
      types.isBooleanLiteral(path.node.test) ||
      types.isNumericLiteral(path.node.test)
    ) {
      if (path.node.test.value) {
        path.replaceInline(path.node.consequent.body);
      } else {
        if (path.node.alternate) {
          path.replaceInline(path.node.alternate.body);
        } else {
          path.remove();
        }
      }
    }
  },
  EmptyStatement(path) {
    path.remove();
  },
  CallExpression(path) {
    let callee = path.get("callee");
    let arguments = path.get("arguments");

    if (!types.isFunctionExpression(callee) || arguments.length === 0) {
      // 实参的长度判断可以写死
      return;
    }

    // 获取形参
    let params = callee.get("params");
    let scope = callee.scope;

    for (let i = 0; i < arguments.length; i++) {
      // 遍历实参， 因为形参可能比实参长
      let arg = params[i];
      let { name } = arg.node;

      const binding = scope.getBinding(name);

      if (!binding || binding.constantViolations.length > 0) {
        // 形参发生改变，不能被还原
        continue;
      }

      for (refer_path of binding.referencePaths) {
        // 字面量可以直接替换
        refer_path.replaceWith(arguments[i]);
      }

      arg.remove();
      arguments[i].remove();
    }
  },
};
traverse(ast, visitor);
const result = generate(ast);
fs.writeFileSync(`${__dirname}/core.js`, result.code, "utf-8");
