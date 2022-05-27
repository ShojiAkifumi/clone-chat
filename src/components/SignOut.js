import { signOut } from "firebase/auth";
import { auth } from "../fire";

export function SignOut() {
	return (
		<div className="signIn-continer">
			<button
				onClick={() => {
					signOut(auth);
				}}
			>
				サインアウト
			</button>
		</div>
	);
}
