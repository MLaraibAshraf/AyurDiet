import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const { isAuthenticated, user } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<header className="header">
			<div className="container">
				<nav className="nav">
					<div className="logo">
						<span className="logo-icon">🌿</span>
						<span className="logo-text">AyurDiet</span>
					</div>

					{/* Desktop Navigation */}
					{!isAuthenticated ? (
						<>
							<ul className="nav-links">
								<li>
									<a href="#features" onClick={closeMobileMenu}>
										Features
									</a>
								</li>
								<li>
									<a href="#how-it-works" onClick={closeMobileMenu}>
										How It Works
									</a>
								</li>
								<li>
									<a href="#pricing" onClick={closeMobileMenu}>
										Pricing
									</a>
								</li>
								<li>
									<a href="#testimonials" onClick={closeMobileMenu}>
										Testimonials
									</a>
								</li>
							</ul>
							<div className="nav-buttons">
								<Link to="/auth" className="btn btn-secondary">
									Login
								</Link>
								<Link to="/auth" className="btn btn-primary">
									Start Free Trial
								</Link>
							</div>
						</>
					) : (
						<div className="nav-buttons">
							<Link to="/dashboard" className="btn btn-primary">
								Dashboard
							</Link>
						</div>
					)}

					{/* Mobile Menu Button */}
					<button
						className="mobile-menu-btn"
						onClick={toggleMobileMenu}
						aria-label="Toggle menu"
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</nav>

				{/* Mobile Menu */}
				<div className={`mobile-menu ${isMobileMenuOpen ? "active" : ""}`}>
					{!isAuthenticated ? (
						<>
							<a href="#features" onClick={closeMobileMenu}>
								Features
							</a>
							<a href="#how-it-works" onClick={closeMobileMenu}>
								How It Works
							</a>
							<a href="#pricing" onClick={closeMobileMenu}>
								Pricing
							</a>
							<a href="#testimonials" onClick={closeMobileMenu}>
								Testimonials
							</a>
							<div className="mobile-buttons">
								<Link
									to="/auth"
									className="btn btn-secondary"
									onClick={closeMobileMenu}
								>
									Login
								</Link>
								<Link
									to="/auth"
									className="btn btn-primary"
									onClick={closeMobileMenu}
								>
									Start Free Trial
								</Link>
							</div>
						</>
					) : (
						<div className="mobile-buttons">
							<Link
								to="/dashboard"
								className="btn btn-primary"
								onClick={closeMobileMenu}
							>
								Dashboard
							</Link>
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
