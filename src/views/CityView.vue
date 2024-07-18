<template>
  <div class="container">
    <h3>当前城市</h3>
    <button>{{ currentCity.name }}</button>
    <h3>定位/最近访问</h3>
    <div>
      <button class="location" @click="handleClick(ipCity.slice(0,2))">
        <i class="iconfont icon-weizhi"></i>{{ ipCity }}
      </button>
        <button>北京</button>
    </div>
    <h3>热门城市</h3>
    <div>
      <button 
      v-for="city in hotCities" 
      :key="city.id"
      @click="handleClick(city.name)"
      >
      {{ city.name }}
    </button>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted,toRefs } from 'vue'
import { useRouter } from 'vue-router'
import {getIPCity,getHotCity} from '../api/getDataHttp.js'
import {useCityStore} from '../stores/cities.js'
const {historyCity,currentCity} = toRefs(useCityStore())

const $router = useRouter()
const hotCities = ref([])
const ipCity = ref('')
onMounted(() => {
    getHotCity().then(res => {
        // console.log(res.data.hotCities)
        hotCities.value = res.data.hotCities
    })
    getIPCity().then(res => {
        console.log(res)
        ipCity.value = res.city
    })
})

const handleClick = (cityName) => {
    historyCity.value.unshift(cityName)
    currentCity.value.name = cityName
    $router.push('/')
}

</script>

<style scoped>
.container{
    padding: 10px;
    width: 500px;
    height: 100vh;
    border: 1px solid #d3d3d3;
    margin: 0 auto;
}
.container h3{
    text-indent: 15px;
    line-height: 40px;
    color: #666;
    font-size: 16px;
    font-weight: lighter;
    background-color: #efeeee;
    margin-top: 6px;
}
.container button{
    width: 80px;
    height: 35px;
    background-color: #fff;
    margin-right: 10px;
    border: 1px solid #c2c0c0;
    border-radius: 10px;
    margin-top: 6px;
    cursor: pointer;
}
.container button:hover{
    background-color: #f5f5f5;
}
</style>
