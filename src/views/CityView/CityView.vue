<template>
  <div class="container">
    <h3>当前城市</h3>
    <button>{{ city }}</button>
    <h3>定位/最近访问</h3>
    <div>
      <button class="location" @click="handleClick(ipCity.slice(0, 2))">
        <i class="iconfont icon-weizhi"></i>{{ ipCity }}
      </button>
      <button 
      v-for="item in historyCities" 
      :key="item"
      @click="handleClick(item)"
      >
        {{ item }}
      </button>
    </div>
    <h3>热门城市</h3>
    <div>
      <button
        v-for="item in hotCities"
        :key="item.id"
        @click="handleClick(item.name)"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getIPCity, getHotCity } from '../../api/getDataHttp.js'
import { useCityStore } from '../../stores/cities.js'
const $router = useRouter()
const $store = useCityStore()
const { city } = toRefs($store)
const hotCities = ref([])
const historyCities = ref([])
const ipCity = ref('')

// 发送Http请求
onMounted(() => {
  getHotCity().then((res) => {
    // console.log(res.data.hotCities)
    hotCities.value = res.data.hotCities
  })
  getIPCity().then((res) => {
    // console.log(res)
    ipCity.value = res.city
  })
})

// click设置
// 1.设置数据pinia
// 2、回传home
const handleClick = async (cityName) => {
  let city = cityName + '市'
  $store.changeCity(city)
  // 历史记录
  // 1.不能重复的值
  // 2.添加到数组前面
  // 判断：是否存在
  // 存在：删除 unshift
  // 不存在：unshift
  if (!historyCities.value.includes(cityName)) {
    historyCities.value.unshift(cityName)
  } else {
    let index = historyCities.value.indexOf(cityName)
    historyCities.value.splice(index, 1)
    historyCities.value.unshift(cityName)
  }
  // 限制history Cities 长度为3
  historyCities.value = historyCities.value.slice(0, 3)
  // 回调首页back
  $router.back()
}
// historyCities  ——watch
watch(historyCities, (val) => {
  // 缓存只能String
  localStorage.setItem('localCities', JSON.stringify(val))
})

// 获取缓存中的localCities
onMounted(() => {
  let localCities = localStorage.getItem('localCities')
  if (localCities) {
    historyCities.value = JSON.parse(localCities)
  }
})
</script>

<style scoped>
.container {
  padding: 10px;
  width: 500px;
  height: 100vh;
  border: 1px solid #d3d3d3;
  margin: 0 auto;
}
.container h3 {
  text-indent: 15px;
  line-height: 40px;
  color: #666;
  font-size: 16px;
  font-weight: lighter;
  background-color: #efeeee;
  margin-top: 6px;
}
.container button {
  width: 80px;
  height: 35px;
  background-color: #fff;
  margin-right: 10px;
  border: 1px solid #c2c0c0;
  border-radius: 10px;
  margin-top: 6px;
  cursor: pointer;
}
.container button:hover {
  background-color: #f5f5f5;
}
.location i {
  color: #6528df;
}
</style>
