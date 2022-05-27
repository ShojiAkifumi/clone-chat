import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../fire";

export function SignIn() {
	function signInWidthGoogle() {
		const provider = new GoogleAuthProvider();
		signInWithRedirect(auth, provider);
	}
	return (
		<div className="signIn-continer">
			<h1>ようこそ！</h1>
			<button
				onClick={() => {
					signInWidthGoogle();
				}}
			>
				サインイン
			</button>
		</div>
	);
}
