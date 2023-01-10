console.log("hook");
var window = {};
function hookProxy(e, title = "hookProxy") {
  return new Proxy(e, {
    set(target, property, value) {
      console.log(`[${title}] set`, target, property, value);
      return Reflect.set(...arguments);
    },
    get(target, property) {
      console.log(`[${title}] set`, target, property, target[property]);
      return target[property];
    },
  });
}

window = hookProxy(window, "window");

// var window = function window() {
//   throw new TypeError("Illegal constructor");
// };
// safefunction(window);
// Object.defineProperties(window.prototype, {
//   [Symbol.toStringTag]: {
//     value: "window",
//     configurable: true,
//   },
// });
// var location = {};
// hookProxy(window);
// hookProxy(location);

// var location = {};
// var window = {};
// // var window = function window() {
// //   throw new TypeError("Illegal constructor");
// // };
// // safefunction(window);
// // Object.defineProperties(window.prototype, {
// //   [Symbol.toStringTag]: {
// //     value: "window",
// //     configurable: true,
// //   },
// // });
// let Request = {};
// let Headers = {};
// let navigator = {};
// let document = {
//   addEventListener(type, listener, options, useCapture) {
//     console.log("[document.addEventListener]", arguments);
//   },
// };

// window.setTimeout = function setTimeout(x, d) {
//   typeof x == "function" ? x() : undefined;
//   typeof x == "string" ? eval(x) : undefined;
//   return 0;
// };
// window.Object = Object;
// window.sessionStorage = {
//   getItem: () => {
//     console.log("getItem", arguments);
//   },
//   setItem: () => {
//     console.log("setItem", arguments);
//   },
// };

// location.href = "https://www.douyin.com/discover";
// function safefunction(func1) {
//   const $toString = Function.toString;
//   const myFunction_toString_symbol = Symbol(
//     "(".concat("", ")_", (Math.random() + "").toString(36))
//   );
//   const myToString = function () {
//     return (
//       (typeof this == "function" && this[myFunction_toString_symbol]) ||
//       $toString.call(this)
//     );
//   };

//   function set_native(func, key, value) {
//     Object.defineProperty(func, key, {
//       enumerable: false,
//       configurable: true,
//       writable: true,
//       value: value,
//     });
//   }
//   delete Function.prototype["toString"]; //删除原型链上的toString
//   set_native(Function.prototype, "toString", myToString); //自己定义个 getter 方法
//   set_native(
//     Function.prototype.toString,
//     myFunction_toString_symbol,
//     "function toString(){ [native code] }"
//   ); //套个娃 保护我们定义的toString 否则就暴露了
//   set_native(
//     func1,
//     myFunction_toString_symbol,
//     `function ${
//       (myFunction_toString_symbol, func1.name || "")
//     }() { [native code] }`
//   );
// }
// window.Object = new Proxy(window.Object, {
//   set(target, property, value) {
//     console.log("set", target, property, value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("get", target, property, target[property]);
//     return target[property];
//   },
// });
// window = new Proxy(window, {
//   set(target, property, value) {
//     console.log("set", target, property, value);
//     return Reflect.set(...arguments);
//   },
//   get(target, property, receiver) {
//     console.log("get", target, property, target[property]);
//     return target[property];
//   },
// });
