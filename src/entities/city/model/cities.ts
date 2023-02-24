import { storageApi } from '@/shared/api';
import { City } from '@/shared/api/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';

const NAMESPACE = 'cities';

export const use = defineStore(NAMESPACE, () => {
    const cities = ref<City[]>([]);

    const getCitiesAync = async () => {
        cities.value = storageApi.cities.getCities();
    }

    const addNewCity = async (cityName: string) => {
        const { data: newWeather } = await storageApi.cities.getWeatherByCityName(cityName);
    }

    return {
        cities,
        getCitiesAync,
        addNewCity
    }

})