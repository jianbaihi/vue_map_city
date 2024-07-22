<template>
  <button id="location" @click="$router.push('/city')">
    <i class="iconfont icon-weizhi"></i> 
    {{ $store.city.slice(0,2) }} 
    --天气: {{ weather }}
  </button>
</template>

<script setup>
import {ref,onMounted,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {getWeather} from '../../../api/getDataHttp.js'
import {useCityStore} from '../../../stores/cities.js'
const $router = useRouter()
const $store = useCityStore() 
// const {city} = toRefs($store)
const weather = ref(null)

// 请求数据
onMounted(() => {
  getWeather($store.city).then(res=>{
    weather.value = res.lives[0].weather
  })
})

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
