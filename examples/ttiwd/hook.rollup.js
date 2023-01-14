//主要用来保护伪造的函数,让其难被识破
const $toString = Function.toString;
const myFunction_toString_symbol = Symbol(
  "(".concat("", ")_", (Math.random() + "").toString(36))
);
const myToString = function () {
  return (
    (typeof this == "function" && this[myFunction_toString_symbol]) ||
    $toString.call(this)
  );
};

function set_native(func, key, value) {
  Object.defineProperty(func, key, {
    enumerable: false,
    configurable: true,
    writable: true,
    value: value,
  });
}
delete Function.prototype["toString"]; //删除原型链上的toString
set_native(Function.prototype, "toString", myToString); //自己定义个 getter 方法
set_native(
  Function.prototype.toString,
  myFunction_toString_symbol,
  "function toString(){ [native code] }"
); //套个娃 保护我们定义的toString 否则就暴露了

var safefunction = (func) => {
  set_native(
    func,
    myFunction_toString_symbol,
    `function ${
      (func.name || "")
    }() { [native code] }`
  );
};

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
