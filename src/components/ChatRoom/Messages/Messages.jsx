import { useState, useContext } from "react";
import useMessages from "./useMessages";
import useScrollEffect from "./useScrollEffect";
import { backImageContext, userContext } from "../../../App";
import { signOut } from "firebase/auth";
import Modal from "../Modal";
import { BsArrowClockwise } from "react-icons/bs";

const setChatBg = (imgName, bgContext) => {
  bgContext.setBgUrl(
    `url(https://firebasestorage.googleapis.com/v0/b/clone-chat-app-d93d3.appspot.com/o/images%2F${imgName}?alt=media&token=5e85100c-9318-4c49-a332-fd1594c8a099)`
  );
};

const Messages = ({ scroll }) => {
  const [userModalOpen, setUserModalOpen] = useState(false);

  const auth = useContext(userContext);
  const bgContext = useContext(backImageContext);
  let LoginId = "";
  if (auth.currentUser) {
    LoginId = auth.currentUser.uid;
  }
  const [snapshot, loading, error] = useMessages();
  error && console.log(error);
  useScrollEffect(scroll, snapshot);

  return (
    <div>
      {loading ? (
        <div className="isLoading">
          <BsArrowClockwise size="4em" />
        </div>
      ) : (
        <div className="messagesContainer">
          {snapshot &&
            snapshot.docs.map((s) => {
              const message = s.data();
              const imageUrl = `https://firebasestorage.googleapis.com/v0/b/clone-chat-app-d93d3.appspot.com/o/images%2F${message.imageName}?alt=media&token=5e85100c-9318-4c49-a332-fd1594c8a099`;
              return (
                <div
                  key={s.id}
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
                    onClick={
                      message.uid === LoginId
                        ? () => setUserModalOpen(true)
                        : undefined
                    }
                  />
                  {message.imageName && (
                    <img
                      src={imageUrl}
                      alt={message.imageName}
                      className="talkImage"
                      height="500"
                      width={message.imageRatio * 500}
                      onClick={() => setChatBg(message.imageName, bgContext)}
                    />
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
