import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileForm from "../../../components/ProfileForm/ProfileForm";

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

  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ ...initialFromData });

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleProfieInputChange = (e) => {
    if (!editable) return;
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancelClick = () => {
    setEditable(false);
    setFormData({ ...initialFromData });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Personal Details
          </h1>

          <div className="flex gap-1">
            {!editable && (
              <button type="button" onClick={handleEditClick}>
                <div className="pl-2 pr-3 py-1.5 rounded-full text-sm font-semibold  hover:text-white hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-blue-400">
                  <span className="mr-0.5">
                    <i className="ri-pencil-line"></i>
                  </span>
                  Edit
                </div>
              </button>
            )}

            {editable && (
              <>
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
              </>
            )}
          </div>
        </div>
        <br />
        <ProfileForm
          data={formData}
          editable={editable}
          onChangeHandler={handleProfieInputChange}
        />
      </div>
    </form>
  );
};

export default ProfileDetailsForm;
