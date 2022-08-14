import { createContext, useState } from "react";
import "./App.scss";
import { auth } from "./firebase";
import ChatRoom from "./components/ChatRoom/ChatRoom";
import SignIn from "./components/SignIn/SignIn";
import FormField from "./components/ChatRoom/FormField/FormField";
import { useAuthState } from "react-firebase-hooks/auth";

export const userContext = createContext("");
export const backImageContext = createContext("");

function App() {
  const [user] = useAuthState(auth);
  const [bgUrl, setBgUrl] = useState("none");

  return (
    <userContext.Provider value={auth}>
      <backImageContext.Provider value={{ bgUrl, setBgUrl }}>
        <div className="App">
          <ChatRoom />
          {user ? <FormField /> : <SignIn />}
        </div>
      </backImageContext.Provider>
    </userContext.Provider>
  );
}

export default App;
