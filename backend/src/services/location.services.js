import { City, Country, State } from "country-state-city";
import ApiError from "../utils/ApiError.js";

export const getAllContries = () => {
  const countries = Country.getAllCountries();
  return countries.map((item) => {
    const { name, isoCode, flag, phonecode } = item;
    return { name, isoCode, flag, phonecode };
  });
};

export const getStatesOfCountry = (countryCode) => {
  if (!countryCode) throw ApiError("invalid country code");
  return State.getStatesOfCountry(countryCode);
};

export const getCitiesOfStatesOfCountry = (countryCode, stateCode) => {
  if (!countryCode) throw ApiError("invalid country code");
  if (!stateCode) throw ApiError("invalid state code");

  return City.getCitiesOfState(countryCode, stateCode);
};
