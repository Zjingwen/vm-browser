const { VM, VMScript } = require("vm2");
const fs = require("fs");
const file = fs.readFileSync(`${__dirname}/webmssdk.js`, "utf-8");
const hook = fs.readFileSync(`${__dirname}/hook.js`, "utf-8");
try {
  const vm = new VM();
  let script = new VMScript(`${hook};;;;;\n\r${file}`, `${__dirname}/debugger.js`);
  console.log(vm.run(script));
} catch (err) {
  console.error("Failed to compile script.", err);
}
