import { storageApi } from '@/shared/api';
import { CityWeatherData } from '@/shared/api/models';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { cityModel } from '../city';

const NAMESPACE = 'weathers';

export const use = defineStore(NAMESPACE, () => {
    const weathers = ref<CityWeatherData[]>([]);
    const citiesStore = cityModel.use();

    const addNewWeather = (newWeather: CityWeatherData) => {
        weathers.value.push(newWeather)
    }

    const getWeathersAsync = async () => {
        const cities = citiesStore.cities;
        if (cities.length) {
          // TODO get by IDs
          const wheathersRequests = cities.map(async city => {
            const { coord: { lat, lon }} = city;
            const { data: weather } = await storageApi.cities.getWeatherByCoords(lat, lon);
            return weather
          })
          const newWeathers = await Promise.all(wheathersRequests)
          weathers.value = [...newWeathers]
        } else {
          const wheather: CityWeatherData = await storageApi.cities.getLocationWeather()
          weathers.value = [wheather]
        }
      }

    return {
        weathers,
        addNewWeather,
        getWeathersAsync
    }

})