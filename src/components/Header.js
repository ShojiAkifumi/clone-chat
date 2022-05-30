import React from "react";
import { SignOut } from "./SignOut";

function Header() {
	return (
		<header className="header">
			<div className="headerContainer">
				<SignOut />
				<h1>Header</h1>
			</div>
		</header>
	);
}

export default Header;
