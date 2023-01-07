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
  error=VM2_INTERNAL_STATE_DO_NOT_USE_OR_PROGRAM_WILL_FAIL.handleException(error);console.log("[index.1.test.js]", error);
}
