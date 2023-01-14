import Proxy from "./Proxy.js";
import Safefunction from "./Safefunction.js";
// import WindowProperties from "./WindowProperties";

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
// Window.prototype.__proto__ = WindowProperties.prototype;
////////////////////////  补代码

////////////////////////
var window = {};
window.__proto__ = Window.prototype;

window.Object = Object;
window.RegExp = RegExp;

window.localStorage = class localStorage {};

window.localStorage.getItem = function getItem() {};
Safefunction(window.localStorage.getItem);

window.localStorage.setItem = function setItem() {};
Safefunction(window.localStorage.setItem);

window.localStorage.removeItem = function removeItem() {};
Safefunction(window.localStorage.removeItem);

window.localStorage = Proxy(window.localStorage, "window.localStorage");

window.sessionStorage = class sessionStorage {};

window.sessionStorage.getItem = function getItem() {};
Safefunction(window.sessionStorage.getItem);

window.sessionStorage.setItem = function setItem() {};
Safefunction(window.sessionStorage.setItem);

window.sessionStorage.removeItem = function removeItem() {};
Safefunction(window.sessionStorage.removeItem);

window.sessionStorage = Proxy(window.sessionStorage, "window.sessionStorage");

Window = Proxy(Window, "Window");
window = Proxy(window, "window");

export default window;
