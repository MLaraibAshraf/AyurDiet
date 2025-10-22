import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import AuthLayout from "./AuthLayout";
import InputField from "../Common/InputField";
import Button from "../Common/Button";
import {
	validateEmail,
	validatePassword,
	validateName,
} from "../../utils/validation";
import "./Register.css";

const Register = ({ onToggleMode }) => {
	const { register } = useAuth();
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		role: "client", // Default role
		phone: "",
	});
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const handleChange = (field, value) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.firstName) {
			newErrors.firstName = "First name is required";
		} else if (!validateName(formData.firstName)) {
			newErrors.firstName = "Please enter a valid first name";
		}

		if (!formData.lastName) {
			newErrors.lastName = "Last name is required";
		} else if (!validateName(formData.lastName)) {
			newErrors.lastName = "Please enter a valid last name";
		}

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

		if (!formData.confirmPassword) {
			newErrors.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
		}

		if (!formData.role) {
			newErrors.role = "Please select your role";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setLoading(true);
		const result = await register(formData);
		setLoading(false);

		if (!result.success) {
			setErrors({ submit: result.error });
		}
	};

	return (
		<AuthLayout
			title="Start Your Ayurvedic Journey"
			subtitle="Join AyurDiet as a Client or Practitioner"
		>
			<form onSubmit={handleSubmit} className="auth-form">
				<div className="form-header">
					<h2>Join AyurDiet</h2>
					<p>Create your account to get started</p>
				</div>

				{errors.submit && <div className="error-banner">{errors.submit}</div>}

				{/* Role Selection */}
				<div className="role-selection">
					<h4>I am a:</h4>
					<div className="role-options">
						<label
							className={`role-option ${
								formData.role === "client" ? "selected" : ""
							}`}
						>
							<input
								type="radio"
								name="role"
								value="client"
								checked={formData.role === "client"}
								onChange={(e) => handleChange("role", e.target.value)}
							/>
							<div className="role-content">
								<span className="role-icon">👤</span>
								<div className="role-info">
									<strong>Client</strong>
									<span>Seeking Ayurvedic guidance</span>
								</div>
							</div>
						</label>

						<label
							className={`role-option ${
								formData.role === "dietitian" ? "selected" : ""
							}`}
						>
							<input
								type="radio"
								name="role"
								value="dietitian"
								checked={formData.role === "dietitian"}
								onChange={(e) => handleChange("role", e.target.value)}
							/>
							<div className="role-content">
								<span className="role-icon">🌿</span>
								<div className="role-info">
									<strong>Dietitian</strong>
									<span>Ayurvedic practitioner</span>
								</div>
							</div>
						</label>
					</div>
					{errors.role && <span className="error-message">{errors.role}</span>}
				</div>

				<div className="name-fields">
					<InputField
						label="First Name"
						value={formData.firstName}
						onChange={(e) => handleChange("firstName", e.target.value)}
						error={errors.firstName}
						placeholder="Enter your first name"
						required
					/>
					<InputField
						label="Last Name"
						value={formData.lastName}
						onChange={(e) => handleChange("lastName", e.target.value)}
						error={errors.lastName}
						placeholder="Enter your last name"
						required
					/>
				</div>

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
					label="Phone Number"
					type="tel"
					value={formData.phone}
					onChange={(e) => handleChange("phone", e.target.value)}
					placeholder="+1 (555) 123-4567"
					icon="📞"
				/>

				<InputField
					label="Password"
					type="password"
					value={formData.password}
					onChange={(e) => handleChange("password", e.target.value)}
					error={errors.password}
					placeholder="Create a password (min. 6 characters)"
					required
					icon="🔒"
				/>

				<InputField
					label="Confirm Password"
					type="password"
					value={formData.confirmPassword}
					onChange={(e) => handleChange("confirmPassword", e.target.value)}
					error={errors.confirmPassword}
					placeholder="Confirm your password"
					required
					icon="🔒"
				/>

				<div className="role-benefits">
					{formData.role === "client" && (
						<div className="benefits-list">
							<h4>As a Client, you'll get:</h4>
							<ul>
								<li>✓ Personalized diet plans</li>
								<li>✓ Progress tracking</li>
								<li>✓ Direct messaging with dietitians</li>
								<li>✓ Health goal setting</li>
							</ul>
						</div>
					)}
					{formData.role === "dietitian" && (
						<div className="benefits-list">
							<h4>As a Dietitian, you'll get:</h4>
							<ul>
								<li>✓ Client management tools</li>
								<li>✓ Diet plan creation</li>
								<li>✓ Practice analytics</li>
								<li>✓ Revenue tracking</li>
								<li>✓ Customizable practice settings</li>
							</ul>
						</div>
					)}
				</div>

				<div className="terms-agreement">
					<label className="terms-label">
						<input type="checkbox" required />
						<span>
							I agree to the{" "}
							<a href="#terms" className="terms-link">
								Terms of Service
							</a>{" "}
							and{" "}
							<a href="#privacy" className="terms-link">
								Privacy Policy
							</a>
						</span>
					</label>
				</div>

				<Button type="submit" variant="primary" loading={loading} fullWidth>
					Create {formData.role === "dietitian" ? "Practitioner" : "Client"}{" "}
					Account
				</Button>

				<div className="auth-switch">
					Already have an account?{" "}
					<button type="button" onClick={onToggleMode} className="switch-link">
						Sign in
					</button>
				</div>
			</form>
		</AuthLayout>
	);
};

export default Register;
