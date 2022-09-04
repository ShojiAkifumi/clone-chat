import React, { useState, useContext } from "react";
import Button from "../../utility/Button";
import Modal from "../../utility/Modal";
import { signOut } from "firebase/auth";
import { userContext } from "../../../App";
import uploadAvaterImage from "../../utility/uploadAvaterImage";

const UserProfileModal = (props) => {
  const auth = useContext(userContext);
  const [avatar, setAvatar] = useState(props.photoUrl);
  return (
    <Modal openModal={props.openModal} closeModal={props.closeModal}>
      <div className="user-avatar-view">
        <label htmlFor="avatar">
          <img src={avatar} alt="aaaaa" width="100" height="100" />
        </label>
        <input
          type="file"
          name="avatar"
          id="avatar"
          onChange={(e) => uploadAvaterImage(e, auth, setAvatar)}
        />
      </div>
      <Button
        buttonClass="logout-btn"
        buttonAction={() => {
          props.closeModal();
          signOut(auth);
        }}
      >
        ログアウト
      </Button>
    </Modal>
  );
};

export default UserProfileModal;
