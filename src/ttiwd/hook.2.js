try {
  var window = {};
  var document = function () {};
  document.referrer = "https://www.douyin.com/discover";
  window.Object = function Object() {
    console.log(`Object:`, arguments);
  };
  window.Object.prototype = {
    toJSON:function(){
      console.log(arguments)
    }
  };
  window.Object.prototype = new Proxy(window.Object.prototype, {
    set(target, property, value) {
      console.log("window.Object.prototype Set", target, property, value);
      return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
      console.log(
        "window.Object.prototype Get",
        target,
        property,
        target[property]
      );
      return target[property];
    },
  });
  window.sessionStorage = {
    setItem: function () {},
    getItem: function () {},
  };
  window.localStorage = {
    setItem: function () {},
    getItem: function () {},
  };
  window.Object = new Proxy(window.Object, {
    set(target, property, value) {
      console.log("window.Object Set", target, property, value);
      return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
      console.log("window.Object Get", target, property, target[property]);
      return target[property];
    },
  });
  window = new Proxy(window, {
    set(target, property, value) {
      console.log("window Set", target, property, value);
      return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
      console.log("window Get", target, property, target[property]);
      return target[property];
    },
  });
} catch (error) {
  console.log("window [error]", error);
}
