import "./App.scss";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import FormField from "./components/ChatRoom/FormField/FormField";
import Header from "./components/Header/Header";

function App() {
	// return <div className="App">{!user ? <SignIn /> : <ChatRoom />}</div>;
	return (
		<div className="App">
			<Header />
			<ChatRoom />
			<FormField />
		</div>
	);
}

export default App;
