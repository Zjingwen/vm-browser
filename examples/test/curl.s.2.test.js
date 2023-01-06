/**
 * 测试用户搜索接口需要哪些必备参数
 */

const fetch = require("node-fetch");
function queryStringToJSON(queryString) {
  if (queryString.indexOf("?") > -1) {
    queryString = queryString.split("?")[1];
  }
  var pairs = queryString.split("&");
  var result = {};
  pairs.forEach(function (pair) {
    pair = pair.split("=");
    result[pair[0]] = decodeURIComponent(pair[1] || "");
  });
  return result;
}
function jsonToQuery(json) {
  return Object.keys(json)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}
function removeItem(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

(async () => {
  /**
   * 必备
   * ttwid
   * s_v_web_id
   * tt_scid
   */
  let cookies = (
    "s_v_web_id=verify_lciis65d_n9hg24LG_xGrp_4gJp_AdiW_7k4frdEDJAWz; " +
    "msToken=3M2gQCBp7ppmu5gTW4ZumdetsnrYbF1dHk5hCcGrc8lSgDl_TF4XsK7rGxUMwfW63OFEQa0jFiuC3g9paczhGRBwCp8VuhMo_ZysAVpR5osUKNB9S2fITz_6BuqXKW0="
  ).split("; ");
  console.log(cookies);
  /**
   * 必备
   * device_platform
   * aid
   * keyword
   * offset
   * count
   * X-Bogus
   */
  let qjson = queryStringToJSON(
    "https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=test&search_source=normal_search&query_correct_type=1&is_filter_search=0&from_group_id=&offset=0&count=8&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=104.0.0.0&browser_online=true&engine_name=Blink&engine_version=104.0.0.0&os_name=Mac+OS&os_version=10.15.7&cpu_core_num=12&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=50&webid=7184614472181417512&msToken=JsZlO-rlksFny60tLiEzB-1xU1eNDs0AvOprW_Y2eujcxhwi6F9TPmo4q-Gcszr5EFu5lKYhxHZespiel4wOEOxFkGjRqNldHIYP1b_veHjejKWJCJYUSkHH9b2TDO0=&X-Bogus=DFSzswVuZIXANnK8SD4sUOKMtadG"
  );
  delete qjson["channel"];
  delete qjson["search_channel"];
  delete qjson["search_source"];
  delete qjson["query_correct_type"];
  delete qjson["is_filter_search"];
  delete qjson["from_group_id"];
  delete qjson["pc_client_type"];
  delete qjson["version_code"];
  delete qjson["version_name"];
  delete qjson["cookie_enabled"];
  delete qjson["screen_width"];
  delete qjson["screen_height"];
  delete qjson["browser_language"];
  delete qjson["browser_platform"];
  delete qjson["browser_name"];
  delete qjson["browser_version"];
  delete qjson["browser_online"];
  delete qjson["engine_name"];
  delete qjson["engine_version"];
  delete qjson["os_name"];
  delete qjson["os_version"];
  delete qjson["cpu_core_num"];
  delete qjson["device_memory"];
  delete qjson["platform"];
  delete qjson["downlink"];
  delete qjson["effective_type"];
  delete qjson["round_trip_time"];
  delete qjson["webid"];
  delete qjson["msToken"];
  ////////////////////////////////////////
  qjson["device_platform"] = "webapp";
  qjson["aid"] = "6383";
  qjson["keyword"] = "test";
  qjson["offset"] = "0";
  qjson["count"] = "8";
  qjson["X-Bogus"] = "DFSzswVuRoTANnK8SDQhicKMtaDH";

  const response = await fetch(
    `https://www.douyin.com/aweme/v1/web/discover/search/test?${jsonToQuery(
      qjson
    )}`,
    {
      headers: {
        accept: "application/json, text/plain, */*",
        Referer: "https://www.douyin.com/search",
        cookie: cookies.join("; "),
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36",
      },
      method: "GET",
    }
  );
  try {
    const { user_list } = await response.json();
    for (let i of user_list) {
      const {
        user_info: { nickname },
      } = i;
      console.log(nickname);
    }
  } catch (error) {
    console.log("[curj.js]", error);
  }
})();
