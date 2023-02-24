<template>
    <div :class="$style.header">
        <div :class="$style.title">
            Weather
        </div>
        <RouterLink to="/settings">
            <Gear />
        </RouterLink>
    </div>
    <div v-if="weatherStore.weathers.length" :class="$style.list">
        <WeatherCard v-for="weather in weatherStore.weathers" :weather="weather" :key="weather.id" />
    </div>
    <div v-else :class="$style.loader">
        <Loader />
        <div :class="$style.loaderText">Loading...</div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import Gear from "@/shared/ui/icons/Gear.vue";
import { WeatherCard, weatherModel } from "@/entities/wheather"
import { onMounted } from "vue";
import { Loader } from "@/shared/ui/loader";
import { cityModel } from "@/entities/city";


const citiesStore = cityModel.use();
const weatherStore = weatherModel.use();

onMounted(async () => {
    await citiesStore.getCitiesAync();
    await weatherStore.getWeathersAsync();
});

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

.list {}

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

.loaderText {
    margin-top: 24px;
}
</style>