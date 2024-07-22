<template>
  <div></div>
</template>

<script setup>
import { onMounted, getCurrentInstance, toRefs } from 'vue'
import { getCityGeo, getCityLocation } from '../../../api/getDataHttp.js'
import { useCityStore } from '../../../stores/cities.js'
import  {useLocationAndWeatherHook}  from '../../../hooks/useLocationAndWeatherHook.js'

// const $store = useCityStore()

onMounted(() => {
    useLocationAndWeatherHook()
})
</script>

<style scoped></style>
