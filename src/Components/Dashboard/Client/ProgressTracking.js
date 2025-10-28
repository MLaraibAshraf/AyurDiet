// src/Components/Dashboard/Client/ProgressTracking.js
import React from "react";
// import "./ProgressTracking.css";

const ProgressTracking = ({ progress, className = "" }) => {
	const calculatePercentage = (current, target) => {
		return Math.min(Math.round((current / target) * 100), 100);
	};

	const metrics = [
		{
			label: "Weight",
			current: progress.weight.current,
			target: progress.weight.target,
			unit: progress.weight.unit,
			icon: "⚖️",
		},
		{
			label: "Energy Level",
			current: progress.energy.current,
			target: progress.energy.target,
			unit: progress.energy.unit,
			icon: "⚡",
		},
		{
			label: "Sleep",
			current: progress.sleep.current,
			target: progress.sleep.target,
			unit: progress.sleep.unit,
			icon: "😴",
		},
	];

	return (
		<div className={`progress-tracking dashboard-card ${className}`}>
			<h2>Progress Tracking</h2>

			<div className="progress-metrics">
				{metrics.map((metric, index) => (
					<div key={index} className="progress-metric">
						<div className="metric-header">
							<span className="metric-icon">{metric.icon}</span>
							<span className="metric-label">{metric.label}</span>
							<span className="metric-value">
								{metric.current}
								{metric.unit}
							</span>
						</div>
						<div className="metric-progress">
							<div className="progress-bar">
								<div
									className="progress-fill"
									style={{
										width: `${calculatePercentage(
											metric.current,
											metric.target
										)}%`,
									}}
								></div>
							</div>
							<div className="metric-target">
								Target: {metric.target}
								{metric.unit}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="symptoms-improvement">
				<h3>Recent Improvements</h3>
				<div className="improvements-list">
					{progress.symptoms.map((improvement, index) => (
						<div key={index} className="improvement-item">
							<span className="improvement-icon">🌟</span>
							<span className="improvement-text">{improvement}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProgressTracking;
