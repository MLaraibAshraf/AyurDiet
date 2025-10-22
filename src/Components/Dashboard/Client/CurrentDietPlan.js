// src/Components/Dashboard/Client/CurrentDietPlan.js
import React from "react";
// import "./CurrentDietPlan.css";

const CurrentDietPlan = ({ plan, className = "" }) => {
	return (
		<div className={`current-diet-plan dashboard-card ${className}`}>
			<div className="plan-header">
				<h2>Current Diet Plan</h2>
				<span className="plan-name">{plan.name}</span>
				<span className="plan-duration">({plan.duration})</span>
			</div>

			<div className="plan-progress">
				<div className="progress-header">
					<span>Overall Progress</span>
					<span className="progress-percent">{plan.progress}%</span>
				</div>
				<div className="progress-bar">
					<div
						className="progress-fill"
						style={{ width: `${plan.progress}%` }}
					></div>
				</div>
			</div>

			<div className="meals-section">
				<h3>Today's Meals</h3>
				<div className="meals-list">
					<div className="meal-item">
						<span className="meal-type">Breakfast</span>
						<span className="meal-description">{plan.meals.breakfast}</span>
					</div>
					<div className="meal-item">
						<span className="meal-type">Lunch</span>
						<span className="meal-description">{plan.meals.lunch}</span>
					</div>
					<div className="meal-item">
						<span className="meal-type">Dinner</span>
						<span className="meal-description">{plan.meals.dinner}</span>
					</div>
				</div>
			</div>

			<div className="recommendations-section">
				<div className="recommendations-grid">
					<div className="recommendation-group">
						<h4>Recommended Foods</h4>
						<div className="foods-list">
							{plan.recommendations.foods.map((food, index) => (
								<div key={index} className="food-item recommended">
									<span className="food-icon">✅</span>
									<span>{food}</span>
								</div>
							))}
						</div>
					</div>

					<div className="recommendation-group">
						<h4>Avoid These Foods</h4>
						<div className="foods-list">
							{plan.recommendations.avoid.map((food, index) => (
								<div key={index} className="food-item avoid">
									<span className="food-icon">❌</span>
									<span>{food}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CurrentDietPlan;
