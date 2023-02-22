import { api } from "./api";
import { CityNameParams, WeatherData } from "./types";

export const getWeatherByCity = async (cityName: string): Promise<WeatherData> => {
    const params: CityNameParams = {
      q: cityName,
      units: 'metric',
      appid: 'b292e085dfc5e55c46eea3b603652b5f' || '',
    };
  
    const response = await api.get<WeatherData>('/data/2.5/weather', { params });
  
    return response.data;
}