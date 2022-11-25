import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocmentFromAuth,
} from "../../utils/firebase";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  photoURL:
    "https://cdn.discordapp.com/attachments/966965279466864664/1045597005008863263/User_Avatar_CRWN-V2.png",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword, photoURL } =
    formFields;

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("the password don't match!!");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocmentFromAuth(user, { displayName, photoURL }).then(
        () => resetFormField()
      );
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Cannot create user , email already in use");
      else console.log(error);
    }
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Display Name"}
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
          required
        />

        <FormInput
          label={"Email"}
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
          required
        />

        <FormInput
          label={"Password"}
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />

        <FormInput
          label={"Confirm Password"}
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
