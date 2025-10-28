// src/Components/Dashboard/Dietitian/AppointmentSchedule.js
import React from "react";
// import "./AppointmentSchedule.css";

const AppointmentSchedule = ({ appointments, className = "" }) => {
	const getStatusBadge = (status) => {
		const statusConfig = {
			confirmed: { label: "Confirmed", class: "confirmed" },
			pending: { label: "Pending", class: "pending" },
			cancelled: { label: "Cancelled", class: "cancelled" },
		};

		const config = statusConfig[status] || { label: status, class: "default" };
		return (
			<span className={`status-badge ${config.class}`}>{config.label}</span>
		);
	};

	return (
		<div className={`appointment-schedule dashboard-card ${className}`}>
			<div className="section-header">
				<h2>Today's Appointments</h2>
				<button className="schedule-btn">+ New</button>
			</div>

			<div className="appointments-list">
				{appointments.map((appointment) => (
					<div key={appointment.id} className="appointment-item">
						<div className="appointment-time">
							<span className="time">{appointment.time}</span>
						</div>

						<div className="appointment-details">
							<h4 className="client-name">{appointment.client}</h4>
							<p className="appointment-type">{appointment.type}</p>
							{getStatusBadge(appointment.status)}
						</div>

						<div className="appointment-actions">
							<button className="action-btn primary">
								{appointment.status === "pending" ? "Confirm" : "Start"}
							</button>
							<button className="action-btn secondary">Reschedule</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AppointmentSchedule;
