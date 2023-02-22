<template>
    <div :class="$style.app">
        <div :class="$style.widget">
            <div :class="$style.header">
                <div :class="$style.city">
                    {{ wheather.name }}
                </div>
                <div :class="$style.menu">
                    <Gear />
                </div>
            </div>
            <div :class="$style.body">

            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { getWeatherByCity } from '@/shared/api/wheather';
import { weather } from "@/shared/api/mock";
import Gear from "@/shared/ui/icons/Gear.vue"


export default {
    name: 'Wheather',
    components: {
        Gear,
    },
    async mounted() {

        console.log(weather)
        // const weatherData = await getWeatherByCity('Paris');
        // console.log(weatherData);
    },
    data() {
        return {
            wheather: weather,
        }
    }
}

</script>

<style lang="scss" module>
.app {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    min-height: 100vh;
}

.widget {
    padding: 16px;
    height: 300px;
    width: 250px;
    background-color: red;
    filter: drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.32));
}

.header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    background-color: blue;
}

.city {}

.menu {}
</style>

