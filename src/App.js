import "./App.scss";
import { auth } from "./fire";
import { useAuthState } from "react-firebase-hooks/auth";
import { SignIn } from "./components/SignIn";
import { ChatRoom } from "./components/ChatRoom";

function App() {
	const [user] = useAuthState(auth);
	return <div className="App">{!user ? <SignIn /> : <ChatRoom />}</div>;
}

export default App;
