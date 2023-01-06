const { VM, VMScript } = require("vm2");
const fs = require("fs");
const file = fs.readFileSync(
  `${__dirname}/examples/vm2/index.1.test.js`,
  "utf-8"
);
const vm = new VM();
let script = null;

try {
  script = new VMScript(file, `${__dirname}/debugger.js`).compile();
} catch (err) {
  console.error("Failed to compile script.", err);
}

try {
  vm.run(file);
} catch (err) {
  console.error("Failed to execute script.", err);
}

process.on("uncaughtException", (err) => {
  console.error("Asynchronous error caught.", err);
});
