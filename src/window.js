import Proxy from "./Proxy.js";
import Safefunction from "./Safefunction.js";

let window = {};

let Window = function Window() {
  throw new TypeError("Illegal constructor");
};

Safefunction(Window);

Object.defineProperties(Window.prototype, {
  [Symbol.toStringTag]: {
    value: "Window",
    configurable: true,
  },
});

////////////////////////  补代码

////////////////////////

window = {
  __proto__: Window.prototype,
};

Window = Proxy(Window);
window = Proxy(window);

export default window;
