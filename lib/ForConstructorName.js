const seenBefore = new Set();
let indent = "";
let obj = window;
while (obj) {
  const proto = Object.getPrototypeOf(obj);
  if (seenBefore.has(proto)) {
    // Paranoia
    console.log("Got something we've seen before; breaking the loop");
    break;
  }
  seenBefore.add(proto);
  console.log(`${indent}${proto?.constructor?.name}`);
  indent += "  ";
  obj = proto;
}
