import React, { useState } from "react";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";

const AuthPage = () => {
	const [isLogin, setIsLogin] = useState(true);

	const toggleMode = () => {
		setIsLogin(!isLogin);
	};

	return isLogin ? (
		<Login onToggleMode={toggleMode} />
	) : (
		<Register onToggleMode={toggleMode} />
	);
};

export default AuthPage;
