import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {getIPCity,getCityLocation,getCityGeo,getHotCity} from '../api/getDataHttp'

export const useCityStore = defineStore('cities', () => {
  const currentCity = ref({name: '北京',adcode:'',weather:''})
  const historyCity = ref([])
  
  return { 
    currentCity,
    historyCity,
    
   }
})
