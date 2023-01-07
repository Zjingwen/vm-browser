const { VM, VMScript } = require("vm2");
const fs = require("fs");
const file = fs.readFileSync(
  `${__dirname}/examples/vm2/webmssdk.es5.js`,
  "utf-8"
);
const hook = fs.readFileSync(`${__dirname}/examples/vm2/code.js`, "utf-8");

const vm = new VM();
let script = null;
try {
  script = new VMScript(`${hook}\r\n${file}`, `${__dirname}/debugger.js`).compile();
} catch (err) {
  console.error("Failed to compile script.", err);
}

try {
  vm.run(script);
} catch (err) {
  console.error("Failed to execute script.", err);
}

process.on("uncaughtException", (err) => {
  console.error("Asynchronous error caught.", err);
});
