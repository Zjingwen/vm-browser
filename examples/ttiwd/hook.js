import safefunction from "../../lib/safefunction";

try {
  window = {};
  var Window = function Window() {
    throw new TypeError("Illegal constructor");
  };

  safefunction(Window);

  Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
      value: "Window",
      configurable: true,
    },
  });

  window.__proto__ = Window.prototype;

  window.Object = function Object() {};
  safefunction(window.Object);

  document = {};
  document.referrer = "";
} catch (error) {
  console.log(error);
}

try {
  window = new Proxy(window, {
    set(target, property, value) {
      console.log("set", target, property);
      return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
      console.log("get", target, property);
      return target[property];
    },
  });
} catch (error) {
  console.log("[window]:", error);
}
