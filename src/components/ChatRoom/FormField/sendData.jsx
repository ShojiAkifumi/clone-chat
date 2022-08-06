import { ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const sendMessage = (message, imageData) => {
	const Data = {
		uid: "1",
		photoUrl: "../../../../no-profile.png",
		text: message,
		imageName: imageData ? imageData.name : "",
		createdAt: serverTimestamp(),
	};
	addDoc(collection(db, "messages"), Data);
};

const sendImage = async (imageData) => {
	const imagesRef = ref(storage, `images/${imageData.name}`);
	uploadBytes(imagesRef, imageData.data);
};

const sendData = (message = "", imageData = "") => {
	sendMessage(message, imageData);
	imageData && sendImage(imageData);
};

export default sendData;
