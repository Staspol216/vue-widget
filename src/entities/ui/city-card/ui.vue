<template>
    <div :class="$style.cityCard">
        <div :class="$style.name">
            {{ city.name }}, {{ city.sys.country }}
        </div>
        <div :class="$style.mainInfo">
            <div :class="$style.icon">
                <img :src="`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`" alt="wheather-icon">
            </div>
            <div :class="$style.temperature">
                {{ Math.round(city.main.temp) }}&degC
            </div>
        </div>
        <div :class="$style.wheatherInfo">
            {{ wheatherInfo }}
        </div>
        <div :class="$style.details">
            <div>
                <span :class="$style.infoTitle">Wind speed</span>
                {{ windSpeed }}
            </div>
            <div>
                <span :class="$style.infoTitle">Pressure</span>
                {{ pressure }}
            </div>
            <div>
                <span :class="$style.infoTitle">Visibility</span>
                {{ humidity }}
            </div>
            <div>
                <span :class="$style.infoTitle">Humidity</span>
                {{ visibility }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { CityWheatherData } from "@/shared/api"

export default defineComponent({
    name: 'CityCard',
    props: {
        city: {
            type: Object as PropType<CityWheatherData>,
            required: true,
        },
    },
    computed: {
        wheatherInfo(): string {
            return `Feels like ${Math.round(this.city.main.feels_like)}°C. 
                    ${this.city.weather[0].main}. ${this.city.weather[0].description}.`
        },
        windSpeed(): string {
            return this.city.wind.speed + ' m/s'
        },
        pressure(): string {
            return this.city.main.pressure + ' hPa'
        },
        visibility(): string {
            return (this.city.visibility / 1000).toFixed(1) + ' km'
        },
        humidity(): string {
            return this.city.main.humidity + ' %'
        }
    }
})
</script>

<style lang="scss" module>
.infoTitle {
    display: block;
    font-weight: 500;
}

.cityCard {
    background: #e2f0ff;
    padding: 8px;
    border-radius: 4px;
}

.name {
    margin-bottom: 16px;
    font-weight: 500;
}

.wheatherInfo {
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
}
</style>