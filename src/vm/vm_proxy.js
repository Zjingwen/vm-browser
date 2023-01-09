//框架代理功能
new Proxy(o, {
  set(target, property, value) {
    catvm.print.log("set", target, property, value);
    return Reflect.set(...arguments);
  },
  get(target, property, receiver) {
    catvm.print.log("get", target, property, target[property]);
    return target[property];
  },
});

XMLHttpRequest = new Proxy(XMLHttpRequest.prototype, {
  set(target, property, value) {
    console.log("set", target, property, value);
    return Reflect.set(...arguments);
  },
  get(target, property, receiver) {
    console.log("get", target, property, target[property], receiver);
    return target[property];
  },
});

XMLHttpRequest.prototype.send = new Proxy(XMLHttpRequest.prototype.send, {
  set(target, property, value) {
    console.log("set", target, property, value);
    return Reflect.set(...arguments);
  },
  get(target, property, receiver) {
    console.log("get", target, property, target[property]);
    return target[property];
  },
});

oldSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function () {
  for (i = 0; i < XMLHttpRequest.callbacks.length; i++) {
    XMLHttpRequest.callbacks[i](this);
  }
  // call the native send()
  oldSend.apply(this, arguments);
};
// window.localStorage = new Proxy()

window.localStorage = new Proxy(window.localStorage, {
  set(target, property, value) {
    console.log("set", target, property, value);
    return Reflect.set(...arguments);
  },
  get(target, property, receiver) {
    console.log("get", target, property, target[property]);
    return target[property];
  },
});