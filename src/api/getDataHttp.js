import request from './request'

// 获取IP地址所在城市
export function getIPCity(){
    return request.get('api/ip?key=95e57c9da26036107f6c1b63ef73a26c')
}

// 获取天气信息
export function getWeather(city){
    return request.get(`api/weather/weatherInfo?city=${city}&key=95e57c9da26036107f6c1b63ef73a26c`)
}

// 获取城市位置信息
export function getCityLocation(city){
    return request.get(`api/geocode/geo?address=${city}&key=95e57c9da26036107f6c1b63ef73a26c`)
}

// 获取城市地图数据
export function getCityGeo(adcode){
    return request.get(`geo/geojson?code=${adcode}`)
}

// 获取热门城市
export function getHotCity(){
    return request.get('hotCity/city')
}