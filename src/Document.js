import Proxy from "./Proxy.js";
import Safefunction from "./Safefunction.js";

let Document = function Document() {
  throw new TypeError("Illegal constructor");
};

Safefunction(Document);
Object.defineProperties(Document.prototype, {
  [Symbol.toStringTag]: {
    value: "Document",
    configurable: true,
  },
});
////////////////////////////////

////////////////////////////////

var document = {};
document.__proto__ = Document.prototype;

document.referrer = "https://www.douyin.com/discover";
document.cookie = "";

Document = Proxy(Document, "Document");
document = Proxy(document, "document");

export default document;
