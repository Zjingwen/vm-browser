const { VM, VMScript } = require("vm2");
const fs = require("fs");
console.log(__dirname);
const webmssdk = fs.readFileSync(`${__dirname}/webmssdk.js`, "utf-8");

const vm = new VM({});
const script = new VMScript(`${webmssdk}`, `${__dirname}/debug.js`);

debugger;
console.log(vm.run(script));
debugger;
