import React from "react";
import "./AdminComponent.css";

const PlatformOverview = ({ data, className = "" }) => {
	const {
		activeUsers,
		retentionRate,
		avgSession,
		supportTickets,
		growth,
		performance,
	} = data;

	return (
		<div className={`platform-overview ${className}`}>
			<div className="platform-header">
				<h3>Platform Overview</h3>
				<span className="platform-status active">All Systems Operational</span>
			</div>

			<div className="platform-metrics">
				<div className="metric-row">
					<div className="metric-item">
						<div className="metric-value">{activeUsers}</div>
						<div className="metric-label">Active Users</div>
						<div className="metric-trend up">+12% this week</div>
					</div>

					<div className="metric-item">
						<div className="metric-value">{retentionRate}</div>
						<div className="metric-label">Retention Rate</div>
						<div className="metric-trend up">+3%</div>
					</div>
				</div>

				<div className="metric-row">
					<div className="metric-item">
						<div className="metric-value">{avgSession}</div>
						<div className="metric-label">Avg Session</div>
						<div className="metric-trend neutral">±0</div>
					</div>

					<div className="metric-item">
						<div className="metric-value">{supportTickets}</div>
						<div className="metric-label">Support Tickets</div>
						<div className="metric-trend down">-5 today</div>
					</div>
				</div>
			</div>

			<div className="platform-performance">
				<h4>Performance Metrics</h4>
				<div className="performance-bars">
					<div className="performance-bar">
						<div className="bar-label">Uptime</div>
						<div className="bar-container">
							<div
								className="bar-fill success"
								style={{ width: `${performance.uptime}%` }}
							></div>
						</div>
						<div className="bar-value">{performance.uptime}%</div>
					</div>

					<div className="performance-bar">
						<div className="bar-label">Response Time</div>
						<div className="bar-container">
							<div
								className="bar-fill warning"
								style={{ width: `${performance.responseTime}%` }}
							></div>
						</div>
						<div className="bar-value">{performance.responseTime}ms</div>
					</div>

					<div className="performance-bar">
						<div className="bar-label">Error Rate</div>
						<div className="bar-container">
							<div
								className="bar-fill error"
								style={{ width: `${performance.errorRate}%` }}
							></div>
						</div>
						<div className="bar-value">{performance.errorRate}%</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PlatformOverview;
