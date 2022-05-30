import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyDU0Ky1yemsXCgyodCZvnCMJfDCvoPOiys",
	authDomain: "my-react-chat-ac381.firebaseapp.com",
	projectId: "my-react-chat-ac381",
	storageBucket: "my-react-chat-ac381.appspot.com",
	messagingSenderId: "845705820723",
	appId: "1:845705820723:web:e1cb266064947df1cc4146",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
