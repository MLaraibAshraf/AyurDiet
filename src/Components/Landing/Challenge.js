import React from "react";
import "./Challenge.css";

const Challenge = () => {
	const painPoints = [
		{
			icon: "📊",
			title: "Manual Dosha Analysis",
			description:
				"Spending hours cross-referencing texts to analyze the Virya, Vipaka, and Guna of a single meal plan?",
		},
		{
			icon: "📅",
			title: "Administrative Overload",
			description:
				"Drowning in appointment scheduling, client notes, and follow-ups across multiple notebooks and apps?",
		},
		{
			icon: "🔬",
			title: "The Data Gap",
			description:
				"Struggling to bridge the gap between timeless Ayurvedic wisdom and modern nutritional science?",
		},
		{
			icon: "⏱",
			title: "Time Drain",
			description:
				"Wishing you could spend less time on paperwork and more time guiding your clients to health?",
		},
		{
			icon: "💬",
			title: "Client Communication Chaos",
			description:
				"Managing endless messages, emails, and calls across different platforms, making it hard to track client conversations and follow-ups?",
		},
		{
			icon: "💰",
			title: "Inefficient Billing & Payments",
			description:
				"Spending hours on manual invoicing, payment tracking, and chasing late payments instead of focusing on client care?",
		},
	];

	return (
		<section className="section challenge-section">
			<div className="container">
				<h2 className="section-title">
					Are You Juggling Too Much in Your Practice?
				</h2>
				<div className="pain-points-grid">
					{painPoints.map((point, index) => (
						<div key={index} className="pain-point-card">
							<div className="pain-point-icon">{point.icon}</div>
							<h3>{point.title}</h3>
							<p>{point.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Challenge;
