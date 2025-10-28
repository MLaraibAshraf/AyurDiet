import React from "react";
import "./Pricing.css";

const Pricing = () => {
	const plans = [
		{
			name: "The Practitioner",
			price: "$29",
			period: "month",
			description: "For Solo Ayurvedic Dietitians",
			features: [
				"Client Management for up to 50 clients",
				"Basic Diet Planner",
				"Core Ayurvedic Analysis",
				"Appointment Scheduling",
				"Email Support",
			],
			cta: "Get Started",
			popular: false,
		},
		{
			name: "The Pro",
			price: "$59",
			period: "month",
			description: "Most Popular - For Growing Practices",
			features: [
				"Everything in The Practitioner",
				"Advanced Nutrient Dashboard",
				"Client Portal",
				"Automated Follow-ups",
				"Branded Invoicing",
				"Priority Support",
			],
			cta: "Get Started",
			popular: true,
		},
		{
			name: "The Clinic",
			price: "Custom",
			period: "tailored",
			description: "For Multi-Practitioner Clinics & Institutions",
			features: [
				"Everything in The Pro",
				"Multi-user logins",
				"Advanced reporting",
				"Priority support",
				"Custom onboarding",
				"Dedicated account manager",
			],
			cta: "Contact Sales",
			popular: false,
		},
	];

	return (
		<section id="pricing" className="section pricing-section">
			<div className="container">
				<h2 className="section-title">Choose Your Plan. No Hidden Fees.</h2>
				<p className="section-subtitle">
					Start with a 14-day free trial. No credit card required.
				</p>
				<div className="pricing-grid">
					{plans.map((plan, index) => (
						<div
							key={index}
							className={`pricing-card ${plan.popular ? "popular" : ""}`}
						>
							{plan.popular && (
								<div className="popular-badge">Most Popular</div>
							)}
							<div className="plan-header">
								<h3>{plan.name}</h3>
								<div className="plan-price">
									<span className="price">{plan.price}</span>
									<span className="period">/{plan.period}</span>
								</div>
								<p className="plan-description">{plan.description}</p>
							</div>
							<ul className="plan-features">
								{plan.features.map((feature, featureIndex) => (
									<li key={featureIndex}>{feature}</li>
								))}
							</ul>
							<a
								href="#trial"
								className={`btn ${
									plan.popular ? "btn-primary" : "btn-secondary"
								} plan-cta`}
							>
								{plan.cta}
							</a>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
