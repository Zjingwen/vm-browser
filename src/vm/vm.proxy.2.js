var window = {};

window = new Proxy(window, {
  get: function (target, key, receiver) {
    console.log("window.get.key: ", key);

    if (target[key] instanceof Object) {
      return new Proxy(target[key], {
        get: function (a, b, c) {
          console.log("window.get.instance.key: ", key, b);
          return a[b];
        },
        set: function (a, b, c, d) {
          console.log("window.set.instance.key: ", a, b, c);
          a[b] = c;
        },
      });
    }

    return target[key];
  },
  set: function (target, key, value, receiver) {
    console.log("window.set.key: ", target, key, value);
    target[key] = value;
  },
});

window.a = {};
window.a.a = 1;

console.log("window.a: ", window.a);
console.log("window.a.a: ", window.a.a);
