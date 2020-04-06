const APPID = "4d099c859e69ede3e209c51a94a6e81b";

export const weatherApi = async (location) => {
  try{
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${APPID}&units=metric`
    );
    const data = await response.json();
    return data;
  } catch(error){
    throw error;
  }
}