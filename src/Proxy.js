//框架代理功能
export default function (o, title = 'Proxy') {
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
