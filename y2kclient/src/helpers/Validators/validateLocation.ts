import axios from "axios";

export const validateLocationGeoNames = async (
  city: string,
  province: string,
  country: string
): Promise<boolean> => {
  const username = "marcosnicolas"; // Reemplaza con tu usuario de GeoNames
  const url = `http://api.geonames.org/searchJSON?country=${encodeURIComponent(
    country
  )}&adminCode1=${encodeURIComponent(
    province
  )}&name=${encodeURIComponent(city)}&maxRows=1&username=${username}`;

  console.log("URL generada:", url);
  try {
    const response = await axios.get(url);
    const results = response.data.geonames;

    if (results && results.length > 0) {
      const result = results[0];
      const countryMatch = result.countryName === country;
      const provinceMatch = result.adminName1 === province;
      const cityMatch = result.name === city;

      return countryMatch && provinceMatch && cityMatch;
    }

    return results;
  } catch (error) {
    console.error("Error al validar ubicación:", error);
    return false;
  }
};