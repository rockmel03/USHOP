import InputFeild from "./InputFeild";

const AddressForm = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InputFeild
        label={"Your Name*"}
        type="text"
        placeholder="Jhone Doe"
        required
      />
      <InputFeild
        label={"Phone Number*"}
        type="text"
        placeholder="123-456-7990"
        required
      />
      <div className="col-span-2">
        <label
          htmlFor="select-country-input-3"
          className="mb-2 block text-sm font-medium text-gray-900"
        >
          Address Line*
        </label>

        <textarea
          rows={3}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue500 focus:ring-blue-500"
          placeholder="Enter your address..."
          required
        ></textarea>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="select-country"
            className="block text-sm font-medium text-gray-900"
          >
            Country*
          </label>
        </div>
        <select
          id="select-country"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option selected>India</option>
          <option value="AS">Australia</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="UK">United Kingdom</option>
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="select-state"
            className="block text-sm font-medium text-gray-900"
          >
            State*
          </label>
        </div>
        <select
          id="select-state"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option selected>Uttarakhand</option>
          <option value="AS">Australia</option>
          <option value="FR">France</option>
          <option value="ES">Spain</option>
          <option value="UK">United Kingdom</option>
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center gap-2">
          <label
            htmlFor="select-city-input-3"
            className="block text-sm font-medium text-gray-900"
          >
            {" "}
            City*{" "}
          </label>
        </div>
        <select
          id="select-city-input-3"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        >
          <option selected>Haldwani</option>
          <option value="NY">New York</option>
          <option value="LA">Los Angeles</option>
          <option value="CH">Chicago</option>
          <option value="HU">Houston</option>
        </select>
      </div>

      <InputFeild
        label={"Zip Code*"}
        type="text"
        placeholder="123-456"
        required
      />
    </div>
  );
};

export default AddressForm;
