import Safefunction from "./Safefunction";

let Storage = function Storage() {
  throw new TypeError("Illegal constructor");
};

Safefunction(Storage);

Object.defineProperties(Storage.prototype, {
  [Symbol.toStringTag]: {
    value: "Storage",
    configurable: true,
  },
});

Storage.prototype.clear = function clear() {
  debugger;
};
Safefunction(Storage.prototype.clear);

Storage.prototype.getItem = function getItem() {
  debugger;
};
Safefunction(Storage.prototype.getItem);

Storage.prototype.setItem = function setItem() {
  debugger;
};
Safefunction(Storage.prototype.setItem);

Storage.prototype.removeItem = function removeItem() {
  debugger;
};
Safefunction(Storage.prototype.removeItem);

export default Storage;
