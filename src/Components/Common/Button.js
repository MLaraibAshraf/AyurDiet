import React from "react";
import "./Button.css";

const Button = ({
	children,
	variant = "primary",
	type = "button",
	disabled = false,
	loading = false,
	onClick,
	fullWidth = false,
}) => {
	return (
		<button
			type={type}
			disabled={disabled || loading}
			onClick={onClick}
			className={`btn btn-${variant} ${fullWidth ? "btn-full-width" : ""} ${
				loading ? "btn-loading" : ""
			}`}
		>
			{loading && <div className="btn-spinner"></div>}
			{children}
		</button>
	);
};

export default Button;
