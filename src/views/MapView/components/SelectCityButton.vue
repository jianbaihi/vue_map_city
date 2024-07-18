<template>
  <button id="location" @click="handleClick">
    <i class="iconfont icon-weizhi"></i> {{ currentCity.name }} --天气: {{ currentCity.weather }}
  </button>
</template>

<script setup>
import {ref,onMounted,toRefs} from 'vue'
import {useRouter} from 'vue-router'
import {getIPCity,getWeather} from '../../../api/getDataHttp.js'
import {useCityStore} from '../../../stores/cities.js'
const {historyCity,currentCity} = toRefs(useCityStore())

const $router = useRouter()

const handleClick = () => {
    $router.push('/city')
}

// const cityWeather = ref({})

const getCityWeather = async()=>{
    const weatherData = await getWeather(currentCity.value.name)
    // console.log(weatherData)
    currentCity.value = {
        name: weatherData.lives[0].city.slice(0,2),
        adcode: weatherData.lives[0].adcode,
        weather: weatherData.lives[0].weather
    }
}

// 请求数据
onMounted(() => {
    getCityWeather()
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
