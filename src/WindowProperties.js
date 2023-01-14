import Safefunction from "./Safefunction";
import EvenTarget from "./EvenTarget";
let WindowProperties = function WindowProperties() {};

Safefunction(WindowProperties);

Object.defineProperties(WindowProperties.prototype, {
  [Symbol.toStringTag]: {
    value: "WindowProperties",
    configurable: true,
  },
});

WindowProperties.prototype.__proto__ = EvenTarget.prototype;

export default WindowProperties;
