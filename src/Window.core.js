import Safefunction from "./Safefunction.js";
import WindowProperties from "./WindowProperties";

let Window = function Window() {
  throw new TypeError("Illegal constructor");
};
Window.prototype.PERSISTENT = 1;
Window.prototype.TEMPORARY = 0;

Safefunction(Window);
Object.defineProperties(Window.prototype, {
  [Symbol.toStringTag]: {
    value: "Window",
    configurable: true,
  },
});
Window.prototype.__proto__ = WindowProperties.prototype;

export default Window;
