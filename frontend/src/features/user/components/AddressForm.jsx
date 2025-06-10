import { useEffect, useState } from "react";
import AddressFields from "./AddressFields";

const AddressForm = ({
  initialData = {
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
  },
}) => {
  const [formData, setFormData] = useState(initialData);

  const getChanges = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleCancelClick = () => {
    setFormData(initialData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("saving address.. ", formData);
  };
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl">
        Address
      </h1>
      <br />
      <AddressFields initialData={formData} getChanges={getChanges} />
      <div className="my-4 flex gap-1 justify-between">
        <button type="reset" onClick={handleCancelClick}>
          <div className="pl-2 pr-3 py-1.5 rounded-full text-sm font-semibold cursor-pointer hover:underline">
            <span className="mr-0.5">
              <i className="ri-close-line"></i>
            </span>
            Cancel
          </div>
        </button>
        <button type="Submit">
          <div className="pl-2 pr-3 py-1.5 rounded-full text-sm text-white font-semibold bg-gray-600 hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-blue-400">
            <span className="mr-0.5">
              <i className="ri-save-line"></i>
            </span>
            Save
          </div>
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
