<template>
    <div @click="handleClick" :class="$style.binIcon">
        <Bin />
    </div>
</template>

<script setup lang="ts">

import { cityModel } from '@/entities/city';
import { weatherModel } from '@/entities/weather';
import Bin from '@/shared/ui/icons/Bin.vue';

const props = defineProps<{
    id: number
}>();

const weatherStore = weatherModel.use();
const cityStore = cityModel.use();

const handleClick = () => {
    cityStore.deleteCity(props.id).then(() => {
        weatherStore.deleteWeather(props.id)
    })
}
</script>

<style lang="scss" module>
.binIcon {
    display: flex;
    margin-left: auto;
    cursor: pointer;
}
</style>