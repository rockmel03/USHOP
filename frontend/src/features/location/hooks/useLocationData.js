import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries, fetchStates, fetchCities } from "../locationThunks";

export const useLocationData = () => {
  const dispatch = useDispatch();

  const { countries, states, cities, loading, error } = useSelector(
    (state) => state.location
  );

  const loadCountries = () => {
    return dispatch(fetchCountries());
  };

  const loadStates = (countryCode) => {
    return dispatch(fetchStates(countryCode));
  };

  const loadCities = (countryCode, stateCode) => {
    return dispatch(fetchCities({ countryCode, stateCode }));
  };

  useEffect(() => {
    if (loading) return;
    const controller = loadCountries();
    return () => controller.abort();
  }, []);

  return {
    countries,
    states,
    cities,
    loading,
    error,
    loadCountries,
    loadStates,
    loadCities,
  };
};
