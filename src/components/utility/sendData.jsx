import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const sendMessage = (message, imageData, user) => {
  const Data = {
    uid: user.uid,
    photoUrl: user.photoURL,
    text: message,
    imageName: imageData ? imageData.name : "",
    imageRatio: imageData ? imageData.ratio : "",
    createdAt: serverTimestamp(),
  };
  addDoc(collection(db, "messages"), Data);
};

const sendData = (message = "", imageData = "", user, setIsUpLoading) => {
  if (imageData) {
    setIsUpLoading(true);
    const imagesRef = ref(storage, `images/${imageData.name}`);
    uploadBytes(imagesRef, imageData.data).then(() => {
      sendMessage(message, imageData, user);
      setIsUpLoading(false);
    });
  } else {
    sendMessage(message, imageData, user);
  }
};

export default sendData;
