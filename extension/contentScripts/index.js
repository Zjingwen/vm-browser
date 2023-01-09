console.log("contentScripts");
// 向页面注入JS
function injectCustomJs(jsPath = "js/inject.js") {
  let temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    // 放在页面不好看，执行完后移除掉
    this.parentNode.removeChild(this);
  };
  document.head.appendChild(temp);
}
injectCustomJs();
