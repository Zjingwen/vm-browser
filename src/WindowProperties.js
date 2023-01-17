import Safefunction from "./Safefunction";
import EventTarget from "./EventTarget.core";

let WindowProperties = function WindowProperties() {};

Safefunction(WindowProperties);

Object.defineProperties(WindowProperties.prototype, {
  [Symbol.toStringTag]: {
    value: "WindowProperties",
    configurable: true,
  },
});

WindowProperties.prototype.constructor = EventTarget;
WindowProperties.prototype.__proto__ = EventTarget.prototype;

export default WindowProperties;
