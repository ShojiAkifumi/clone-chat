import React, { useState, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { userContext } from "../../App";
import Button from "../utility/Button";
const EmailPasswordForm = ({ isCreateUser }) => {
  const auth = useContext(userContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateUser = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password);
  };
  return (
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
  );
};

export default EmailPasswordForm;
