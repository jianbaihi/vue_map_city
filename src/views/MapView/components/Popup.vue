<template>
  <div class="tip" v-if="!showTip">
    <div>定位到您在'{{ IPcity.slice(0,2) }}'</div>
    <div>
        <button>切换至{{ IPcity.slice(0,2) }}</button>
        <span @click="showTip = true">x</span>
    </div>
  </div>
</template>

<script setup>
import {toRefs,onMounted,ref,computed} from 'vue'
import {useCityStore} from '../../../stores/cities.js'
import {getIPCity} from '../../../api/getDataHttp.js'
const {currentCity} = toRefs(useCityStore())

// 获取IP地址对应的城市
const IPcity = ref('')

// 设置弹窗的状态值
const showTip = computed(()=>{
  return currentCity.value.name == IPcity.value.name
})

onMounted(async() => {
    const res = await getIPCity()
    IPcity.value = res.city
    console.log(IPcity.value)
    console.log(showTip.value)
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
</style>
