<template>
  <button id="location" @click="$router.push('/city')">
    <i class="iconfont icon-weizhi"></i> 
    {{ $store.city.slice(0,2) }} 
    --天气: {{ weather }}
  </button>
</template>

<script setup>
import {ref,onMounted,onUpdated,watch,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {getWeather} from '../../../api/getDataHttp.js'
import {useCityStore} from '../../../stores/cities.js'
const $router = useRouter()
const $store = useCityStore()
const {city} = toRefs($store)
const weather = ref(null)

// 对于初始页面请求天气数据和切换城市时请求天气数据，我们可以有两套解决方案，第二种更简洁
// 第一种是使用onMounted和onUpdated钩子，分别在页面加载和切换城市时请求天气数据
// 第二种是使用watch监听city变化，在变化时请求天气数据（为了使初始页面请求到天气数据，我们可以设置immediate为true）
// 这里我们使用第一种方案
// 请求数据
onMounted(() => {
  getWeather($store.city).then(res=>{
    weather.value = res.lives[0].weather
  })
})
// 切换城市时，在updated钩子中请求天气数据
onUpdated(() => {
  getWeather($store.city).then(res=>{
    weather.value = res.lives[0].weather
  })
})
// 第二套解决方案
// 监听city变化，请求天气数据
// watch(city,()=>{
//   getWeather($store.city).then(res=>{
//     weather.value = res.lives[0].weather
//   })
// },{
//   deep: true,
//   immediate: true
// })



</script>

<style scoped>
#location {
    width: 180px;
    height: 40px;
    background-color: #6528df;
    border: none;
    border-radius: 15px;
    top: 20px;
    left: 50px;
    position: fixed;
    z-index: 1000;
    color: #fff;
    cursor: pointer;
}
</style>
