<template>
    <div :class="$style.app">
        <div :class="$style.widget">
            <div :class="$style.header">
                <div :class="$style.title">
                    Weather
                </div>
                <div :class="$style.menu">
                    <Gear />
                </div>
            </div>

            <div :class="$style.list">
                <WeatherCard v-for="weather in weathers" :weather="weather" :key="weather.id" />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { storageApi } from "@/shared/api";
import Gear from "@/shared/ui/icons/Gear.vue";
import { WeatherCard } from "@/entities"
import { defineComponent } from "vue";


export default defineComponent({
    name: 'Weather',
    components: {
        Gear,
        WeatherCard
    },
    data() {
        return {
            weathers: null,
        }
    },
    created() {
        storageApi.cities.getCitiesWeather().then(res => {
            console.log(res)
            this.weathers = res
        })
    },
})

</script>

<style lang="scss" module>
@import "./index.scss";

.app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
}

.widget {
    padding: 16px;
    height: 350px;
    width: 300px;
    border-radius: 8px;
    background-color: #fff;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.12));
    overflow-x: scroll;
}

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
</style>

