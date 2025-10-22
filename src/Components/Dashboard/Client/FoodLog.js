// src/Components/Dashboard/Client/FoodLog.js
import React from "react";
// import "./FoodLog.css";

const FoodLog = ({ logs, className = "" }) => {
	const getRatingStars = (rating) => {
		return "⭐".repeat(rating) + "☆".repeat(5 - rating);
	};

	return (
		<div className={`food-log dashboard-card ${className}`}>
			<div className="food-log-header">
				<h2>Recent Food Logs</h2>
				<button className="log-meal-btn">+ Log Meal</button>
			</div>

			<div className="food-logs-list">
				{logs.map((log) => (
					<div key={log.id} className="food-log-item">
						<div className="log-time">
							<span className="meal-type">{log.meal}</span>
							<span className="time">{log.time}</span>
						</div>
						<div className="log-details">
							<p className="food-description">{log.food}</p>
							<div className="log-rating">
								<span className="rating-stars">
									{getRatingStars(log.rating)}
								</span>
								<span className="rating-text">({log.rating}/5)</span>
							</div>
						</div>
					</div>
				))}
			</div>

			{logs.length === 0 && (
				<div className="no-logs">
					<p>No food logs yet</p>
					<button className="log-first-meal">Log your first meal</button>
				</div>
			)}
		</div>
	);
};

export default FoodLog;
