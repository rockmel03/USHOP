import ProfileDetails from "../features/user/components/ProfileDetails";

const Profile = () => {
  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="max-w-screen-xl mx-auto px-4 2xl:px-0">
        <ProfileDetails />
      </div>
    </section>
  );
};

export default Profile;
