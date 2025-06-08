import InputField from "../../components/formFields/InputField";

const ProfileForm = ({
  data = {
    fullname: "",
    email: "",
    phoneNumber: "",
    dob: "",
  },
  onChangeHandler,
  editable = true,
}) => {
  return (
    <div className=" grid md:grid-cols-2 gap-4">
      <InputField
        label="Full Name"
        type="text"
        placeholder="Enter your first name"
        name="fullname"
        value={data.fullname}
        onChange={onChangeHandler}
        editable={editable}
        required
      />
      <InputField
        label="Email"
        type="email"
        placeholder="user@example.com"
        name="email"
        value={data.email}
        onChange={onChangeHandler}
        editable={editable}
        required
      />
      <InputField
        label="Phone Number"
        type="tel"
        placeholder="Enter your last name"
        value={data.phoneNumber}
        onChange={onChangeHandler}
        editable={editable}
        required
      />
      <InputField
        label="Date of Birth"
        type="date"
        name="dob"
        value={data.dob}
        onChange={onChangeHandler}
        editable={editable}
        required
      />
    </div>
  );
};

export default ProfileForm;
