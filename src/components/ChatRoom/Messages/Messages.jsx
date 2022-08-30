import { useState, useEffect, createRef, useContext, useRef } from "react";
import useMessages from "./useMessages";
import useScrollEffect from "./useScrollEffect";
import { userContext } from "../../../App";
import { signOut } from "firebase/auth";
import Modal from "../Modal";
import { BsArrowClockwise } from "react-icons/bs";
import { changeBgEffect } from "./changeBgEffect";

const Messages = ({ scroll }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const auth = useContext(userContext);
  let LoginId = "";
  if (auth.currentUser) {
    LoginId = auth.currentUser.uid;
  }
  const [snapshot, loading, error] = useMessages();
  error && console.log(error);
  useScrollEffect(scroll, snapshot);

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
                imageUrl = `https://firebasestorage.googleapis.com/v0/b/clone-chat-app-d93d3.appspot.com/o/images%2F${message.imageName}?alt=media&token=5e85100c-9318-4c49-a332-fd1594c8a099`;
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
                      {message.text}
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
            <Modal closeModal={() => setUserModalOpen(false)}>
              <div className="logout-btn">
                <button onClick={() => signOut(auth)}>ログアウト</button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default Messages;
