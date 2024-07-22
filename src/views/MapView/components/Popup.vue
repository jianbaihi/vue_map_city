<template>
  <div class="tip">
    <div>定位到您在'{{ ipCity.slice(0,2) }}'</div>
    <div>
        <button @click="toggleCity">切换至{{ ipCity.slice(0,2) }}</button>
        <span @click="$emit('closePopup')" class="close">x</span>
    </div>
  </div>
</template>

<script setup>
import {toRefs,onMounted,ref,computed,watch} from 'vue'
import {useCityStore} from '../../../stores/cities.js'
import {getIPCity} from '../../../api/getDataHttp.js'
const $store = useCityStore()
const $emits = defineEmits(['closePopup','toggleIpCity'])
// const {city} = toRefs($store)

// 获取IP地址对应的城市
const ipCity = ref('')

const toggleCity = ()=>{
    // 改变pinia中的值
    $store.changeCity(ipCity.value)
    $emits('toggleIpCity')
}
onMounted(async() => {
    const res = await getIPCity()
    ipCity.value = res.city
    // console.log(ipCity.value)
})
</script>

<style scoped>
.tip {
    position: fixed;
    width: 300px;
    height: 50px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    justify-content: space-between;
    z-index: 1000;
    background-color: #333333d2;
    left: 50%;
    bottom: 30px;
    transform: translate(-50%);
    border-radius: 10px;
    color: #fff;
}
.tip button{
    width: 80px;
    height: 35px;
    cursor: pointer;
}
.tip span{
    margin-left: 5px;
    font-size: 20px;
    cursor: pointer;
}
.close:hover{
    cursor: pointer;
}
</style>
