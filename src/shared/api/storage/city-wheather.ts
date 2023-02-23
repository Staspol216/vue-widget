import { CITIES_LOCALSTORAGE_KEY } from "@/shared/const";
import { generateId } from "@/shared/lib/generate-id";
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

const BASE_URL = '/data/2.5/weather';
const API_KEY = process.env.OPEN_WHEATHER_MAP_API_KEY || '';
// TODO move to enums
const BASE_UNITS = 'metric';

// TODO types for city
const getCities = (): City[] => {
  return JSON.parse(localStorage.getItem(CITIES_LOCALSTORAGE_KEY)) || [];
}

export const getWeatherByCity = (cityName: string): Promise<AxiosResponse<CityWeatherData>> => {
    const params: CityNameParams = {
      q: cityName,
      units: BASE_UNITS,
      appid: API_KEY,
    };
    return apiInstance.get(BASE_URL, { params });
}

export const getWeatherByCoords = (lat: number, lon: number): Promise<AxiosResponse<CityWeatherData>> => {
  const params: CityNameParams = {
    lat,
    lon,
    units: BASE_UNITS,
    appid: API_KEY,
  };
  return apiInstance.get(BASE_URL, { params });
}

const getLocationWeather = async (): Promise<CityWeatherData> => {
  const { lat, lon } = await getLocation();
  const { data: locationWeather } = await getWeatherByCoords(lat, lon);

  const locationCity: City = {
    name: locationWeather.name,
    coord: locationWeather.coord,
    // TODO id???
    id: locationWeather.id
  }

  localStorage.setItem(CITIES_LOCALSTORAGE_KEY, JSON.stringify([locationCity]))

  return locationWeather
}

export const getCitiesWeather = async () => {
  const cities = getCities();
  if (cities.length) {
    const wheathers = cities.map(async city => {
      const { coord: { lat, lon }} = city;
      const { data: weather } = await getWeatherByCoords(lat, lon);
      return weather
    })
    return await Promise.all(wheathers)
  } else {
    // TODO types
    const wheather: CityWeatherData = await getLocationWeather()

    return [wheather]
  }
}

