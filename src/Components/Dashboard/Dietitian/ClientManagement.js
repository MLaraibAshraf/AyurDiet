// src/Components/Dashboard/Dietitian/ClientManagement.js
import React from "react";
// import "./ClientManagement.css";

const ClientManagement = ({ clients, className = "" }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const getProgressColor = (progress) => {
		if (progress >= 80) return "high";
		if (progress >= 60) return "medium";
		return "low";
	};

	return (
		<div className={`client-management dashboard-card ${className}`}>
			<div className="section-header">
				<h2>Client Management</h2>
				<button className="view-all-btn">View All</button>
			</div>

			<div className="clients-list">
				{clients.map((client) => (
					<div key={client.id} className="client-item">
						<div className="client-info">
							<div className="client-avatar">
								{client.name.charAt(0).toUpperCase()}
							</div>
							<div className="client-details">
								<h4 className="client-name">{client.name}</h4>
								<p className="last-session">
									Last: {formatDate(client.lastSession)}
								</p>
							</div>
						</div>

						<div className="client-progress">
							<div className="progress-info">
								<span className="progress-value">{client.progress}%</span>
								<div
									className={`progress-bar ${getProgressColor(
										client.progress
									)}`}
								>
									<div
										className="progress-fill"
										style={{ width: `${client.progress}%` }}
									></div>
								</div>
							</div>
							<p className="next-appointment">
								Next: {formatDate(client.nextAppointment)}
							</p>
						</div>

						<div className="client-actions">
							<button className="action-btn message">Message</button>
							<button className="action-btn view">View</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ClientManagement;
