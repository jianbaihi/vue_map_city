<template>
  <div id="map-view">
    <Map></Map>
    <SelectCityButton></SelectCityButton>
    <HighLightLayer></HighLightLayer>
    <Popup
      @toggleIpCity="jumpIpCity"
      @closePopup="handleClose"
      v-if="isShowPopup"
    ></Popup>
  </div>
</template>

<script setup>
import Map from './components/InitMap.vue'
import SelectCityButton from './components/SelectCityButton.vue'
import HighLightLayer from './components/HighLightLayer.vue'
import Popup from './components/Popup.vue'
import { ref, onMounted,getCurrentInstance } from 'vue'
import { getIPCity, getCityLocation } from '../../api/getDataHttp'
import { useCityStore } from '@/stores/cities'
import  {useLocationAndWeatherHook}  from '../../hooks/useLocationAndWeatherHook'

const $store = useCityStore()
const {proxy} = getCurrentInstance()
const isShowPopup = ref(false)


onMounted(async () => {
  let result = await getIPCity()
  let ipCity = result.city
  // 1.ip定位http  vs  pinia-city
  // ture  弹窗-不显示
  // false 弹窗-显示
  if (ipCity == $store.city) {
    isShowPopup.value = false
  } else {
    isShowPopup.value = true
  }
})
const handleClose = () => {
  isShowPopup.value = false
}
const jumpIpCity = () => {
  isShowPopup.value = false
//   source.clear()

  useLocationAndWeatherHook()
  // $store.changeCity(ipCity)
}
</script>

<style scoped></style>
