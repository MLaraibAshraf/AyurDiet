import React from "react";
import "./StatsGrid.css";

const StatsGrid = ({ stats, loading = false }) => {
	if (loading) {
		return (
			<div className="stats-grid">
				{[1, 2, 3, 4].map((item) => (
					<div key={item} className="stat-card loading">
						<div className="stat-icon">📊</div>
						<div className="stat-content">
							<div className="stat-value">00</div>
							<div className="stat-title">Loading</div>
							<div className="stat-change up">+0%</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="stats-grid">
			{stats.map((stat, index) => (
				<div
					key={index}
					className={`stat-card ${stat.primary ? "primary" : ""}`}
					role="region"
					aria-label={`${stat.title} statistic`}
				>
					<div className="stat-icon" aria-hidden="true">
						{stat.icon}
					</div>
					<div className="stat-content">
						<h3 className="stat-value">{stat.value}</h3>
						<p className="stat-title">{stat.title}</p>
						<div
							className={`stat-change ${stat.trend || "up"}`}
							aria-label={`${stat.change} ${
								stat.trend === "down" ? "decrease" : "increase"
							}`}
						>
							<span className="change-indicator">
								{stat.trend === "down" ? "↘" : "↗"}
							</span>
							{stat.change}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default StatsGrid;
