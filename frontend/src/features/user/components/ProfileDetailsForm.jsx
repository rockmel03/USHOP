import { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../../components/formFields/InputField";

const ProfileDetailsForm = () => {
  const {
    profile: { fullname, email, phoneNumber, dob } = {
      fullname: "",
      email: "",
      phoneNumber: "",
      dob: "",
    },
  } = useSelector((state) => state.user);

  const initialFromData = {
    fullname,
    email,
    phoneNumber,
    dob,
  };

  const [formData, setFormData] = useState({ ...initialFromData });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    setFormData({ ...initialFromData });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <h1 className="text-xl text-center font-semibold text-gray-900 sm:text-2xl">
          Personal Details
        </h1>
        <br />
        <div className="grid md:grid-cols-1 gap-4">
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your first name"
            name="fullname"
            value={formData.fullname}
            onChange={onChangeHandler}
            required
          />
          <InputField
            label="Email"
            type="email"
            placeholder="user@example.com"
            name="email"
            value={formData.email}
            onChange={onChangeHandler}
            required
          />
          <InputField
            label="Phone Number"
            type="tel"
            placeholder="Enter your last name"
            value={formData.phoneNumber}
            onChange={onChangeHandler}
            required
          />
          <InputField
            label="Date of Birth"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={onChangeHandler}
            required
          />
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
        </div>
      </div>
    </form>
  );
};

export default ProfileDetailsForm;
