//框架代理功能
catvm.proxy = function (o) {
//   if (catvm.memory.config.proxy == false) {
//     return o;
//   }
  return new Proxy(o, {
    set(target, property, value) {
      catvm.print.log("set", target, property, value);
      return Reflect.set(...arguments);
    },
    get(target, property, receiver) {
      catvm.print.log("get", target, property, target[property]);
      return target[property];
    },
  });
};

XMLHttpRequest = new Proxy(XMLHttpRequest, {
  set(target, property, value) {
    console.log("set", target, property, value);
    return Reflect.set(...arguments);
  },
  get(target, property, receiver) {
    console.log("get", target, property, target[property]);
    return target[property];
  },
});
