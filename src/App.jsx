import { createContext, useRef } from "react";
import "./App.scss";
import { auth } from "./firebase";
import Messages from "./components/ChatRoom/Messages/Messages";
import SignIn from "./components/SignIn/SignIn";
import FormField from "./components/ChatRoom/FormField/FormField";
import { useAuthState } from "react-firebase-hooks/auth";

export const userContext = createContext("");

function App() {
  const [user] = useAuthState(auth);
  const scroll = useRef();
  return (
    <userContext.Provider value={auth}>
      <div className="App">
        <Messages scroll={scroll} />
        {user ? <FormField scroll={scroll} /> : <SignIn />}
      </div>
    </userContext.Provider>
  );
}

export default App;
