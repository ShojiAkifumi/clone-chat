import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../fire";

export function SignIn() {
	const signInWidthGoogle = async () => {
		const provider = new GoogleAuthProvider();
		await signInWithRedirect(auth, provider);
	};

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
