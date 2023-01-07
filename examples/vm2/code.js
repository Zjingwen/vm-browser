try {
  var window = this;
  window = new Proxy(window, {
    get() {
      console.log("[code.js]", arguments);
      return Reflect.get(...arguments);
    },
  });

  var Request = {};
  Request = new Proxy(Request, {
    get() {
      console.log("[code.js]", arguments);
      return Reflect.get(...arguments);
    },
  });

  var Headers = {};
  Headers = new Proxy(Headers, {
    get() {
      console.log("[code.js]", arguments);
      return Reflect.get(...arguments);
    },
  });

  var document = {};
  document.addEventListener = function (type, listener) {
    console.log(`[addEventListener]`, type);
  };
  document = new Proxy(document, {
    get() {
      console.log("[code.js]", arguments);
      return Reflect.get(...arguments);
    },
  });

  var setTimeout = function (x, x1) {
    console.log("setTimeout", x);
    x();
  };

  var XMLHttpRequest = new Function();
  XMLHttpRequest.prototype = {
    constructor: XMLHttpRequest,
    open(){
        console.log('[XMLHttpRequest open]',arguments)
    },
    send(){
        console.log('[XMLHttpRequest send]',arguments)
    }
  };
  XMLHttpRequest = new Proxy(XMLHttpRequest, {
    get() {
      console.log("[code.js]", arguments);
      return Reflect.get(...arguments);
    },
  });
} catch (error) {
  console.log("[code.js]", error);
  debugger;
}
