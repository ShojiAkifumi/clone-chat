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
import EmailPasswordForm from "./EmailPasswordForm";

const SignIn = () => {
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const auth = useContext(userContext);
  const [isOpenSignin, setIsOpenSignin] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);
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
          {isCreateUser ? <h1>ユーザー登録</h1> : <h1>サインイン</h1>}
          <EmailPasswordForm isCreateUser={isCreateUser} />
          <p className="auth-or">
            <span>もしくは</span>
          </p>
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

          <p className="auth-or mt-56">
            {isCreateUser ? (
              <span>すでにアカウントをお持ちの方</span>
            ) : (
              <span>初めての方はこちら</span>
            )}
          </p>
          <Button
            buttonClass="switching-credential"
            buttonAction={() => setIsCreateUser(!isCreateUser)}
          >
            {isCreateUser ? "サインイン" : "ユーザー登録"}
          </Button>
        </Modal>
      )}
    </>
  );
};

export default SignIn;
