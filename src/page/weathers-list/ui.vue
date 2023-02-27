<template>
    <div :class="$style.header">
        <div :class="$style.title">
            Weather
        </div>
        <RouterLink :class="$style.button" to="/settings">
            <Gear />
        </RouterLink>
    </div>
    <Loader v-if="weatherStore.isLoadingWeathers" />
    <Empty v-else-if="weatherStore.isEmptyWeathersList">Weathers not found</Empty>
    <div v-else :class="$style.list">
        <WeatherCard v-for="weather in weatherStore.weathers" :weather="weather" :key="weather.id" />
    </div>
</template>

<script setup lang="ts">
import { WeatherCard, weatherModel } from "@/entities/weather"
import { Loader } from "@/shared/ui/loader";
import { Empty } from "@/shared/ui/empty";
import Gear from "@/shared/ui/icons/Gear.vue";
import { RouterLink } from "vue-router";

const weatherStore = weatherModel.use();
</script>

<style lang="scss" module>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    margin-bottom: 12px;
}

.title {
    font-size: 24px;
}

.menu {
    display: flex;
}

.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
}

.button {
    display: flex;
}
</style>