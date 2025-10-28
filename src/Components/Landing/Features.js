import React from "react";
import "./Features.css";

const Features = () => {
	const features = [
		{
			icon: "👥",
			title: "Intelligent Client Management",
			description:
				"Store Dosha assessments, medical history, progress notes, and goals in one secure, centralized location.",
		},
		{
			icon: "🍛",
			title: "Ayurvedic Diet Planner",
			description:
				"Easily build personalized meal plans. Our intelligent database auto-analyzes the Rasa, Guna, Virya, and Vipaka.",
		},
		{
			icon: "📈",
			title: "Advanced Nutrient Analysis",
			description:
				"Get a full breakdown of macronutrients and micronutrients alongside the Ayurvedic properties of any diet plan.",
		},
		{
			icon: "⚙️",
			title: "Seamless Scheduling & Billing",
			description:
				"Automate appointment bookings, send reminders, and create professional invoices without leaving the platform.",
		},
		{
			icon: "📱",
			title: "Enhanced Client Experience",
			description:
				"Give clients their own portal to access plans, log food, and track their journey, improving adherence and outcomes.",
		},
		{
			icon: "🌿",
			title: "Powered by Ayurvedic Pharmacopoeia",
			description:
				"Our core engine is built on a validated database of ingredients and their effects, ensuring authentic analysis.",
		},
	];

	return (
		<section id="features" className="section features-section">
			<div className="container">
				<h2 className="section-title">
					Everything You Need, Perfectly Integrated
				</h2>
				<p className="section-subtitle">
					Comprehensive tools designed specifically for the modern Ayurvedic
					professional
				</p>
				<div className="features-grid">
					{features.map((feature, index) => (
						<div key={index} className="feature-card">
							<div className="feature-icon">{feature.icon}</div>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
