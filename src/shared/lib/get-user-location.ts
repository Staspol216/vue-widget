import { Coords } from "@/shared/api";

export function getLocation(): Promise<Coords> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return 
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          error => {
            reject(error);
          }
        );
    });
}
  