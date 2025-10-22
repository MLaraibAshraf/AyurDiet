// src/Components/Dashboard/Dietitian/PracticeAnalytics.js
import React from "react";
// import "./PracticeAnalytics.css";

const PracticeAnalytics = ({ analytics, className = "" }) => {
	const { clientGrowth, revenueTrend, satisfaction } = analytics;

	const getLatestValue = (array) => array[array.length - 1];
	const getPreviousValue = (array) => array[array.length - 2];

	const calculateChange = (current, previous) => {
		return (((current - previous) / previous) * 100).toFixed(1);
	};

	return (
		<div className={`practice-analytics dashboard-card ${className}`}>
			<h2>Practice Analytics</h2>

			<div className="analytics-grid">
				<div className="analytics-card">
					<div className="analytics-header">
						<span className="analytics-title">Client Growth</span>
						<span className="analytics-change positive">
							+
							{calculateChange(
								getLatestValue(clientGrowth),
								getPreviousValue(clientGrowth)
							)}
							%
						</span>
					</div>
					<div className="analytics-value">{getLatestValue(clientGrowth)}</div>
					<div className="analytics-chart">
						<div className="chart-bars">
							{clientGrowth.slice(-6).map((value, index) => (
								<div
									key={index}
									className="chart-bar"
									style={{
										height: `${(value / Math.max(...clientGrowth)) * 100}%`,
									}}
								></div>
							))}
						</div>
					</div>
				</div>

				<div className="analytics-card">
					<div className="analytics-header">
						<span className="analytics-title">Revenue Trend</span>
						<span className="analytics-change positive">
							+
							{calculateChange(
								getLatestValue(revenueTrend),
								getPreviousValue(revenueTrend)
							)}
							%
						</span>
					</div>
					<div className="analytics-value">
						${getLatestValue(revenueTrend).toLocaleString()}
					</div>
					<div className="analytics-chart">
						<div className="chart-line">
							{revenueTrend.slice(-6).map((value, index, array) => (
								<div
									key={index}
									className="chart-point"
									style={{
										left: `${(index / (array.length - 1)) * 100}%`,
										bottom: `${(value / Math.max(...revenueTrend)) * 100}%`,
									}}
								></div>
							))}
						</div>
					</div>
				</div>

				<div className="analytics-card">
					<div className="analytics-header">
						<span className="analytics-title">Satisfaction</span>
						<span className="analytics-change positive">
							+
							{calculateChange(
								getLatestValue(satisfaction),
								getPreviousValue(satisfaction)
							)}
							%
						</span>
					</div>
					<div className="analytics-value">
						{getLatestValue(satisfaction)}/5
					</div>
					<div className="satisfaction-stars">
						{"⭐".repeat(Math.round(getLatestValue(satisfaction)))}
						{"☆".repeat(5 - Math.round(getLatestValue(satisfaction)))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default PracticeAnalytics;
