import axios from "axios";

// Función para validar la ciudad, provincia y país con GeoNames
export const validateLocationGeoNames = async(
    city: string,
  province: string,
  country: string
): Promise<boolean> => {
  const username = "marcosnicolas"; // Reemplaza con tu usuario de GeoNames
  const url = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&adminCode1=${encodeURIComponent(
    province
  )}&maxRows=1&username=${username}`;

  try {
    const response = await axios.get(url);
    const results = response.data.geonames;

    if (results.length > 0) {
      const result = results[0];
      const countryMatch = result.countryName === country;
      const provinceMatch = result.adminName1 === province;
      const cityMatch = result.name === city;

      return countryMatch && provinceMatch && cityMatch;
    }

    return false; 
  } catch (error) {
    console.error("Error al validar ubicación:", error);
    return false;
  }
}