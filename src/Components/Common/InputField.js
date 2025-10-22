import React from "react";
import "./InputField.css";

const InputField = ({
	label,
	type = "text",
	value,
	onChange,
	error,
	placeholder,
	required = false,
	icon,
}) => {
	return (
		<div className="input-field">
			{label && (
				<label className="input-label">
					{label}
					{required && <span className="required">*</span>}
				</label>
			)}
			<div className="input-container">
				{icon && <span className="input-icon">{icon}</span>}
				<input
					type={type}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className={`input ${error ? "input-error" : ""} ${
						icon ? "with-icon" : ""
					}`}
				/>
			</div>
			{error && <span className="error-message">{error}</span>}
		</div>
	);
};

export default InputField;
