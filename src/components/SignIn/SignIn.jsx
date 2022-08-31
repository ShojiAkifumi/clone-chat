import React, { useContext } from "react";
import {
  signInWithRedirect,
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
            buttonAction={() => signInWithRedirect(auth, twitterProvider)}
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
