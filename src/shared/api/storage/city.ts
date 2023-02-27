
import { CITIES_LOCALSTORAGE_KEY } from "@/shared/const";
import { City } from "./models";

export const getCitiesFromLS = (): City[] => {
  const cities = localStorage.getItem(CITIES_LOCALSTORAGE_KEY) || '[]';
  return JSON.parse(cities);
}

export const saveCitiesToLS = (newCities: City[]) => {
  localStorage.setItem(CITIES_LOCALSTORAGE_KEY, JSON.stringify(newCities))
}


