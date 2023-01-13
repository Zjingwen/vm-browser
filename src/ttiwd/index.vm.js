let { VM, VMScript } = require("vm2");
let fs = require("fs");
const core = fs.readFileSync(`${__dirname}/core/webmssdk.core.2.js`, "utf-8");
const hook = fs.readFileSync(`${__dirname}/hook.2.js`, "utf-8");
const vm = new VM({});
const script = new VMScript(
  `${hook};;;\n\r${core}`,
  `${__dirname}/debugger.js`
);

debugger;
console.log(vm.run(script));
debugger;
