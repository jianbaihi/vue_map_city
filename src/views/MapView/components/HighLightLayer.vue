<template>
  <div></div>
</template>

<script setup>
import { onMounted, getCurrentInstance } from 'vue'
import { getCityGeo } from '../../../api/getDataHttp.js'
// import {useCityStore} from '../../../stores/cities.js'


// 请求数据的方法
const high_light_layer = async () => {
    const res = await getCityGeo(420100)
    // console.log(res)
    // 处理数据
    let feature = new ol.format.GeoJSON().readFeatures(res)[0]
    return feature
}

onMounted(async() => {
    const { proxy } = getCurrentInstance()
    const map = proxy.$map

    // 创建矢量图层
    const source = new ol.source.Vector({
        
    })
    const layer = new ol.layer.Vector({
        source: source,
    })
    map.addLayer(layer)
    // 获取要素
    let feature = await high_light_layer()
    // console.log(feature)
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
            width: 2,
        }),
        })
    )
    // 漫游动画
    map.getView().animate({
        center: feature.center,
        zoom: 8,
        duration: 2000,
    })
})
</script>

<style scoped></style>
