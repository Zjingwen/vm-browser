import Safefunction from "./Safefunction.js";

let HTMLDocument = function HTMLDocument() {
  throw new TypeError("Illegal constructor");
};

Safefunction(HTMLDocument);
Object.defineProperties(HTMLDocument.prototype, {
  [Symbol.toStringTag]: {
    value: "HTMLDocument",
    configurable: true,
  },
});
////////////////////////////////

////////////////////////////////

export default HTMLDocument;
