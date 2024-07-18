<template>
    <div id="map-view">
        <Map></Map>
        <SelectCityButton></SelectCityButton>
        <HighLightLayer></HighLightLayer>
        <Popup></Popup>
    </div>
</template>

<script setup>
import Map from './components/InitMap.vue'
import SelectCityButton from './components/SelectCityButton.vue'
import HighLightLayer from './components/HighLightLayer.vue'
import Popup from './components/Popup.vue'
</script>

<style scoped>

</style>