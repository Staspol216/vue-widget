export function getLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) return 
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          error => {
            reject(error);
          }
        );
    });
}
  