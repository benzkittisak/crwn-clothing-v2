// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import {
//   auth,
  signInWithGooglePopup,
//   signInWithGoogleRedirect,
  createUserDocmentFromAuth,
} from "../../utils/firebase/";

const SignIn = () => {

//  ถ้าต้องการใช้การ login แบบ redirect ให้ทำแบบนี้เพื่อที่จะได้ติดตามข้อมูลที่ได้จากอีกหน้าหนึ่งของ google
//   useEffect(() => {
//     async function getDataFromRedirect() {
//       const response = await getRedirectResult(auth);
//       const result = await response;
//       if(result) {
//         const userDocRef = await createUserDocmentFromAuth(result.user);
//       }
//     }
//     getDataFromRedirect().catch(console.error);
//   }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocmentFromAuth(user);
  };

  return (
    <div>
      <h1 style={{ textTransform: "capitalize" }}>Sign in page</h1>
      <button onClick={logGoogleUser}>Sign in with google popup</button>

      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
    </div>
  );
};

export default SignIn;
