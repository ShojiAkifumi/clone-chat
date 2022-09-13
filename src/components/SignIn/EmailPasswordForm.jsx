import React, { useState, useContext, useCallback } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { userContext } from "../../App";
import Button from "../utility/Button";
const EmailPasswordForm = ({ isCreateUser }) => {
  const auth = useContext(userContext);

  const [activeEmailAndPassword, setActiveEmailAndPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateUser = useCallback(() => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          photoURL: "./anonymity.png",
        });
      })
      .catch((error) => {
        window.alert(`ログインに失敗しました\nエラー内容: ${error.message}`);
      });
  }, [auth, email, password]);

  const SignIn = useCallback(() => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      window.alert(`ログインに失敗しました\nエラー内容: ${error.message}`);
    });
  }, [auth, email, password]);
  return (
    <>
      {activeEmailAndPassword ? (
        <div>
          <input
            type="text"
            className="text-box"
            placeholder={isCreateUser ? "新規メールアドレス" : "メールアドレス"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="text-box"
            placeholder={isCreateUser ? "新規パスワード" : "パスワード"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            buttonClass="auth-btn email-password-btn"
            buttonAction={isCreateUser ? CreateUser : SignIn}
          >
            送信する
          </Button>
        </div>
      ) : (
        <Button
          buttonClass="auth-btn email-password-btn"
          buttonAction={() => setActiveEmailAndPassword(true)}
        >
          {isCreateUser
            ? "メールアドレスで新規登録"
            : "メールアドレスでサインイン"}
        </Button>
      )}
    </>
  );
};

export default EmailPasswordForm;
