import React from "react";
import { useAuth } from "../../Context/AuthContext";
import "./DashboardHeader.css";

const DashboardHeader = ({
	title,
	user,
	welcomeMessage,
	onRefresh,
	refreshLoading,
}) => {
	const { logout } = useAuth();

	return (
		<div className="dashboard-header">
			<div className="header-left">
				<h1>{title}</h1>
				<p className="welcome-message">{welcomeMessage}</p>
			</div>
			<div className="header-right">
				{onRefresh && (
					<button
						onClick={onRefresh}
						disabled={refreshLoading}
						className="refresh-btn"
					>
						{refreshLoading ? "🔄" : "↻"} Refresh
					</button>
				)}
				<div className="user-info">
					<span className="user-name">{user?.name}</span>
					<span className="user-role">{user?.role}</span>
				</div>
				<button onClick={logout} className="logout-btn">
					Logout
				</button>
			</div>
		</div>
	);
};
export default DashboardHeader;
