// src/Components/Dashboard/Client/HealthOverview.js
import React from "react";
// import "./HealthOverview.css";

const HealthOverview = ({ data, className = "" }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	return (
		<div className={`health-overview dashboard-card ${className}`}>
			<h2>Health Profile</h2>
			<div className="health-content">
				<div className="health-section">
					<div className="health-item">
						<span className="health-label">Dosha Type:</span>
						<span className="health-value dosha-type">{data.doshaType}</span>
					</div>

					<div className="health-item">
						<span className="health-label">Current Imbalances:</span>
						<div className="imbalances-list">
							{data.imbalances.map((imbalance, index) => (
								<span key={index} className="imbalance-tag">
									{imbalance}
								</span>
							))}
						</div>
					</div>
				</div>

				<div className="appointment-section">
					<div className="appointment-item">
						<span className="appointment-label">Last Checkup:</span>
						<span className="appointment-date">
							{formatDate(data.lastCheckup)}
						</span>
					</div>
					<div className="appointment-item">
						<span className="appointment-label">Next Appointment:</span>
						<span className="appointment-date next">
							{formatDate(data.nextAppointment)}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HealthOverview;
