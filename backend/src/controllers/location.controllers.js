import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as LocationServices from "../services/location.services.js";

export const getAllCountries = asyncHandler(async (req, res) => {
  const countries = LocationServices.getAllContries();

  return res
    .status(200)
    .json(ApiResponse.success(countries, "Countries fetched successfully"));
});

export const getStatesOfCountry = asyncHandler(async (req, res) => {
  const { countryCode } = req.params;
  const states = LocationServices.getStatesOfCountry(countryCode);

  return res
    .status(200)
    .json(ApiResponse.success(states, "States fetched successfully"));
});

export const getCitiesOfState = asyncHandler(async (req, res) => {
  const { countryCode, stateCode } = req.params;

  const cities = LocationServices.getCitiesOfStatesOfCountry(
    countryCode,
    stateCode
  );
  return res
    .status(200)
    .json(ApiResponse.success(cities, "Cities` fetched successfully"));
});
