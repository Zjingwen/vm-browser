const { VM, VMScript } = require("vm2");
const fs = require("fs");
var vmtools = require('./src/vm/tools.node');
const test = fs.readFileSync(`${__dirname}/public/code.js`, "utf-8");
// const test = fs.readFileSync(`${__dirname}/win.js`, "utf-8");
const window = fs.readFileSync(`${__dirname}/src/window.js`, "utf-8");

const vm = new VM({});
const script = new VMScript(`${vmtools.GetCode()}\r\n${window}\r\n${test}`, `${__dirname}/debug.js`);

debugger;
console.log(vm.run(script));
debugger;
