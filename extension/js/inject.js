console.log("inject");
(() => {
  //   const oldSend = XMLHttpRequest.prototype.send;
  //   XMLHttpRequest.prototype.send = function () {
  //     console.log("XMLHttpRequest.prototype.send", arguments);
  //     oldSend.apply(this, arguments);
  //   };

  //   const oldOpen = XMLHttpRequest.prototype.open;
  //   XMLHttpRequest.prototype.open = function () {
  //     console.log("XMLHttpRequest.prototype.open", arguments);
  //     oldOpen.apply(this, arguments);
  //   };

  //   const oldSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
  //   XMLHttpRequest.prototype.setRequestHeader = function () {
  //     console.log("XMLHttpRequest.prototype.setRequestHeader", arguments);
  //     oldSetRequestHeader.apply(this, arguments);
  //   };

  //   const oldOnreadystatechange = XMLHttpRequest.onreadystatechange;
  //   XMLHttpRequest.onreadystatechange = function () {
  //     console.log("XMLHttpRequest.prototype.onreadystatechange", arguments);
  //     oldOnreadystatechange.apply(this, arguments);
  //   };
  addEventListener("readystatechange", (event) => {
    console.log(event);
  });
})();