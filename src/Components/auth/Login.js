import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import AuthLayout from "./AuthLayout";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import { validateEmail, validatePassword } from "../../utils/validation";
import "./Login.css";

const Login = ({ onToggleMode }) => {
	const { login } = useAuth();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		// Clear error when user starts typing
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.email) {
			newErrors.email = "Email is required";
		} else if (!validateEmail(formData.email)) {
			newErrors.email = "Please enter a valid email address";
		}

		if (!formData.password) {
			newErrors.password = "Password is required";
		} else if (!validatePassword(formData.password)) {
			newErrors.password = "Password must be at least 6 characters long";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setLoading(true);
		const result = await login(formData.email, formData.password);
		setLoading(false);

		if (!result.success) {
			setErrors({ submit: result.error });
		}
	};

	return (
		<AuthLayout
			title="Welcome Back"
			subtitle="Sign in to your AyurDiet account"
		>
			<form onSubmit={handleSubmit} className="auth-form">
				<h2>Sign In</h2>
				<p className="auth-subtitle">
					Enter your credentials to access your dashboard
				</p>

				{errors.submit && <div className="error-banner">{errors.submit}</div>}

				<InputField
					label="Email Address"
					type="email"
					value={formData.email}
					onChange={(e) => handleChange("email", e.target.value)}
					error={errors.email}
					placeholder="your@email.com"
					required
					icon="✉️"
				/>

				<InputField
					label="Password"
					type="password"
					value={formData.password}
					onChange={(e) => handleChange("password", e.target.value)}
					error={errors.password}
					placeholder="Enter your password"
					required
					icon="🔒"
				/>

				<div className="auth-options">
					<label className="remember-me">
						<input type="checkbox" />
						<span>Remember me</span>
					</label>
					<a href="#forgot-password" className="forgot-password">
						Forgot password?
					</a>
				</div>

				<Button type="submit" variant="primary" loading={loading} fullWidth>
					Sign In
				</Button>

				<div className="auth-divider">
					<span>Or continue with</span>
				</div>

				<div className="social-auth">
					<button type="button" className="social-btn google-btn">
						<span>🔍</span>
						Google
					</button>
					<button type="button" className="social-btn linkedin-btn">
						<span>💼</span>
						LinkedIn
					</button>
				</div>

				<div className="auth-switch">
					Don't have an account?{" "}
					<button type="button" onClick={onToggleMode} className="switch-link">
						Sign up now
					</button>
				</div>
			</form>
		</AuthLayout>
	);
};

export default Login;
