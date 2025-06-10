import { useState } from "react";
import Modal from "../../../components/Modal";
import AddressForm from "./AddressForm";
import { useDispatch, useSelector } from "react-redux";
import { saveAddressAsync } from "../userThunk";

const AddressDetails = () => {
  const { profile } = useSelector((state) => state.user);
  const address = profile.address;

  const dispatch = useDispatch();

  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleAddClick = () => setShowAddressModal(true);
  const handleEditClick = () => setShowAddressModal(true);

  const handleSaveAddress = (data) => {
    dispatch(saveAddressAsync(data));
  };
  return (
    <>
      <div>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Address
          </h2>

          {address ? (
            <button type="button" onClick={handleEditClick}>
              <div className="pl-2 pr-3 py-1.5 rounded-full text-sm font-semibold  hover:text-white hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-blue-400">
                <span className="mr-0.5">
                  <i className="ri-pencil-line"></i>
                </span>
                Edit
              </div>
            </button>
          ) : (
            <button type="button" onClick={handleAddClick}>
              <div className="pl-2 pr-3 py-1.5 rounded-full text-sm font-semibold  hover:text-white hover:bg-blue-700 cursor-pointer focus:ring-4 focus:ring-blue-400">
                <span className="mr-0.5">
                  <i className="ri-add-line"></i>
                </span>
                Add
              </div>
            </button>
          )}
        </div>
        <br />
        {address ? (
          <div className="">
            <p className="font-semibold">{profile.fullname}</p>
            <div>
              <pre className="font-sans">{address.address}</pre>
            </div>
            <p>
              {address.city}, {address.state} {address.zipCode}
            </p>
            <p>{address.country}</p>
            <div className="flex gap-4 mt-2">
              <button
                type="button"
                className="text-sm hover:underline cursor-pointer"
              >
                Edit
              </button>
              <button
                type="button"
                className="text-sm hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>Address Not Available</p>
          </div>
        )}
      </div>
      <Modal
        showModal={showAddressModal}
        hideModal={() => setShowAddressModal(false)}
      >
        <div className="bg-white p-5 rounded w-xs sm:w-sm md:w-md">
          <AddressForm
            initialData={address}
            submitHandler={handleSaveAddress}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddressDetails;
