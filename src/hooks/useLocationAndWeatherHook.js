// import { getCurrentInstance } from 'vue'
import {app} from '../main'
import { getCityLocation, getCityGeo } from '../api/getDataHttp'
import { useCityStore } from '@/stores/cities'
const $store = useCityStore()

export  const useLocationAndWeatherHook = async()=>{
        const map =  app.config.globalProperties.$map
        // console.log(map)
        // 获取当前城市
        let city = $store.city + "市";
        let result = await getCityLocation(city);
        // console.log(result);
        let { adcode, location } = result.geocodes[0];
        location = location.split(",")
        const res = await getCityGeo(adcode)
        // console.log(res)
        // 处理数据
        let feature = new ol.format.GeoJSON().readFeatures(res)[0]
        // return feature
        // 创建矢量图层
        const source = new ol.source.Vector({
            
        })
        const layer = new ol.layer.Vector({
            source: source,
        })
        map.addLayer(layer)
        // 添加要素到矢量图层
        source.addFeature(feature)
        // 设置高亮样式
        layer.setStyle(
            new ol.style.Style({
            fill: new ol.style.Fill({
                color: '#33333380',
            }),
            stroke: new ol.style.Stroke({
                color: '#ff2d51',
                width: 1.5,
            }),
            })
        )
        // 漫游动画
        map.getView().animate({
            center: location,
            zoom: 8,
            duration: 1000,
        })
}

