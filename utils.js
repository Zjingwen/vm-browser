const fetch = require("node-fetch");
const fs = require("fs");
const readline = require("readline");
const dayjs = require("dayjs");

/**
 * 获取开发环境变量
 * @returns true/false
 */
function isDev() {
  return process.env.NODE_ENV === "development" ? true : false;
}

/**
 * 对象转换query
 * @param {object} json 参数对象
 * @returns json to string
 */
function jsonToQuery(json) {
  return Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}

/**
 * 发起get请求
 * @param {*} param0 option
 * @param {string} param0.url 请求地址
 * @param {object} param0.query 请求参数
 * @param {object} param0.headers 请求头
 * @returns 返回请求结果
 */
async function fetchGet({ url, query = {}, headers = {} }) {
  const options = {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`${url}?${jsonToQuery(query)}`, options);
  const json = await res.json();
  return json;
}

/**
 * 发起post请求
 * @param {*} param0 option
 * @param {string} param0.url 请求地址
 * @param {object} param0.query 请求参数
 * @param {object} param0.headers 请求头
 * @returns 返回请求结果
 */
async function fetchPost({ url, query = {}, headers = {} }) {
  const options = {
    method: "POST",
    body: JSON.stringify(query),
    headers: {
      "content-type": "application/json",
      ...headers,
    },
  };
  const res = await fetch(url, options);
  const data = await res.json();
  return data;
}

/**
 * 发起Content-Type为text/html的get请求
 * @param {*} param0 option
 * @param {string} param0.url 请求地址
 * @param {object} param0.query 请求参数
 * @param {object} param0.headers 请求头
 * @returns 返回请求结果
 */
async function fetchHttp({ url, query = {}, headers = {} }) {
  const options = {
    method: "GET",
    headers: {
      ...headers,
      "Content-Type": "text/html; charset=UTF-8",
    },
  };
  const res = await fetch(`${url}?${jsonToQuery(query)}`, options);
  const text = await res.text();
  return text;
}

/**
 * 延迟执行
 * @param {number} ms 延迟
 * @returns function
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
}

/**
 * 逐行读取
 * @param {string} name 文件名
 */
async function readFileSync(name, cb) {
  const r = readline.createInterface({
    input: fs.createReadStream(`${__dirname}/${name}.txt`),
    output: process.stdout,
    terminal: false,
  });
  const urls = [];

  r.on("line", (url) => urls.push(url));

  r.on("close", async () => {
    for (const url of urls) {
      await cb(url);
    }
  });
}

/**
 * 自定义逐渐行写入
 * @param {object} content 内容
 */
function writeReadlineName(name, content = {}) {
  return new Promise((resolve, reject) => {
    fs.writeFile(
      `${__dirname}/${name}.txt`,
      `${JSON.stringify(content)}\n`,
      {
        flag: "a",
      },
      function (err) {
        if (err !== null) {
          console.error("writeReadline", err);
        }
        resolve();
      }
    );
  });
}

/**
 * 毫秒时间戳
 * @param {string} t ms 毫秒级 | s 秒级
 */
function timestamp(t = "ms") {
  if (t === "ms") return Date.now();
  return Math.floor(Date.now() / 1000);
}

/**
 * 将json中的所有数据转换成string类型
 * @param {object} jsonObj json数据格式
 * @returns json数据
 */
function parseJson(jsonObj) {
  for (let key in jsonObj) {
    let element = jsonObj[key];
    if (
      (element.length > 0 && typeof element == "object") ||
      typeof element == "object"
    ) {
      parseJson(element);
    } else {
      if (typeof jsonObj[key] !== "string") {
        jsonObj[key] = String(element);
      }
    }
  }
  return jsonObj;
}

/**
 * 生成uuid
 * @returns uuid
 */
function uuid() {
  var s = [];
  var hexDigits = "0123456789abcdef";
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  var uuid = s.join("");
  return uuid;
}

module.exports = {
  jsonToQuery,
  fetchGet,
  wait,
  writeReadlineName,
  timestamp,
  readFileSync,
  fetchHttp,
  fetchPost,
  parseJson,
  isDev,
  uuid,
};
