import { useState, useEffect, createRef, useContext, useRef } from "react";
import useMessages from "./useMessages";
import useScrollEffect from "./useScrollEffect";
import { userContext } from "../../../App";
import { signOut } from "firebase/auth";
import Modal from "../../utility/Modal";
import Button from "../../utility/Button";
import { BsArrowClockwise } from "react-icons/bs";
import { changeBgEffect } from "./changeBgEffect";
import Text from "./Text";

const Messages = ({ scroll }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const auth = useContext(userContext);
  let LoginId = "";
  if (auth.currentUser) {
    LoginId = auth.currentUser.uid;
  }

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
                imageUrl =
                  process.env.REACT_APP_IMAGE_URL_1 +
                  message.imageName +
                  process.env.REACT_APP_IMAGE_URL_2;
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
                        src={message.photoUrl}
                        alt={message.uid}
                        className="talkIcon"
                        width="36"
                        height="36"
                        onClick={
                          message.uid === LoginId
                            ? () => setUserModalOpen(true)
                            : undefined
                        }
                      />
                    </div>
                  )}
                  {message.imageName && (
                    <>
                      <div
                        className={`back-ground`}
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      ></div>
                      <img
                        src={imageUrl}
                        alt={message.imageName}
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
            <Modal
              openModal={() => setUserModalOpen(true)}
              closeModal={() => setUserModalOpen(false)}
            >
              <img
                src={auth.currentUser.photoURL}
                alt={auth.currentUser.displayName}
              />
              <Button
                buttonClass="logout-btn"
                buttonAction={() => {
                  setUserModalOpen(false);
                  signOut(auth);
                }}
              >
                ログアウト
              </Button>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
