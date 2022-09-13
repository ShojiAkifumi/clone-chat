import React, { useRef, useState, useContext, useCallback } from "react";
import Button from "../../utility/Button";
import Modal from "../../utility/Modal";
import { signOut } from "firebase/auth";
import { userContext } from "../../../App";
import Cropper from "react-easy-crop";
import uploadAvaterImage from "../../utility/uploadAvaterImage";
import getCroppedImg from "../../utility/getCroppedImg";
import { MdModeEdit } from "react-icons/md";

const UserProfileModal = (props) => {
  const auth = useContext(userContext);
  const nameRef = useRef(null);
  const [avatar, setAvatar] = useState(props.photoUrl);
  const [name, setName] = useState(props.name);

  const [cropperIsOpen, setCropperIsOpen] = useState(false);

  const [imgSrc, setImgSrc] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const ASPECT = 1;
  const [croppedAreaPixels, setCroppedAreaPixels] = useState();

  const pushCroppedImage = useCallback(async () => {
    if (!croppedAreaPixels) return;
    try {
      props.setAvatarUrl(imgSrc);
      const [file, url] = await getCroppedImg(imgSrc, croppedAreaPixels);
      uploadAvaterImage(auth, file);
      setAvatar(url);
    } catch (e) {
      console.error(e);
    }
  }, [props, auth, croppedAreaPixels, imgSrc]);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const onFileChange = useCallback(async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        if (reader.result) {
          setImgSrc(reader.result.toString() || "");
          setCropperIsOpen(true);
        }
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }, []);

  return (
    <>
      {!cropperIsOpen ? (
        <Modal openModal={props.openModal} closeModal={props.closeModal}>
          <div className="user-avatar-view">
            <label htmlFor="avatar">
              <img src={avatar} alt={props.name} width="100" height="100" />
            </label>
            {props.isMe && (
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={onFileChange}
              />
            )}
          </div>
          {isEdit ? (
            <p className="name-input">
              <input
                value={name}
                className="text-box"
                name="name"
                ref={nameRef}
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                buttonClass="close-btn"
                buttonAction={() => {
                  props.closeModal();
                }}
              >
                OK
              </Button>
            </p>
          ) : (
            <p className="user-name">
              {props.name}
              {props.isMe && (
                <MdModeEdit
                  onClick={() => {
                    setIsEdit(true);
                    nameRef.current.focus();
                  }}
                  className="edit-btn"
                />
              )}
            </p>
          )}

          <Button
            buttonClass="close-btn"
            buttonAction={() => {
              props.closeModal();
            }}
          >
            閉じる
          </Button>
          {props.isMe && (
            <button
              className="logout-btn"
              onClick={() => {
                props.closeModal();
                signOut(auth);
              }}
            >
              ログアウト
            </button>
          )}
        </Modal>
      ) : (
        <>
          <Modal openModal={props.openModal} closeModal={props.closeModal}>
            <div className="crop-wrapper">
              <Cropper
                image={imgSrc}
                crop={crop}
                zoom={zoom}
                aspect={ASPECT}
                cropShape="round"
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="controls">
              <div className="zoom-range">
                <input
                  type="range"
                  value={zoom}
                  step={0.1}
                  min={1}
                  max={8}
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                />
              </div>
              <div className="crop-btns">
                <Button
                  buttonClass="avatar-cancel-btns"
                  buttonAction={() => {
                    setCropperIsOpen(false);
                  }}
                >
                  キャンセル
                </Button>
                <Button
                  buttonClass="avatar-submit-btn"
                  buttonAction={() => {
                    setCropperIsOpen(false);
                    pushCroppedImage();
                  }}
                >
                  閉じる
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default UserProfileModal;
