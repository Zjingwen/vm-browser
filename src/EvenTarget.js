import Safefunction from "./Safefunction";
import Proxy from "./Proxy";

let EvenTarget = function EvenTarget() {};
Safefunction(EvenTarget);

Object.defineProperties(EvenTarget.prototype, {
  [Symbol.toStringTag]: {
    value: "EvenTarget",
    configurable: true,
  },
});

EvenTarget.prototype.addEventListener = function addEventListener(
  type,
  callback
) {};
Safefunction(EvenTarget.prototype.addEventListener);

EvenTarget.prototype.dispatchEvent = function dispatchEvent() {};
Safefunction(EvenTarget.prototype.dispatchEvent);

EvenTarget.prototype.removeEventListener = function removeEventListener(
  type,
  listener,
  options,
  useCapture
) {
  debugger;
};
Safefunction(EvenTarget.prototype.removeEventListener);

EvenTarget = Proxy(EvenTarget);

export default EvenTarget;
