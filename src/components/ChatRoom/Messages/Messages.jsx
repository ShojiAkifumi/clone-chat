import { useState, useContext } from "react";
import useMessages from "./useMessages";
import useScrollEffect from "./useScrollEffect";
import { userContext } from "../../../App";
import { signOut } from "firebase/auth";
import Modal from "../Modal";

const Messages = ({ scroll }) => {
  const [snapshot, loading, error] = useMessages();
  const [userModalOpen, setUserModalOpen] = useState(false);

  useScrollEffect(scroll, snapshot);

  error && console.log(error);

  const auth = useContext(userContext);
  let LoginId = "";
  if (auth.currentUser) {
    LoginId = auth.currentUser.uid;
  }

  return (
    <div>
      {loading ? (
        <div className="isLoading">ロード中</div>
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
                        : ""
                    }
                  />
                  {message.imageName && (
                    <img
                      src={imageUrl}
                      alt={message.imageName}
                      className="talkImage"
                      height="300"
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
