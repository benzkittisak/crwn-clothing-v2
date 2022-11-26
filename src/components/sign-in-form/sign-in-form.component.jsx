import { useState , useContext } from "react";

import {
  signInWithGooglePopup,
  createUserDocmentFromAuth,
  SignInAuthUserWithEmailAndPassword,
} from "../../utils";
import { UserContext } from "../../contexts";

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const resetFormField = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocmentFromAuth(user);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const getErrorMessage = (error) => {
    switch (error.code) {
      case "auth/wrong-password":
        alert("Incorrect password");
        break;
      case "auth/user-not-found":
        alert("User not found !!");
        break;
      default:
        console.error(error);
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await SignInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user)
      resetFormField();
    } catch (error) {
      getErrorMessage(error);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={"Email"}
          inputOptions={{
            type: "email",
            onChange: handleChange,
            name: "email",
            value: email,
            required: true,
          }}
        />

        <FormInput
          label={"Password"}
          inputOptions={{
            type: "password",
            onChange: handleChange,
            name: "password",
            value: password,
            required: true,
          }}
        />

        <div className="button-container">
          <Button
            buttonOptions={{
              type: "submit",
              button_style: "",
            }}
          >
            Sign In
          </Button>
          <Button
            buttonOptions={{
              type: "button",
              button_style: "google",
              onClick: signInWithGoogle,
            }}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
