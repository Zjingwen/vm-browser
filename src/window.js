window = this;
var Window = function Window() {
  throw new TypeError("Illegal constructor");
};
catvm.safefunction(Window);
Object.defineProperties(Window.prototype, {
  [Symbol.toStringTag]: {
    value: "Window",
    configurable: true,
  },
});
let Request = {};
let Headers = {};
let navigator = {};

let document = {
  addEventListener(type, listener, options, useCapture) {
    console.log("[document.addEventListener]", arguments);
  },
};

window.setTimeout = function setTimeout(x, d) {
  console.log(arguments);
  typeof x == "function" ? x() : undefined;
  typeof x == "string" ? eval(x) : undefined;
  return 0;
};
location.href = "https://www.douyin.com/discover";
