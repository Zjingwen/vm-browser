// 抖音爬虫
const path = require("path");
const fs = require("fs");
const fetch = require("node-fetch");
const puppeteer = require("puppeteer");
const { uuid } = require("./utils");

const publicPath = path.join(__dirname, "../public/");
const UA =
  "5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";

async function getSignature(__ac_nonce, __ac_signature) {
  const response = await fetch("https://www.douyin.com/discover", {
    headers: {
      cookie: `__ac_nonce=${__ac_nonce}; __ac_signature=${__ac_signature};`,
    },
    body: null,
    method: "GET",
  });
  const setCookie = await response.headers.raw()["set-cookie"];
  return setCookie[0].split("; ")[0].split("=")[1];
}

async function getAcNonce() {
  const response = await fetch("https://www.douyin.com/discover");
  const setCookie = await response.headers.raw()["set-cookie"];
  return setCookie[0].split("; ")[0].split("=")[1];
}

// 核心
async function core(url, ua) {
  return new Promise(async (resolve) => {
    const uri = "/websdk/v1/getInfo";
    const browser = await puppeteer.launch({
      headless: "chrome",
      args: [
        "--disable-web-security",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
    });
    const page = await browser.newPage();
    await page.setUserAgent(ua);
    await page.setExtraHTTPHeaders({
      referer: "https://www.douyin.com",
    });
    await page.setRequestInterception(true);
    page.on("request", async (req) => {
      if ((await req.url()).indexOf(url) > -1) {
        resolve({
          u: await req.url(),
        });
        req.abortErrorReason();
        await browser.close();
      } else {
        req.continue();
      }
    });
    page.on("requestfinished", async (req) => {
      if ((await req.url().indexOf(uri)) > -1) {
        await page.evaluate(`getSignature("${url}")`);
      }
    });

    await page.goto(`file://${publicPath}/webmssdk.html`, {
      timeout: 0,
    });
  });
}

// 获取ttwid cookie
async function ttwidCookie() {
  return new Promise(async (resolve) => {
    const uri = "/websdk/v1/getInfo";
    const browser = await puppeteer.launch({
      headless: "chrome",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", async (req) => {
      await req.continue();
    });
    page.on("requestfinished", async (req) => {
      if ((await req.url().indexOf(uri)) > -1) {
        const __ac_nonce = await getAcNonce();
        const __ac_signature = await page.evaluate(
          `getSignature("${__ac_nonce}")`
        );
        const ttwid = await getSignature(__ac_nonce, __ac_signature);
        await fs.writeFileSync(`${publicPath}/ttwid`, ttwid);
        await browser.close();
        resolve(ttwid);
      }
    });

    await page.goto(`file://${publicPath}/acrawler.html`, {
      timeout: 0,
    });
  });
}

async function getData(url, ttwid, ua) {
  const response = await fetch(url, {
    headers: {
      cookie: `ttwid=${ttwid}`,
      Referer: `https://www.douyin.com/search/102795667?aid=${uuid()}f&source=normal_search&type=user`,
      "User-Agent": ua,
    },
    method: "GET",
  });
  const res = await response.json();
  return res;
}

async function index(id) {
  try {
    const ua = `${UA} ${uuid()}`;
    const url = `https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=${id}&search_source=normal_search&query_correct_type=1&is_filter_search=0&from_group_id=&offset=0&count=8&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1200&screen_height=600&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=103.0.0.0&browser_online=true&engine_name=Blink&engine_version=103.0.0.0&os_name=Mac+OS&os_version=10.15.7&cpu_core_num=12&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=100&webid=7123108369829266975`;
    const ttwid = await ttwidCookie();
    const { u } = await core(url, ua);
    const data = await getData(u, ttwid, ua);
    return data;
  } catch (error) {
    console.log("douyin", error);
    return false;
  }
}

async function index_test() {
  const id = "2228879773";
  const { user_list } = await index(id);
  return new Promise(async (resolve) => {
    for (let i of user_list) {
      const { user_info } = i;
      if (user_info.unique_id === id) {
        console.log(user_info);
        resolve(true);
      }
    }
    resolve(false);
  });
}

async function ttwidCookie_test() {
  try {
    const res = await ttwidCookie();
    console.log(res);
    return true;
  } catch (error) {
    console.log("ttwidCookie_test", error);
    return false;
  }
}

(async () => {
  // await ttwidCookie_test();
  // await index_test();
})();

module.exports = {
  index,
  ttwidCookie,
};
