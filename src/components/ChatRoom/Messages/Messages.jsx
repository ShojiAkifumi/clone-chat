import { useState, useEffect, createRef, useContext, useRef } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { userContext } from "../../../App";
import { BsArrowClockwise } from "react-icons/bs";
import useMessages from "../../utility/useMessages";
import useScrollEffect from "../../utility/useScrollEffect";
import { changeBgEffect } from "../../utility/changeBgEffect";
import Text from "../../utility/Text";
import { storage } from "../../../firebase";
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

  const hasImageRefs = useRef([]);
  const currentBgNumRef = useRef(null);
  useEffect(() => {
    if (currentBgNumRef.current !== null) {
      window.addEventListener("scroll", () =>
        changeBgEffect(hasImageRefs, currentBgNumRef)
      );
    }
    return () =>
      window.removeEventListener("scroll", () =>
        changeBgEffect(hasImageRefs, currentBgNumRef)
      );
  }, [snapshot]);

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
              if (message.imageName) {
                getDownloadURL(
                  ref(storage, `images/${message.imageName}`)
                ).then((url) => {
                  document
                    .getElementById(`img-${index}`)
                    .setAttribute("src", url);
                  document.getElementById(
                    `bg-${index}`
                  ).style.backgroundImage = `url('${url}')`;
                });
                hasImageRefs.current = [...hasImageRefs.current, createRef()];
                currentBgNumRef.current = hasImageRefs.current.length - 1;
              }
              return (
                <div
                  key={s.id}
                  ref={
                    message.imageName
                      ? hasImageRefs.current[currentBgNumRef.current]
                      : null
                  }
                  className={`talk ${message.uid === LoginId ? "me" : "reply"}${
                    message.createdAt ? " loaded" : ""
                  }${
                    2 > Date.now() / 1000 - message.createdAt?.seconds
                      ? " new"
                      : ""
                  }`}
                >
                  {message.text && (
                    <div className="talkText">
                      <Text text={message.text} />
                      <img
                        src={
                          message.uid === LoginId
                            ? auth.currentUser.photoURL
                            : message.photoUrl
                        }
                        alt={message.uid}
                        className="talkIcon"
                        width="36"
                        height="36"
                        onClick={
                          message.uid === LoginId ? openUserModal : undefined
                        }
                      />
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
                        alt={message.imageName}
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
              photoUrl={auth.currentUser.photoURL}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
