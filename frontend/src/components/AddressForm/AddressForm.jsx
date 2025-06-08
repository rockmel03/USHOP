import InputField from "../formFields/InputField";
import SelectOptionsField from "../formFields/SelectOptionsField";
import TextAreaField from "../formFields/TextAreaField";

const AddressForm = ({
  data = {
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
  },
  onChangeHandler,
  editable = true,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <TextAreaField
          label={"Address Line"}
          maxLength={10}
          placeholder="Enter your address line"
          name="address"
          value={data.address}
          onChange={onChangeHandler}
          editable={editable}
          required
        />
      </div>

      <SelectOptionsField
        options={{
          IN: "india",
          USA: "united state",
          UK: "united kingdom",
        }}
        label="Country"
        name="country"
        value={data.country}
        onChange={onChangeHandler}
        editable={editable}
        required
      />

      <SelectOptionsField
        options={{
          IN: "india",
          USA: "united state",
          UK: "united kingdom",
        }}
        label="Country"
        name="country"
        value={data.country}
        onChange={onChangeHandler}
        editable={editable}
        required
      />

      <SelectOptionsField
        options={{
          IN: "india",
          USA: "united state",
          UK: "united kingdom",
        }}
        label="City"
        name="city"
        value={data.city}
        onChange={onChangeHandler}
        editable={editable}
        required
      />

      <InputField
        label="Zip Code"
        type="text"
        placeholder="123-456"
        name="zipCode"
        value={data.zipCode}
        onChange={onChangeHandler}
        editable={editable}
        required
      />
    </div>
  );
};

export default AddressForm;
