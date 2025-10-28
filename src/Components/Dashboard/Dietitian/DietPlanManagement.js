// src/Components/Dashboard/Dietitian/DietPlanManagement.js
import React from "react";
// import "./DietPlanManagement.css";

const DietPlanManagement = ({ plans, className = "" }) => {
	const getStatusBadge = (status) => {
		return <span className={`plan-status ${status}`}>{status}</span>;
	};

	return (
		<div className={`diet-plan-management dashboard-card ${className}`}>
			<div className="section-header">
				<h2>Active Diet Plans</h2>
				<button className="create-plan-btn">+ Create Plan</button>
			</div>

			<div className="plans-grid">
				{plans.map((plan) => (
					<div key={plan.id} className="plan-card">
						<div className="plan-header">
							<h3 className="plan-name">{plan.name}</h3>
							{getStatusBadge(plan.status)}
						</div>

						<div className="plan-stats">
							<div className="stat">
								<span className="stat-value">{plan.clients}</span>
								<span className="stat-label">Clients</span>
							</div>
							<div className="stat">
								<span className="stat-value">{plan.progress}%</span>
								<span className="stat-label">Progress</span>
							</div>
						</div>

						<div className="plan-progress">
							<div className="progress-bar">
								<div
									className="progress-fill"
									style={{ width: `${plan.progress}%` }}
								></div>
							</div>
						</div>

						<div className="plan-actions">
							<button className="action-btn view">View Details</button>
							<button className="action-btn edit">Edit</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default DietPlanManagement;
