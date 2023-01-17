import Safefunction from "./Safefunction";
import Proxy from "./Proxy";

import WindowCore from "./Window.core";
import EventTargetCore from "./EventTarget.core";
import document from "./Document";
import location from "./Location";
import navigator from "./Navigator";

let window = function window() {
  throw new TypeError("window is not a constructor");
};
Safefunction(window);
window.__proto__ = WindowCore.prototype;
window.Object = Object;
window.RegExp = RegExp;

window.localStorage = class localStorage {};

window.localStorage.getItem = function getItem() {};
Safefunction(window.localStorage.getItem);

window.localStorage.setItem = function setItem() {};
Safefunction(window.localStorage.setItem);

window.localStorage.removeItem = function removeItem() {};
Safefunction(window.localStorage.removeItem);

window.localStorage = Proxy(window.localStorage, "window.localStorage");

window.sessionStorage = class sessionStorage {};

window.sessionStorage.getItem = function getItem() {};
Safefunction(window.sessionStorage.getItem);

window.sessionStorage.setItem = function setItem() {};
Safefunction(window.sessionStorage.setItem);

window.sessionStorage.removeItem = function removeItem() {};
Safefunction(window.sessionStorage.removeItem);

window.sessionStorage = Proxy(window.sessionStorage, "window.sessionStorage");

let Window = Proxy(WindowCore, "Window");
Window.prototype = Proxy(WindowCore.prototype, "Window");

let EventTarget = Proxy(EventTargetCore, "EventTargetCore");
EventTarget.prototype = Proxy(EventTargetCore.prototype, "EventTargetCore.prototype");

window = Proxy(window, "window");
window.prototype = Proxy(window.prototype, "window");
