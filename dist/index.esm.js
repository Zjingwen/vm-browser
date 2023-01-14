//框架代理功能
function Proxy$1 (o, title = 'Proxy') {
  return new Proxy(o, {
    set(target, property, value) {
      console.table([
        { 
          类型: `${title} set-->`, 
          调用者: target, 
          属性: property, 
          值: value 
        },
      ]);

      return Reflect.set(...arguments);
    },
    get: function (target, property, receiver) {
      console.table([
        {
          类型: `${title} get-->`,
          调用者: target,
          属性: property,
          值: target[property],
        },
      ]);

      return target[property];
    },
  });
}

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

var Safefunction = (func) => {
  set_native(
    func,
    myFunction_toString_symbol,
    `function ${
      (func.name || "")
    }() { [native code] }`
  );
};

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

window.localStorage = Proxy$1(window.localStorage, "window.localStorage");

window.sessionStorage = class sessionStorage {};

window.sessionStorage.getItem = function getItem() {};
Safefunction(window.sessionStorage.getItem);

window.sessionStorage.setItem = function setItem() {};
Safefunction(window.sessionStorage.setItem);

window.sessionStorage.removeItem = function removeItem() {};
Safefunction(window.sessionStorage.removeItem);

window.sessionStorage = Proxy$1(window.sessionStorage, "window.sessionStorage");

Window = Proxy$1(Window, "Window");
window = Proxy$1(window, "window");

let Document = function Document() {
  throw new TypeError("Illegal constructor");
};

Safefunction(Document);
Object.defineProperties(Document.prototype, {
  [Symbol.toStringTag]: {
    value: "Document",
    configurable: true,
  },
});
////////////////////////////////

////////////////////////////////

var document = {};
document.__proto__ = Document.prototype;

document.referrer = "https://www.douyin.com/discover";
document.cookie = "";

Document = Proxy$1(Document, "Document");
document = Proxy$1(document, "document");

var Location = function Location() {
  //构造函数
  throw new TypeError("Illegal constructor");
};
Safefunction(Location);

Object.defineProperties(Location.prototype, {
  [Symbol.toStringTag]: {
    value: "Location",
    configurable: true,
  },
});

/////////////////////////////

var location = {};
location.__proto__ = Location.prototype;

location.href = "https://www.douyin.com/discover";
location.protocol = "https:";

for (let prototype_ in Location.prototype) {
  location[prototype_] = Location.prototype[prototype_];

  Location.prototype.__defineGetter__(prototype_, function () {
    throw new TypeError("Illegal constructor");
  });
}

/////////////////////////////

location = Proxy$1(location);

var Navigator = function Navigator() {
  //构造函数
  throw new TypeError("Illegal constructor");
};
Safefunction(Navigator);

Object.defineProperties(Navigator.prototype, {
  [Symbol.toStringTag]: {
    value: "Navigator",
    configurable: true,
  },
});

/////////////////////////////
Navigator.prototype.plugins = [];
Navigator.prototype.language = ["zh-CN", "zh"];
Navigator.prototype.userAgent =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:95.0) Gecko/20100101 Firefox/95.0";

var navigator = {};
navigator.__proto__ = Navigator.prototype;

for (let prototype_ in Navigator.prototype) {
  navigator[prototype_] = Navigator.prototype[prototype_];

  Navigator.prototype.__defineGetter__(prototype_, function () {
    throw new TypeError("Illegal constructor");
  });
}

/////////////////////////////

navigator = Proxy$1(navigator);