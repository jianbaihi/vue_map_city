import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useCityStore = defineStore('cities', () => {
  const getDefaultCity = () => {
    let city = ref("北京");
    let currentCity = localStorage.getItem("currentCity")
    if (currentCity) {
      city.value = currentCity
    }
    return city;
  }

  const city = getDefaultCity();

  const changeCity = (val) => {
    city.value = val;
    /* 设置缓存 */
    localStorage.setItem("currentCity", val)
  }

  return { city, changeCity }
})
