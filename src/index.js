import Safefunction from "./Safefunction";
import Proxy from "./Proxy";

import WindowCore from "./Window.core";
import EventTargetCore from "./EventTarget.core";
import document from "./Document";
import location from "./Location";
import navigator from "./Navigator";
import StorageCore from "./StorageCore";

let window = {};
window.__proto__ = WindowCore.prototype;
window.Object = Object;
window.RegExp = RegExp;

window.localStorage = {
  __proto__: StorageCore.prototype,
};

window.localStorage = Proxy(window.localStorage, "window.localStorage");

window.sessionStorage = {
  __proto__: StorageCore.prototype,
};

window.sessionStorage = Proxy(window.sessionStorage, "window.sessionStorage");
window = Proxy(window, "window");

let Window = WindowCore;
Window.prototype = Proxy(Window.prototype, "Window");
Window = Proxy(Window, "Window");

let EventTarget = EventTargetCore;
EventTarget.prototype = Proxy(
  EventTarget.prototype,
  "EventTargetCore.prototype"
);
EventTarget = Proxy(EventTarget, "EventTargetCore");

let Storage = StorageCore;
Storage.prototype = Proxy(Storage.prototype, "Storage.prototype");
Storage = Proxy(Storage, "Storage");

if (process.env["NODE_ENV"] == "test") {
  module.exports = {
    window,
    Window,
    EventTarget,
    Storage,
  };
}
