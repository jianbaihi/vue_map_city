<template>
    <div id="map">
        
    </div>
</template>

<script setup>
import { app } from '../../../main.js'
import { onMounted } from 'vue'

onMounted(() => {
  //设置瓦片图层
  const gaode = new ol.layer.Tile({
    title: '高德地图',
    source: new ol.source.XYZ({
      url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
      wrapX: false,
    }),
  })
  /* 实例化地图 */
  const map = new ol.Map({
    /* el */
    target: 'map',
    /* data */
    layers: [gaode],
    view: new ol.View({
      /* 设置中心点 */
      center: [114.3, 30.5],
      /* 设置放大级别 */
      zoom: 4,
      /* 设置坐标的参考系 */
      projection: 'EPSG:4326',
    }),
  })
  app.config.globalProperties.$map = map
})
</script>

<style scoped></style>
