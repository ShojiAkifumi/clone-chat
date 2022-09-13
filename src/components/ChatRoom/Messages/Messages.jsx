import { useState, useEffect, createRef, useContext, useRef } from "react";
import { userContext } from "../../../App";
import { BsArrowClockwise } from "react-icons/bs";
import useMessages from "../../utility/useMessages";
import useScrollEffect from "../../utility/useScrollEffect";
import { changeBgEffect } from "../../utility/changeBgEffect";
import Text from "../../utility/Text";
import UserProfileModal from "./UserProfile";
import { useCallback } from "react";

const Messages = ({ scroll }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const auth = useContext(userContext);
  let LoginId = "";
  if (auth.currentUser) {
    LoginId = auth.currentUser.uid;
  }

  console.log(auth.currentUser);

  const [snapshot, loading, error] = useMessages();
  error && console.log(error);
  const [avatar, setAvatar] = useState(null);

  const hasImageRefs = useRef([]);
  const currentBgNumRef = useRef(null);
  useEffect(() => {
    setAvatar(auth.currentUser?.photoURL);
    if (currentBgNumRef.current !== null) {
      window.addEventListener("scroll", () =>
        changeBgEffect(hasImageRefs, currentBgNumRef)
      );
    }
    return () =>
      window.removeEventListener("scroll", () =>
        changeBgEffect(hasImageRefs, currentBgNumRef)
      );
  }, [auth, snapshot]);

  useScrollEffect(
    scroll,
    snapshot,
    currentBgNumRef.current === hasImageRefs.current.length - 1
  );

  const openUserModal = useCallback(() => {
    setUserModalOpen(true);
  }, []);
  const closeUserModal = useCallback(() => {
    setUserModalOpen(false);
  }, []);

  const ua = navigator.userAgent;
  const isIos =
    ua.indexOf("iPhone") >= 0 ||
    ua.indexOf("iPad") >= 0 ||
    ua.indexOf("iPod") >= 0 ||
    /^((?!chrome|android).)*safari/i.test(ua);
  return (
    <>
      {loading ? (
        <div className="isLoading">
          <BsArrowClockwise size="4em" />
        </div>
      ) : (
        <div className="messagesContainer">
          {snapshot &&
            snapshot.docs.map((s, index) => {
              if (index === 0) {
                hasImageRefs.current = [];
              }
              const message = s.data();
              let imageUrl = "";
              const isMe = message.uid === LoginId;
              if (message.imageName) {
                imageUrl =
                  process.env.REACT_APP_IMAGE_URL_1 +
                  message.imageName +
                  process.env.REACT_APP_IMAGE_URL_2;
                hasImageRefs.current = [...hasImageRefs.current, createRef()];
                currentBgNumRef.current = hasImageRefs.current.length - 1;
              }
              if (message.createdAt) {
                const createTimeString = message.createdAt
                  ?.toDate()
                  .toLocaleTimeString();
                var time = createTimeString.substring(
                  0,
                  createTimeString.lastIndexOf(":")
                );
              }
              return (
                <div
                  key={s.id}
                  ref={
                    message.imageName
                      ? hasImageRefs.current[currentBgNumRef.current]
                      : null
                  }
                  className={`talk ${isMe ? "me" : "reply"}${
                    message.createdAt ? " loaded" : ""
                  }${
                    2 > Date.now() / 1000 - message.createdAt?.seconds
                      ? " new"
                      : ""
                  }`}
                >
                  {message.text && (
                    <div className={`talkText ${isIos ? "is-ios" : "defult"}`}>
                      <Text text={message.text} />
                      <div className="user-block">
                        <time>{time}</time>
                        <img
                          src={isMe ? avatar : message.photoUrl}
                          alt={message.uid}
                          className="talkIcon"
                          width="36"
                          height="36"
                          onClick={isMe ? openUserModal : undefined}
                        />
                      </div>
                    </div>
                  )}
                  {message.imageName && (
                    <>
                      <div
                        className={`back-ground`}
                        id={`bg-${index}`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      ></div>
                      <img
                        src={imageUrl}
                        alt=""
                        id={`img-${index}`}
                        className="talkImage"
                        height="250"
                        width={message.imageRatio * 250}
                      />
                    </>
                  )}
                </div>
              );
            })}
          {userModalOpen && (
            <UserProfileModal
              openModal={openUserModal}
              closeModal={closeUserModal}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
