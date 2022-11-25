// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";

import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
// import {
// //   auth,
//   signInWithGooglePopup,
// //   signInWithGoogleRedirect,
//   createUserDocmentFromAuth,
// } from "../../utils/firebase";

import './authentication.styles.scss';

const Authentication = () => {

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

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with google redirect
      </button> */}
    </div>
  );
};

export default Authentication;
