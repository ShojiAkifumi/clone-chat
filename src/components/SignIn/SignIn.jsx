import React, { useContext } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { userContext } from "../../App";
import Button from "../utility/Button";
import { useState } from "react";
import Modal from "../utility/Modal";

const SignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
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
          <h1>サインイン・新規登録</h1>
          <Button
            buttonClass="auth-btn google-btn"
            buttonAction={() => signInWithRedirect(auth, googleProvider)}
            logo="google.svg"
          >
            Googleでサインイン
          </Button>
          <Button
            buttonClass="auth-btn twitter-btn"
            buttonAction={() => signInWithRedirect(auth, twitterProvider)}
            logo="twitter.svg"
          >
            Twitterでサインイン
          </Button>
          <Button
            buttonClass="auth-btn facebook-btn"
            buttonAction={() => signInWithRedirect(auth, facebookProvider)}
            logo="facebook.svg"
          >
            Facebookでサインイン
          </Button>
        </Modal>
      )}
    </>
  );
};

export default SignIn;
