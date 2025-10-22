import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
	const testimonials = [
		{
			quote:
				"This platform is a game-changer. The ability to show clients a nutrient report for a traditionally Ayurvedic diet gives my recommendations so much more weight.",
			author: "Dr. Anika Mehta",
			title: "Certified Ayurvedic Dietitian",
			avatar: "👩‍⚕️",
		},
		{
			quote:
				"I've cut my admin time by 60%. The automated reminders and billing have simplified my life, letting me focus on taking on more clients.",
			author: "Mohd Asif Aswar",
			title: "Founder of 'Prakriti Clinic'",
			avatar: "👨‍💼",
		},
	];

	return (
		<section id="testimonials" className="section testimonials-section">
			<div className="container">
				<h2 className="section-title">
					Trusted by Ayurvedic Professionals Worldwide
				</h2>
				<div className="testimonials-grid">
					{testimonials.map((testimonial, index) => (
						<div key={index} className="testimonial-card">
							<div className="testimonial-content">
								<p>"{testimonial.quote}"</p>
							</div>
							<div className="testimonial-author">
								<div className="author-avatar">{testimonial.avatar}</div>
								<div className="author-info">
									<h4>{testimonial.author}</h4>
									<span>{testimonial.title}</span>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
