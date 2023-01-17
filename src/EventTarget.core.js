import Safefunction from "./Safefunction";

let EventTarget = function EventTarget() {};

Safefunction(EventTarget);

Object.defineProperties(EventTarget.prototype, {
  [Symbol.toStringTag]: {
    value: "EventTarget",
    configurable: true,
  },
});

EventTarget.prototype.addEventListener = function addEventListener(
  type,
  callback
) {
  debugger;
};
Safefunction(EventTarget.prototype.addEventListener);

EventTarget.prototype.dispatchEvent = function dispatchEvent() {
  debugger;
};
Safefunction(EventTarget.prototype.dispatchEvent);

EventTarget.prototype.removeEventListener = function removeEventListener(
  type,
  listener,
  options,
  useCapture
) {
  debugger;
};
Safefunction(EventTarget.prototype.removeEventListener);

// EventTarget.prototype = Proxy(EventTarget.prototype, "EventTarget.prototype");
// EventTarget = Proxy(EventTarget, "EventTarget");
export default EventTarget;
