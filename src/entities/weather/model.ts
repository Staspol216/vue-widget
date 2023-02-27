import { storageApi, weatherApi } from '@/shared/api';
import { CityWeatherData } from '@/shared/api/models';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const NAMESPACE = 'weathers';

export const use = defineStore(NAMESPACE, () => {
    const weathers = ref<CityWeatherData[]>([]);
    const isLoadingWeathers = ref(false);

    const isEmptyWeathersList = computed(() => weathers.value.length === 0)

    const addNewWeather = (newWeather: CityWeatherData) => {
        weathers.value.push(newWeather)
    }

    const deleteWeather = (cityId: number) => {
        weathers.value = weathers.value.filter(weather => weather.id !== cityId)
    }

    const getWeathersAsync = async () => {
        const cities = storageApi.cities.getCitiesFromLS();
        try {
            if (cities.length) {
                isLoadingWeathers.value = true;
                const wheathersRequests = cities.map(async city => {
                const { coord: { lat, lon }} = city;
                const { data: weather } = await weatherApi.weather.getWeatherByCoords(lat, lon);
                return weather
                })
                const newWeathers = await Promise.all(wheathersRequests)
                weathers.value = [...newWeathers]
            } else {
                isLoadingWeathers.value = true;
                const wheather: CityWeatherData = await weatherApi.weather.getLocationWeather()
                weathers.value = [wheather]
            }
        } finally {
            isLoadingWeathers.value = false;
        }
    }

    const reorderWeathers = (oldIndex: number, newIndex: number) => {
        const itemToMove = weathers.value.splice(oldIndex, 1)[0];
        weathers.value.splice(newIndex, 0, itemToMove);
    }

    onMounted(async () => {
        await getWeathersAsync();
    });

    return {
        weathers,
        addNewWeather,
        deleteWeather,
        getWeathersAsync,
        reorderWeathers,
        isLoadingWeathers,
        isEmptyWeathersList
    }
})