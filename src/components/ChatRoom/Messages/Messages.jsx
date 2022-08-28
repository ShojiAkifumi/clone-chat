import { useState, useEffect, createRef, useContext, useRef } from "react";
import useMessages from "./useMessages";
import useScrollEffect from "./useScrollEffect";
import { userContext } from "../../../App";
import { signOut } from "firebase/auth";
import Modal from "../Modal";
import { BsArrowClockwise } from "react-icons/bs";

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

  const messagesContainerRef = useRef(null);

  const toggleVisibility = () => {
    if (
      messagesContainerRef.current.offsetHeight - window.innerHeight - 80 >
      window.scrollY
    ) {
      const bgViewHeight = window.innerHeight + window.scrollY - 150;
      hasImageRefs.current.forEach((hasImageRef) => {
        if (bgViewHeight < hasImageRef.current.offsetTop) {
          hasImageRef.current.classList.add("hidden");
        } else {
          hasImageRef.current.classList.remove("hidden");
        }
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="isLoading">
          <BsArrowClockwise size="4em" />
        </div>
      ) : (
        <div className="messagesContainer" ref={messagesContainerRef}>
          {snapshot &&
            snapshot.docs.map((s, index) => {
              const message = s.data();
              let imageUrl = "";
              if (message.imageName) {
                imageUrl = `https://firebasestorage.googleapis.com/v0/b/clone-chat-app-d93d3.appspot.com/o/images%2F${message.imageName}?alt=media&token=5e85100c-9318-4c49-a332-fd1594c8a099`;
                hasImageRefs.current[index] = createRef();
              }
              return (
                <div
                  key={s.id}
                  ref={message.imageName ? hasImageRefs.current[index] : null}
                  className={`talk ${
                    message.uid === LoginId ? "me" : "reply"
                  } ${message.createdAt && "loaded"} ${
                    2 > Date.now() / 1000 - message.createdAt?.seconds && "new"
                  }`}
                >
                  <img
                    src={message.photoUrl}
                    alt={message.uid}
                    className="talkIcon"
                    width="38"
                    height="38"
                    onClick={
                      message.uid === LoginId
                        ? () => setUserModalOpen(true)
                        : undefined
                    }
                  />
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
                        loading="lazy"
                      />
                    </>
                  )}
                  {message.text && (
                    <span className="talkText">{message.text}</span>
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
    </div>
  );
};

export default Messages;
