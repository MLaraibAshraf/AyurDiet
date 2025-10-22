// src/Components/Dashboard/Client/AppointmentsList.js
import React from "react";
import "./ClientComponents.css";

const AppointmentsList = ({ appointments, className = "" }) => {
	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
		});
	};

	const isUpcoming = (dateString) => {
		const appointmentDate = new Date(dateString);
		const today = new Date();
		return appointmentDate >= today;
	};

	return (
		<div className={`appointments-list dashboard-card ${className}`}>
			<div className="appointments-header">
				<h2>Appointments</h2>
				<button className="schedule-btn">Schedule New</button>
			</div>

			<div className="appointments-container">
				{appointments.map((appointment) => (
					<div
						key={appointment.id}
						className={`appointment-item ${
							isUpcoming(appointment.date) ? "upcoming" : "past"
						}`}
					>
						<div className="appointment-date">
							<span className="date">{formatDate(appointment.date)}</span>
							<span className="time">{appointment.time}</span>
						</div>
						<div className="appointment-details">
							<h4 className="appointment-type">{appointment.type}</h4>
							<p className="dietitian">With {appointment.dietitian}</p>
						</div>
						<div className="appointment-actions">
							{isUpcoming(appointment.date) && (
								<>
									<button className="action-btn join">Join</button>
									<button className="action-btn reschedule">Reschedule</button>
								</>
							)}
						</div>
					</div>
				))}
			</div>

			{appointments.length === 0 && (
				<div className="no-appointments">
					<p>No appointments scheduled</p>
				</div>
			)}
		</div>
	);
};

export default AppointmentsList;
