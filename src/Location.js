import Proxy from "./Proxy.js";
import Safefunction from "./Safefunction.js";

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

location = Proxy(location);

export default location;
