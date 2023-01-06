const fetch = require("node-fetch");

(async () => {
  const response = await fetch(
    "https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=test&search_source=normal_search&query_correct_type=1&is_filter_search=0&from_group_id=&offset=0&count=8&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1920&screen_height=1080&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=104.0.0.0&browser_online=true&engine_name=Blink&engine_version=104.0.0.0&os_name=Mac+OS&os_version=10.15.7&cpu_core_num=12&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=100&webid=7184614472181417512&msToken=3M2gQCBp7ppmu5gTW4ZumdetsnrYbF1dHk5hCcGrc8lSgDl_TF4XsK7rGxUMwfW63OFEQa0jFiuC3g9paczhGRBwCp8VuhMo_ZysAVpR5osUKNB9S2fITz_6BuqXKW0=&X-Bogus=DFSzswVuRoTANnK8SDQhicKMtaDH",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language":
          "zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,ja;q=0.6,de;q=0.5,ro;q=0.4,da;q=0.3,pl;q=0.2,und;q=0.1",
        "cache-control": "no-cache",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        cookie:
          "s_v_web_id=verify_lciis65d_n9hg24LG_xGrp_4gJp_AdiW_7k4frdEDJAWz; msToken=3M2gQCBp7ppmu5gTW4ZumdetsnrYbF1dHk5hCcGrc8lSgDl_TF4XsK7rGxUMwfW63OFEQa0jFiuC3g9paczhGRBwCp8VuhMo_ZysAVpR5osUKNB9S2fITz_6BuqXKW0=",
        Referer:
          "https://www.douyin.com/search/test?aid=484653b5-58a0-48f6-96ca-2e59df9f8fe3&source=normal_search&type=user",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  console.log(await response.json());
})();
