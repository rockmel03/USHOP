import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../userThunk";
import Loading from "../../../components/Loading";
import ProfileDetailsForm from "./ProfileDetailsForm";
import AddressDetailsFrom from "./AddressDetailsForm";

const ProfileDetails = () => {
  const { profile, loading, error } = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || profile) return;

    const controller = dispatch(getProfile());
    return () => {
      controller.abort();
    };
  }, [isAuthenticated, profile]);

  if (error) toast.error(error);

  if (loading) {
    return (
      <div className="mx-auto max-w-screen-xl min-h-[50vh] grid place-items-center">
        <Loading />
        <p>404 Data not found</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-screen-xl min-h-[50vh] grid place-items-center">
        <p>404 Data not found</p>
      </div>
    );
  }
  return (
    <div>
      <div className="w-full flex items-center justify-between gap-1">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">
          Profile Infromation
        </h2>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <img
          src="/images/Profile-avatar-placeholder.png"
          alt="profile-pic"
          className="w-16 aspect-square object-cover rounded-full"
        />
        <div>
          <div className="flex items-center gap-1">
            <p className="text-lg font-medium capitalize">{profile.fullname}</p>
            <div
              title={profile.isVerified ? "Verified" : "Unverified"}
              className={`hover:scale-110 transition ${
                profile.isVerified ? "text-blue-400" : "text-gray-300"
              }`}
            >
              <i className="ri-verified-badge-fill ri-lg"></i>
            </div>
          </div>
          <p className="text-lg text-gray-500 capitalize">{profile.role}</p>
        </div>
      </div>

      <hr className="my-6 border-gray-300" />

      <div className="">
        <ProfileDetailsForm />
        <hr className="my-6 border-gray-300" />
        <AddressDetailsFrom />
        <hr className="my-6 border-gray-300" />
      </div>
    </div>
  );
};

export default ProfileDetails;
