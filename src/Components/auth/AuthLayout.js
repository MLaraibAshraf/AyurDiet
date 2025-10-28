import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
	return (
		<div className="modern-auth-layout">
			{/* Background Canvas */}
			<div className="background-canvas">
				<div className="floating-element el-1"></div>
				<div className="floating-element el-2"></div>
				<div className="floating-element el-3"></div>
				<div className="floating-element el-4"></div>
			</div>

			<div className="layout-container">
				{/* Left Panel - Minimal & Elegant */}
				<div className="minimal-panel">
					<div className="panel-content">
						{/* Elegant Header */}
						<div className="elegant-header">
							<div className="brand-mark">
								<div className="mark-icon">🌿</div>
							</div>
							<h1 className="main-headline">
								Ancient Wisdom,
								<span className="accent-line">Modern Practice</span>
							</h1>
							<p className="sub-headline">
								Transform your health journey with AI-powered Ayurvedic insights
								and personalized care.
							</p>
						</div>

						{/* Feature Showcase */}
						<div className="feature-showcase">
							<div className="feature-highlight">
								<div className="feature-number">01</div>
								<div className="feature-details">
									<h3>Dosha Analysis</h3>
									<p>AI-powered insights for personalized health assessment</p>
								</div>
							</div>

							<div className="feature-highlight">
								<div className="feature-number">02</div>
								<div className="feature-details">
									<h3>Progress Tracking</h3>
									<p>Real-time monitoring with detailed analytics</p>
								</div>
							</div>

							<div className="feature-highlight">
								<div className="feature-number">03</div>
								<div className="feature-details">
									<h3>Diet Planning</h3>
									<p>Customized meal plans and recipe recommendations</p>
								</div>
							</div>

							<div className="feature-highlight">
								<div className="feature-number">04</div>
								<div className="feature-details">
									<h3>Client Management</h3>
									<p>Streamlined practice operations and scheduling</p>
								</div>
							</div>
						</div>

						{/* Elegant Testimonial */}
						<div className="elegant-testimonial">
							<div className="testimonial-card">
								<div className="quote-icon">❞</div>
								<blockquote>
									AyurDiet transformed my practice. I can now focus entirely on
									client care while the platform handles the rest.
								</blockquote>
								<div className="author-signature">
									<div className="author-badge">
										<div className="initials">PS</div>
									</div>
									<div className="author-info">
										<strong>Dr. Priya Sharma</strong>
										<span>Ayurvedic Dietitian</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Panel - Clean Form Area */}
				<div className="form-panel">
					<div className="form-wrapper">{children}</div>
				</div>
			</div>
		</div>
	);
};

export default AuthLayout;
