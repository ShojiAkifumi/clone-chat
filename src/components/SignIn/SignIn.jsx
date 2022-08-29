import React, { useContext } from "react";
import { signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { userContext } from "../../App";

const SignIn = () => {
  const provider = new GoogleAuthProvider();
  const auth = useContext(userContext);
  return (
    <div className="singin-btn">
      <button onClick={() => signInWithRedirect(auth, provider)}>
        サインイン
      </button>
    </div>
  );
};

export default SignIn;
