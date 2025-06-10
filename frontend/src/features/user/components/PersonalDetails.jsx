import React, { useState } from "react";
import Modal from "../../../components/Modal";
import ProfileDetailsForm from "./ProfileDetailsForm";

const PersonalDetails = ({ data: { fullname, email, phone, dob } }) => {
  const [showEditForm, setShowEditForm] = useState(false);

  const handleEditClick = () => {
    setShowEditForm(true);
  };
  return (
    <>
      <div>
        {" "}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Personal Details
          </h2>

          <button type="button" onClick={handleEditClick}>
            <div className="pl-2 pr-3 py-1.5 rounded-full text-sm font-semibold  hover:text-white hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-blue-400">
              <span className="mr-0.5">
                <i className="ri-pencil-line"></i>
              </span>
              Edit
            </div>
          </button>
        </div>
        <br />
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h5 className="font-semibold text-gray-400">Name</h5>
            <p>{fullname || "N/A"}</p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-400">Email</h5>
            <p>{email || "N/A"}</p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-400">Phone Number</h5>
            <p>{phone || "N/A"}</p>
          </div>
          <div>
            <h5 className="font-semibold text-gray-400">Date of Birth</h5>
            <p>{dob || "N/A"}</p>
          </div>
        </div>
      </div>
      <Modal
        showModal={showEditForm}
        hideModal={() => setShowEditForm(false)}
      >
        <div className="bg-white p-5 rounded w-xs sm:w-sm md:w-md">
          <ProfileDetailsForm />
        </div>
      </Modal>
    </>
  );
};

export default PersonalDetails;
