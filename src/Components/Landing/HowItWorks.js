import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
	const steps = [
		{
			number: "1",
			title: "Onboard & Assess",
			description: "Add a client and input their unique Prakriti and Vikriti",
		},
		{
			number: "2",
			title: "Analyze & Plan",
			description:
				"Create a diet plan. Our software instantly provides Doshic and nutrient analysis",
		},
		{
			number: "3",
			title: "Achieve Results",
			description:
				"Share the plan via the client portal and monitor progress with integrated tools",
		},
	];

	return (
		<section id="how-it-works" className="section how-it-works-section">
			<div className="container">
				<h2 className="section-title">
					Transform Your Practice in 3 Simple Steps
				</h2>
				<div className="steps-container">
					{steps.map((step, index) => (
						<div key={index} className="step">
							<div className="step-number">{step.number}</div>
							<h3>{step.title}</h3>
							<p>{step.description}</p>
						</div>
					))}
				</div>
				<div className="cta-container">
					<a href="#trial" className="btn btn-primary">
						Start Your Transformation Today
					</a>
				</div>
			</div>
		</section>
	);
};

export default HowItWorks;
