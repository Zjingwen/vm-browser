echo '开始'
XBogus='DFSzswVLjtzANSYpSDtd0OKMtadr'
ttwid='1%7CbZOS7z8TPCP2uXTVg7RS3CvDVXVwO_zPolSZRZVDvSE%7C1673246153%7C3e1ecfaf027185627914de00b00a6566002b7c40a6019bce947eb899a4d65b0a;'

keyword='111222232'

echo "/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=$keyword&offset=0&count=8&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=104.0.0.0&browser_online=true&engine_name=Blink&engine_version=104.0.0.0&os_name=Mac+OS&os_version=10.15.7&cpu_core_num=12&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7185909022549493306&msToken=&X-Bogus=$XBogus"

curl "https://www.douyin.com/aweme/v1/web/discover/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_user_web&keyword=$keyword&offset=0&count=8&pc_client_type=1&version_code=170400&version_name=17.4.0&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=zh-CN&browser_platform=MacIntel&browser_name=Chrome&browser_version=104.0.0.0&browser_online=true&engine_name=Blink&engine_version=104.0.0.0&os_name=Mac+OS&os_version=10.15.7&cpu_core_num=12&device_memory=8&platform=PC&downlink=10&effective_type=4g&round_trip_time=0&webid=7185909022549493306&msToken=&X-Bogus=$XBogus" \
  -H 'authority: www.douyin.com' \
  -H 'referer: https://www.douyin.com/search?aid=bd5a76eb-ba56-4c2f-9afe-ecc7722bbef5&source=normal_search&type=user' \
  -H "cookie: ttwid=$ttwid;" \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36' \
  --compressed

# curl -I 'https://www.douyin.com/discover' \
#   -H "cookie: __ac_nonce=063b99cbd00daafe28ecb; __ac_signature=_02B4Z6wo00f01X0DwXAAAIDAg0-9QNhU.D19K8XAADz9c7" \
#   --compressed
  