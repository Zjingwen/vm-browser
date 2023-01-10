# 如何获取ttwid

1.执行`get.ac_nonce.curl.sh`

在返回的响应标头中找到`set-cookie`中，取出`__ac_nonce`值。

```shell
set-cookie: __ac_nonce=063bcdd840062d274b27a; Path=/; Max-Age=1800
```

2.将`__ac_nonce`的值放入`index.js`文件中

```javascript
window.byted_acrawler.init({
  aid: 99999999,
  dfp: 0,
});

var __ac_nonce = ''; // 放入get.ac_nonce.curl.sh中取出的__ac_nonce值
var __ac_signature = window.byted_acrawler.sign("", __ac_nonce);
console.log(__ac_signature);
```

3.启动`Live Server`插件，打开`index.html`文件，并且打开控制台，将会在控制台中获取到`__ac_signature`

4.将获取到的`__ac_nonce`和`__ac_signature`，放入`get.ttwid.curl.sh`文件中

```shell
__ac_nonce="";
__ac_signature="";
```

5.执行`get.ttwid.curl.sh`

在返回的响应标头中找到`set-cookie`中，取出`ttwid`值。

```shell
set-cookie: ttwid=1%7CXFGDX4fV7yg3tSXK1n0toLoJD86ks3rDBb0qQenryoU%7C1673322332%7Cf5088b611f25cd7a8f6e379adcc3049d61e8f0bc3a624d14057885813bf02b3d; Domain=.douyin.com; Path=/; Expires=Fri, 05 Jan 2024 03:45:32 GMT; HttpOnly
```

6.验证ttwid

在`get.shearch.sh`中放入获取到的ttwid，测试返回是否有内容。