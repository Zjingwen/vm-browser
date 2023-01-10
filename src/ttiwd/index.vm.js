let { VM, VMScript } = require("vm2");
let fs = require("fs");
const core = fs.readFileSync(`${__dirname}/core/webmssdk.core.js`, "utf-8");
const hook = fs.readFileSync(`${__dirname}/hook.rollup.js`, "utf-8");
const vm = new VM({});
const script = new VMScript(`${hook};;;\n\r${core}`, `${__dirname}/debugger.js`);

try {
  debugger;
  console.log(vm.run(script));
  debugger;
} catch (error) {
  console.log("error", error);
}
