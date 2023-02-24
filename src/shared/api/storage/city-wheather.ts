import { BASE_UNITS, CITIES_LOCALSTORAGE_KEY } from "@/shared/const";
import { getLocation } from "@/shared/lib/get-user-location";
import { AxiosResponse } from "axios";
import { apiInstance } from "./base";
import { City, CityWeatherData, Coords } from "./models";

interface CityNameParams {
  lat?: number,
  lon?: number;
  q?: string;
  units: string;
  appid: string;
} 
const BASE_URL: string = '/data/2.5/weather';
const API_KEY: string = process.env.OPEN_WHEATHER_MAP_API_KEY || '';


export const getCities = (): City[] => {
  return JSON.parse(localStorage.getItem(CITIES_LOCALSTORAGE_KEY)) as City[] || [];
}





// При добавлении
export const getWeatherByCityName = (cityName: string): Promise<AxiosResponse<CityWeatherData>> => {
    const params: CityNameParams = {
      q: cityName,
      units: BASE_UNITS,
      appid: API_KEY,
    };
    return apiInstance.get(BASE_URL, { params });
}

// По локации пользователя
export const getWeatherByCoords = (lat: number, lon: number): Promise<AxiosResponse<CityWeatherData>> => {
  const params: CityNameParams = {
    lat,
    lon,
    units: BASE_UNITS,
    appid: API_KEY,
  };
  return apiInstance.get(BASE_URL, { params });
}

// Для добавления в LS
const saveCityToLocalStorage = (newCity: City) => {
  const cities = getCities();
  localStorage.setItem(CITIES_LOCALSTORAGE_KEY, JSON.stringify([...cities, newCity]))
}

export const getLocationWeather = async (): Promise<CityWeatherData> => {
  const { lat, lon } = await getLocation();
  const { data: locationWeather } = await getWeatherByCoords(lat, lon);

  const locationCity: City = {
    name: locationWeather.name,
    coord: locationWeather.coord,
    id: locationWeather.id
  }

  saveCityToLocalStorage(locationCity)

  return locationWeather
}

