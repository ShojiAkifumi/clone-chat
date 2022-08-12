import { createContext } from "react";
import "./App.scss";
import { auth } from "./firebase";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import SignIn from "./components/SignIn/SignIn";
import FormField from "./components/ChatRoom/FormField/FormField";
import { useAuthState } from "react-firebase-hooks/auth";

export const userContext = createContext("");

function App() {
  const [user] = useAuthState(auth);
  return (
    <userContext.Provider value={auth}>
      <div className="App">
        <ChatRoom />
        {user ? <FormField /> : <SignIn />}
      </div>
    </userContext.Provider>
  );
}

export default App;
