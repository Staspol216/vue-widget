import { storageApi, weatherApi } from '@/shared/api';
import { City, CityWeatherData } from '@/shared/api/models';
import { defineStore } from 'pinia';
import { computed, onMounted, ref } from 'vue';

const NAMESPACE = 'cities';

export const use = defineStore(NAMESPACE, () => {
    const cities = ref<City[]>([]);
    const isLoadingCities = ref<boolean>(false);

    const isEmptyCitiesList = computed(() => cities.value.length === 0);

    const getCities = async () => {
        cities.value = await storageApi.cities.getCitiesFromLS();
    }

    const addNewCity = async (cityName: string): Promise<CityWeatherData> => {
        try {
            isLoadingCities.value = true
            const { data: cityWeatherData } = await weatherApi.weather.getWeatherByCityName(cityName);
            const newCity: City = {
                name: cityName,
                coord: cityWeatherData.coord,
                id: cityWeatherData.id,
            };
            storageApi.cities.saveCitiesToLS([...cities.value, newCity]);
            getCities();
            return cityWeatherData;
        } finally {
            isLoadingCities.value = false
        }
    }

    const deleteCity = async (id: number) => {
        const filteredCities = cities.value.filter(city => city.id !== id);
        storageApi.cities.saveCitiesToLS([...filteredCities]);
        getCities();
    }

    const reorderCities = () => storageApi.cities.saveCitiesToLS([...cities.value]);

    onMounted(async () => {
        await getCities();
    });

    return {
        cities,
        getCities,
        addNewCity,
        deleteCity,
        reorderCities,
        isLoadingCities,
        isEmptyCitiesList
    }

})