import React, { useContext } from "react";
import {
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
} from "firebase/auth";
import { userContext } from "../../App";
import Button from "../utility/Button";
import { useState } from "react";
import Modal from "../utility/Modal";

const SignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const auth = useContext(userContext);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  return (
    <>
      <Button
        buttonClass="singin-btn"
        buttonAction={() => setIsOpenSignin(!isOpenSignin)}
      >
        サインイン
      </Button>
      {isOpenSignin && (
        <Modal
          openModal={() => setIsOpenSignin(true)}
          closeModal={() => setIsOpenSignin(false)}
        >
          <Button
            buttonClass="auth-btn google-btn"
            buttonAction={() => signInWithRedirect(auth, googleProvider)}
          >
            Googleでサインイン
          </Button>
          <Button
            buttonClass="auth-btn twitter-btn"
            buttonAction={() =>
              signInWithPopup(auth, twitterProvider)
                .then((result) => {
                  const credential =
                    TwitterAuthProvider.credentialFromResult(result);
                  const token = credential.accessToken;
                  const secret = credential.secret;

                  const user = result.user;
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  console.log(errorCode);
                  const errorMessage = error.message;
                  console.log(errorMessage);
                  const email = error.customData.email;
                  console.log(email);
                  const credential =
                    TwitterAuthProvider.credentialFromError(error);
                  console.log(credential);
                })
            }
          >
            Twitterでサインイン
          </Button>
          <Button
            buttonClass="auth-btn facebook-btn"
            buttonAction={() => signInWithRedirect(auth, googleProvider)}
          >
            Facebookでサインイン
          </Button>
        </Modal>
      )}
    </>
  );
};

export default SignIn;
