import React from "react";
import "./Footer.css";

const Footer = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					<div className="footer-section">
						<div className="logo">
							<span className="logo-icon">🌿</span>
							<span className="logo-text">AyurDiet</span>
						</div>
						<p>
							Empowering Ayurvedic professionals with intelligent technology for
							better client care and practice growth.
						</p>
					</div>

					<div className="footer-section">
						<h4>Product</h4>
						<ul>
							<li>
								<a href="#features">Features</a>
							</li>
							<li>
								<a href="#pricing">Pricing</a>
							</li>
							<li>
								<a href="#testimonials">Testimonials</a>
							</li>
							<li>
								<a href="#demo">Demo</a>
							</li>
						</ul>
					</div>

					<div className="footer-section">
						<h4>Company</h4>
						<ul>
							<li>
								<a href="#about">About Us</a>
							</li>
							<li>
								<a href="#blog">Blog</a>
							</li>
							<li>
								<a href="#contact">Contact</a>
							</li>
							<li>
								<a href="#careers">Careers</a>
							</li>
						</ul>
					</div>

					<div className="footer-section">
						<h4>Legal</h4>
						<ul>
							<li>
								<a href="#privacy">Privacy Policy</a>
							</li>
							<li>
								<a href="#terms">Terms of Service</a>
							</li>
							<li>
								<a href="#security">Data Security</a>
							</li>
							<li>
								<a href="#compliance">Compliance</a>
							</li>
						</ul>
					</div>

					<div className="footer-section">
						<h4>Contact</h4>
						<p>Email: ayurdietauth@outlook.com</p>
						<p>Phone: +91 7905306261</p>
						<div className="social-links">
							<a href="#linkedin">LinkedIn</a>
							<a href="#instagram">Instagram</a>
							<a href="#youtube">YouTube</a>
						</div>
					</div>
				</div>

				<div className="footer-bottom">
					<p>
						&copy; 2024 AyurDiet. All rights reserved. Bringing ancient wisdom
						to modern practice.
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
