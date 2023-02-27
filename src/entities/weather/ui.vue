<template>
    <div :class="$style.weatherCard">
        <div :class="$style.name">
            {{ weather.name }}, {{ weather.sys.country }}
        </div>
        <div :class="$style.mainInfo">
            <div :class="$style.icon">
                <img :src="`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`" alt="wheather-icon">
            </div>
            <div :class="$style.temperature">
                {{ Math.round(weather.main.temp) }}&degC
            </div>
        </div>
        <div :class="$style.weatherInfo">
            {{ `Feels like ${Math.round(props.weather.main.feels_like)}°C.
                        ${weather.weather[0].main}. ${weather.weather[0].description}.` }}
        </div>
        <div :class="$style.details">
            <div>
                <span>Wind speed</span>
                {{ weather.wind.speed + ' m/s' }}
            </div>
            <div>
                <span>Pressure</span>
                {{ weather.main.pressure + ' hPa' }}
            </div>
            <div>
                <span>Visibility</span>
                {{ weather.main.humidity + ' %' }}
            </div>
            <div>
                <span>Humidity</span>
                {{ (weather.visibility / 1000).toFixed(1) + ' km' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { CityWeatherData } from "@/shared/api"

const props = defineProps<{
    weather: CityWeatherData
}>();

</script>

<style lang="scss" module>
.weatherCard {
    background: #e2f0ff;
    padding: 8px;
    border-radius: 4px;
    margin-bottom: 16px;
}

.name {
    margin-bottom: 16px;
    font-weight: 500;
}

.weatherInfo {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 120%;
}

.mainInfo {
    display: flex;
    margin-bottom: 8px;
}

.temperature {
    display: flex;
    align-items: center;
    font-size: 28px;
}

.menu {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.icon {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 16px;

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.details {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    span {
        display: block;
        font-weight: 500;
    }
}
</style>