import fs from "fs";
import path from "path";

const core = fs.readFileSync(
  `${path.resolve()}/examples/core/index.1.js`,
  "utf-8"
);
const hook = fs.readFileSync(`${path.resolve()}/dist/index.esm.js`, "utf-8");

const code = `
try {
  ${hook}\r\n
  ${core}\r\n
 debugger;
} catch (error) {
  console.log('[code]:',error)  
}
`;
eval(code);
