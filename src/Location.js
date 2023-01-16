import Proxy from "./Proxy.js";
import Safefunction from "./Safefunction.js";

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

location = Proxy(location, "location");
Location = Proxy(Location, "Location");

export default location;
