import React, { useState } from "react";
import "./AdminComponent.css";

const UserManagement = ({ users, className = "" }) => {
	const [selectedUser, setSelectedUser] = useState(null);
	const [filter, setFilter] = useState("all");

	const filteredUsers = users.filter((user) => {
		if (filter === "all") return true;
		return user.status === filter;
	});

	const getStatusBadge = (status) => {
		const statusConfig = {
			pending: { label: "Pending", class: "pending" },
			active: { label: "Active", class: "active" },
			verified: { label: "Verified", class: "verified" },
			suspended: { label: "Suspended", class: "suspended" },
		};

		const config = statusConfig[status] || statusConfig.pending;
		return (
			<span className={`status-badge ${config.class}`}>{config.label}</span>
		);
	};

	const getUserTypeIcon = (type) => {
		const icons = {
			client: "👤",
			dietitian: "🌿",
			admin: "⚙️",
		};
		return icons[type] || "👤";
	};

	const handleUserAction = (userId, action) => {
		console.log(`Action ${action} on user ${userId}`);
		// Implement user actions here
	};

	return (
		<div className={`user-management ${className}`}>
			<div className="user-management-header">
				<h3>User Management</h3>
				<div className="user-filters">
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="filter-select"
					>
						<option value="all">All Users</option>
						<option value="pending">Pending</option>
						<option value="active">Active</option>
						<option value="verified">Verified</option>
						<option value="suspended">Suspended</option>
					</select>
					<button className="btn-primary">+ Add User</button>
				</div>
			</div>

			<div className="users-list">
				{filteredUsers.map((user) => (
					<div
						key={user.id}
						className={`user-card ${
							selectedUser?.id === user.id ? "selected" : ""
						}`}
						onClick={() => setSelectedUser(user)}
					>
						<div className="user-avatar">{getUserTypeIcon(user.type)}</div>

						<div className="user-info">
							<div className="user-main">
								<h4 className="user-name">{user.name}</h4>
								{getStatusBadge(user.status)}
							</div>
							<p className="user-email">{user.email}</p>
							<div className="user-meta">
								<span className="user-type">{user.type}</span>
								<span className="user-join-date">Joined {user.joinDate}</span>
							</div>
						</div>

						<div className="user-actions">
							{user.status === "pending" && (
								<>
									<button
										className="btn-success btn-sm"
										onClick={(e) => {
											e.stopPropagation();
											handleUserAction(user.id, "approve");
										}}
									>
										Approve
									</button>
									<button
										className="btn-error btn-sm"
										onClick={(e) => {
											e.stopPropagation();
											handleUserAction(user.id, "reject");
										}}
									>
										Reject
									</button>
								</>
							)}

							{user.status === "active" && (
								<button
									className="btn-warning btn-sm"
									onClick={(e) => {
										e.stopPropagation();
										handleUserAction(user.id, "suspend");
									}}
								>
									Suspend
								</button>
							)}

							<button
								className="btn-secondary btn-sm"
								onClick={(e) => {
									e.stopPropagation();
									handleUserAction(user.id, "view");
								}}
							>
								View
							</button>
						</div>
					</div>
				))}
			</div>

			<div className="user-management-footer">
				<span className="user-count">
					Showing {filteredUsers.length} of {users.length} users
				</span>
				<button className="btn-text">View All Users →</button>
			</div>
		</div>
	);
};

export default UserManagement;
