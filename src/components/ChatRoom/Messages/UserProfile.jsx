import React, { useContext } from "react";
import Button from "../../utility/Button";
import Modal from "../../utility/Modal";
import { signOut } from "firebase/auth";
import { userContext } from "../../../App";
const UserProfile = (props) => {
  const auth = useContext(userContext);
  return (
    <Modal
      openModal={() => props.setUserModalOpen(true)}
      closeModal={() => props.setUserModalOpen(false)}
    >
      <div className="user-avatar-view">
        <img src={props.photoUrl} alt="" width="70" height="70" />
      </div>
      <Button
        buttonClass="logout-btn"
        buttonAction={() => {
          props.setUserModalOpen(false);
          signOut(auth);
        }}
      >
        ログアウト
      </Button>
    </Modal>
  );
};

export default UserProfile;
