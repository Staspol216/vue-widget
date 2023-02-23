import { apiInstance } from "./base";
import { CityWheatherData } from "./models";

interface CityNameParams {
  q: string;
  units: string;
  appid: string;
} 

const BASE_URL = '/data/2.5/weather';

export const getWeatherByCity = async (cityName: string): Promise<CityWheatherData> => {
    const params: CityNameParams = {
      q: cityName,
      units: 'metric',
      appid: process.env.OPEN_WHEATHER_MAP_API_KEY || '',
    };
  
    return apiInstance.get(BASE_URL, { params });
}