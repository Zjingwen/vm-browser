try {
  window = this;
  window.aaa = 111;
  window = new Proxy(window, {
    get() {
      console.log(arguments);
      return Reflect.get(...arguments);
    },
  });
  console.log(window.aaa);
  debugger;
} catch (error) {
  console.log("[index.1.test.js]", error);
}
