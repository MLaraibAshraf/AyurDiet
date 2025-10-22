import React from "react";
import "./AdminComponent.css";

const SystemHealth = ({ system, recentActivity, className = "" }) => {
	const {
		uptime,
		responseTime,
		activeSessions,
		errorRate,
		serverLoad,
		databaseStatus,
	} = system;

	const getStatusLevel = (value, thresholds) => {
		if (value <= thresholds.good) return "good";
		if (value <= thresholds.warning) return "warning";
		return "critical";
	};

	const getUptimeStatus = (uptime) => {
		return getStatusLevel(100 - uptime, { good: 1, warning: 5 });
	};

	const getResponseTimeStatus = (responseTime) => {
		return getStatusLevel(responseTime, { good: 200, warning: 500 });
	};

	const getErrorRateStatus = (errorRate) => {
		return getStatusLevel(errorRate, { good: 1, warning: 5 });
	};

	const getServerLoadStatus = (load) => {
		return getStatusLevel(load, { good: 70, warning: 85 });
	};

	return (
		<div className={`system-health ${className}`}>
			<div className="system-header">
				<h3>System Health</h3>
				<div className="system-status">
					<span
						className={`status-indicator ${getUptimeStatus(uptime)}`}
					></span>
					<span className="status-text">All Systems Operational</span>
				</div>
			</div>

			<div className="system-metrics">
				<div className="metric-grid">
					<div className={`metric-card ${getUptimeStatus(uptime)}`}>
						<div className="metric-icon">🟢</div>
						<div className="metric-info">
							<div className="metric-value">{uptime}%</div>
							<div className="metric-label">Uptime</div>
						</div>
					</div>

					<div className={`metric-card ${getResponseTimeStatus(responseTime)}`}>
						<div className="metric-icon">⚡</div>
						<div className="metric-info">
							<div className="metric-value">{responseTime}ms</div>
							<div className="metric-label">Response Time</div>
						</div>
					</div>

					<div className={`metric-card ${getErrorRateStatus(errorRate)}`}>
						<div className="metric-icon">📊</div>
						<div className="metric-info">
							<div className="metric-value">{errorRate}%</div>
							<div className="metric-label">Error Rate</div>
						</div>
					</div>

					<div className={`metric-card ${getServerLoadStatus(serverLoad)}`}>
						<div className="metric-icon">🔧</div>
						<div className="metric-info">
							<div className="metric-value">{serverLoad}%</div>
							<div className="metric-label">Server Load</div>
						</div>
					</div>
				</div>
			</div>

			<div className="database-status">
				<h4>Database Status</h4>
				<div
					className={`status-card ${
						databaseStatus === "connected" ? "good" : "critical"
					}`}
				>
					<div className="status-indicator"></div>
					<div className="status-info">
						<div className="status-title">Primary Database</div>
						<div className="status-details">
							{databaseStatus === "connected"
								? "All connections healthy"
								: "Connection issues detected"}
						</div>
					</div>
					<div className="status-action">
						<button className="btn-sm btn-secondary">Test</button>
					</div>
				</div>
			</div>

			<div className="recent-activity">
				<h4>Recent Activity</h4>
				<div className="activity-list">
					{recentActivity.map((activity, index) => (
						<div key={index} className="activity-item">
							<div className="activity-icon">{activity.icon}</div>
							<div className="activity-content">
								<div className="activity-message">{activity.message}</div>
								<div className="activity-time">{activity.time}</div>
							</div>
							<div className={`activity-severity ${activity.severity}`}>
								{activity.severity}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="system-actions">
				<button className="btn-text">View Logs</button>
				<button className="btn-primary">Run Diagnostics</button>
			</div>
		</div>
	);
};

export default SystemHealth;
