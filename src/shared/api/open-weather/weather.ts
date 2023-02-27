
import { BASE_UNITS } from "@/shared/const";
import { getLocation } from "@/shared/lib/get-user-location";
import { AxiosResponse } from "axios";
import { saveCitiesToLS } from "../storage/city";
import { City } from "../storage/models";
import { apiInstance } from "./base";
import { CityWeatherData } from "./models";

interface BaseQueryParams {
    units: string;
    appid: string;
}
interface ParamsCityCoords extends BaseQueryParams {
    lat: number;
    lon: number;
}
interface ParamsCityName extends BaseQueryParams {
    q: string;
}
  
const BASE_URL: string = '/data/2.5/weather';
const API_KEY: string = process.env.OPEN_WHEATHER_MAP_API_KEY || '';
  
export const getWeatherByCityName = (cityName: string): Promise<AxiosResponse<CityWeatherData>> => {
    const params: ParamsCityName = {
      q: cityName,
      units: BASE_UNITS,
      appid: API_KEY,
    };
    return apiInstance.get(BASE_URL, { params });
}

export const getWeatherByCoords = (lat: number, lon: number): Promise<AxiosResponse<CityWeatherData>> => {
  const params: ParamsCityCoords = {
    lat,
    lon,
    units: BASE_UNITS,
    appid: API_KEY,
  };
  return apiInstance.get(BASE_URL, { params });
}

export const getLocationWeather = async (): Promise<CityWeatherData> => {
    const { lat, lon } = await getLocation();
    const { data: locationWeather } = await getWeatherByCoords(lat, lon);
  
    const locationCity: City = {
      name: locationWeather.name,
      coord: locationWeather.coord,
      id: locationWeather.id
    }
  
    saveCitiesToLS([locationCity])
    return locationWeather
  }