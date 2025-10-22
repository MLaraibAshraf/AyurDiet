import React, { useState, useEffect } from "react";
import "./Hero.css";

const Hero = () => {
	const [activeIcon, setActiveIcon] = useState(0);
	const [particles, setParticles] = useState([]);

	const sidebarIcons = [
		{ icon: "📊", label: "Analytics" },
		{ icon: "👥", label: "Clients" },
		{ icon: "📝", label: "Plans" },
		{ icon: "⚡", label: "Energy" },
		{ icon: "🍎", label: "Nutrition" },
	];

	const stats = [
		{ value: "89%", label: "Progress", icon: "📈" },
		{ value: "24", label: "Goals", icon: "✅" },
		{ value: "95%", label: "Health", icon: "💪" },
	];

	// Generate particles
	useEffect(() => {
		const generatedParticles = Array.from({ length: 15 }, (_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * 8,
			duration: 6 + Math.random() * 4,
		}));
		setParticles(generatedParticles);
	}, []);

	return (
		<section className="hero">
			{/* Animated Background Elements */}
			<div className="hero-bg-elements">
				<div className="floating-element"></div>
				<div className="floating-element"></div>
				<div className="floating-element"></div>
			</div>

			{/* Particle Effects */}
			<div className="particles">
				{particles.map((particle) => (
					<div
						key={particle.id}
						className="particle"
						style={{
							left: `${particle.left}%`,
							animationDelay: `${particle.delay}s`,
							animationDuration: `${particle.duration}s`,
						}}
					></div>
				))}
			</div>

			<div className="container">
				<div className="hero-content">
					<div className="hero-text">
						<h1>
							Streamline Your Practice. Elevate Client Care with Ayurvedic
							Intelligence.
						</h1>
						<p className="hero-subtitle">
							The all-in-one cloud platform for Ayurvedic dietitians to manage
							their practice, create personalized diet plans, and perform deep
							Ayurvedic & nutrient analysis—all in one place.
						</p>
						<div className="hero-buttons">
							<a href="#trial" className="btn btn-primary">
								<span>🎯</span>
								Start Your 14-Day Free Trial
							</a>
							<a href="#demo" className="btn btn-secondary">
								<span>🎥</span>
								Watch a Demo Video
							</a>
						</div>
					</div>
					<div className="hero-visual">
						<div className="dashboard-mockup">
							<div className="mockup-header">
								<div className="mockup-controls">
									<span title="Close"></span>
									<span title="Minimize"></span>
									<span title="Maximize"></span>
								</div>
							</div>
							<div className="mockup-content">
								<div className="mockup-sidebar">
									{sidebarIcons.map((item, index) => (
										<div
											key={index}
											className={`sidebar-icon ${
												activeIcon === index ? "active" : ""
											}`}
											onClick={() => setActiveIcon(index)}
											onMouseEnter={() => setActiveIcon(index)}
											title={item.label}
										>
											{item.icon}
										</div>
									))}
								</div>
								<div className="mockup-main">
									<div className="chart-placeholder">
										<div className="chart-container">
											<div className="chart-header">
												<div className="chart-title">Wellness Progress</div>
												<div className="chart-period">Last 7 Days</div>
											</div>
											<div className="chart-bars">
												<div className="chart-bar" data-value="40%"></div>
												<div className="chart-bar" data-value="70%"></div>
												<div className="chart-bar" data-value="50%"></div>
												<div className="chart-bar" data-value="85%"></div>
												<div className="chart-bar" data-value="60%"></div>
											</div>
										</div>
									</div>
									<div className="stats-grid">
										{stats.map((stat, index) => (
											<div key={index} className="stat-card">
												<div className="stat-icon">{stat.icon}</div>
												<div className="stat-content">
													<div className="stat-value">{stat.value}</div>
													<div className="stat-label">{stat.label}</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
