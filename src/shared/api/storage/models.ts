export interface Coords {
  lat: number;
  lon: number;
}

export interface City {
  name: string;
  coord: Coords;
  id: number;
}