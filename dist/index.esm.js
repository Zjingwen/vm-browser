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

let EventTarget$1 = function EventTarget() {};

Safefunction(EventTarget$1);

Object.defineProperties(EventTarget$1.prototype, {
  [Symbol.toStringTag]: {
    value: "EventTarget",
    configurable: true,
  },
});

EventTarget$1.prototype.addEventListener = function addEventListener(
  type,
  callback
) {
  debugger;
};
Safefunction(EventTarget$1.prototype.addEventListener);

EventTarget$1.prototype.dispatchEvent = function dispatchEvent() {
  debugger;
};
Safefunction(EventTarget$1.prototype.dispatchEvent);

EventTarget$1.prototype.removeEventListener = function removeEventListener(
  type,
  listener,
  options,
  useCapture
) {
  debugger;
};
Safefunction(EventTarget$1.prototype.removeEventListener);

let WindowProperties = function WindowProperties() {};

Safefunction(WindowProperties);

Object.defineProperties(WindowProperties.prototype, {
  [Symbol.toStringTag]: {
    value: "WindowProperties",
    configurable: true,
  },
});

WindowProperties.prototype.constructor = EventTarget$1;
WindowProperties.prototype.__proto__ = EventTarget$1.prototype;

let Window$1 = function Window() {
  throw new TypeError("Illegal constructor");
};
Window$1.prototype.PERSISTENT = 1;
Window$1.prototype.TEMPORARY = 0;

Safefunction(Window$1);
Object.defineProperties(Window$1.prototype, {
  [Symbol.toStringTag]: {
    value: "Window",
    configurable: true,
  },
});
Window$1.prototype.__proto__ = WindowProperties.prototype;

let Document = function Document() {};

Safefunction(Document);
Object.defineProperties(Document.prototype, {
  [Symbol.toStringTag]: {
    value: "Document",
    configurable: true,
  },
});
////////////////////////////////

////////////////////////////////

let document = {};
document.__proto__ = Document.prototype;

document.referrer = "https://www.douyin.com/discover";
document.cookie = "";

Document = Proxy$1(Document, "Document");
document = Proxy$1(document, "document");

let Location = function Location() {
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

let location = {
  href: "https://www.douyin.com/discover",
  protocol: "https:",
  __proto__: Location.prototype,
};

/////////////////////////////

location = Proxy$1(location, "location");
Location = Proxy$1(Location, "Location");

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

let window = function window() {
  throw new TypeError("window is not a constructor");
};
Safefunction(window);
window.__proto__ = Window$1.prototype;
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

let Window = Proxy$1(Window$1, "Window");
Window.prototype = Proxy$1(Window$1.prototype, "Window");

let EventTarget = Proxy$1(EventTarget$1, "EventTargetCore");
EventTarget.prototype = Proxy$1(EventTarget$1.prototype, "EventTargetCore");

window = Proxy$1(window, "window");
window.prototype = Proxy$1(window.prototype, "window");
