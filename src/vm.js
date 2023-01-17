import { VM, VMScript } from "vm2";
import fs from "fs";
import path from "path";

const core = fs.readFileSync(
  `${path.resolve()}/examples/core/index.1.js`,
  "utf-8"
);
const hook = fs.readFileSync(`${path.resolve()}/dist/index.esm.js`, "utf-8");

const vm = new VM({});

const code = `
try {
  var process = {
    env:{
      "NODE_ENV": "dev",
    }
  }
  ${hook}\r\n
  ${core}\r\n
 debugger;
} catch (error) {
  console.log('[code]:',error)  
}
`;

const script = new VMScript(code, `${path.resolve()}/debugger.js`);

debugger;
console.log(vm.run(script));
debugger;
