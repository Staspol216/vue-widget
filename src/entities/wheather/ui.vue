<template>
    <div :class="$style.cityCard">
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
            {{ weatherInfo }}
        </div>
        <div :class="$style.details">
            <div>
                <span>Wind speed</span>
                {{ windSpeed }}
            </div>
            <div>
                <span>Pressure</span>
                {{ pressure }}
            </div>
            <div>
                <span>Visibility</span>
                {{ humidity }}
            </div>
            <div>
                <span>Humidity</span>
                {{ visibility }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CityWeatherData } from "@/shared/api"

export default defineComponent({
    name: 'WheatherCard',
    props: {
        weather: {
            type: Object as PropType<CityWeatherData>,
            required: true,
        },
    },
    computed: {
        weatherInfo(): string {
            return `Feels like ${Math.round(this.weather.main.feels_like)}°C. 
                    ${this.weather.weather[0].main}. ${this.weather.weather[0].description}.`
        },
        windSpeed(): string {
            return this.weather.wind.speed + ' m/s'
        },
        pressure(): string {
            return this.weather.main.pressure + ' hPa'
        },
        visibility(): string {
            return (this.weather.visibility / 1000).toFixed(1) + ' km'
        },
        humidity(): string {
            return this.weather.main.humidity + ' %'
        }
    }
})
</script>

<style lang="scss" module>
.cityCard {
    background: #e2f0ff;
    padding: 8px;
    border-radius: 4px;
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