import { useEffect, useState } from "react";
import { useLocationData } from "../../location/hooks/useLocationData";
import TextAreaField from "../../../components/formFields/TextAreaField";
import Label from "../../../components/formFields/Label";
import InputField from "../../../components/formFields/InputField";

const AddressFields = ({
  initialData: { address, country, state, city, zipCode } = {
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  },
  getChanges,
}) => {
  const { countries, states, cities, loadStates, loadCities } =
    useLocationData();

  const [fieldsData, setFieldsData] = useState({
    address,
    country,
    state,
    city,
    zipCode,
  });

  const handleCountryChange = (e) => {
    const { value } = e.target;
    loadStates(value);
    setFieldsData((prev) => ({ ...prev, country: value, state: "", city: "" }));
  };

  const handleStateChange = (e) => {
    const { value } = e.target;
    loadCities(fieldsData.country, value);
    setFieldsData((prev) => ({ ...prev, state: value, city: "" }));
    getChanges?.(fieldsData);
  };

  const handleCityChange = (e) => {
    const { value } = e.target;
    setFieldsData((prev) => ({ ...prev, city: value }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFieldsData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (country) {
      loadStates(country);
      state && loadCities(country, state);
    }
  }, [country, state]);

  useEffect(() => {
    getChanges?.(fieldsData);
  }, [fieldsData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="sm:col-span-2">
        <TextAreaField
          label="Address Line"
          placeholder="Enter your address line"
          name="address"
          value={fieldsData.address}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <div className="mb-2">
          <Label htmlFor="country" label={"Country"} />
        </div>
        <select
          name="country"
          id="country"
          value={fieldsData.country}
          onChange={handleCountryChange}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">select</option>
          {countries.length > 0 &&
            countries.map((c) => {
              return (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>{" "}
      <div>
        <div className="mb-2">
          <Label htmlFor="state" label={"State"} />
        </div>
        <select
          name="state"
          id="state"
          value={fieldsData.state}
          onChange={handleStateChange}
          disabled={states.length === 0}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">select</option>
          {states.length > 0 &&
            states.map((c) => {
              return (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>
      <div>
        <div className="mb-2">
          <Label htmlFor="city" label={"City"} />
        </div>{" "}
        <select
          name="city"
          id="city"
          value={fieldsData.city}
          onChange={handleCityChange}
          disabled={cities.length === 0}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">select</option>
          {cities.length > 0 &&
            cities.map((c) => {
              return (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              );
            })}
        </select>
      </div>
      <InputField
        label="Zip Code"
        name="zipCode"
        placeholder="123-456"
        value={fieldsData.zipCode}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default AddressFields;
