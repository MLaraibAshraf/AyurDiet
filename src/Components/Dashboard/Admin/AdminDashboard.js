import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import DashboardHeader from "../../Common/DashboardHeader";
import StatsGrid from "../../Common/StatsGrid";
import PlatformOverview from "./PlatformOverview";
import UserManagement from "./UserManagement";
import ContentManagement from "./ContentManagement";
import FinancialOverview from "./FinancialOverview";
import SystemHealth from "./SystemHealth";
import QuickActions from "../../Common/QuickActions";
import { adminDashboardService } from "../../../utils/mockDataService";
import "./AdminDashboard.css";

const AdminDashboard = () => {
	const { user } = useAuth();
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [refreshKey, setRefreshKey] = useState(0);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				const data = await adminDashboardService.getDashboardData();
				setDashboardData(data);
			} catch (error) {
				console.error("Error loading dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, [refreshKey]);

	const handleRefresh = () => {
		setLoading(true);
		setRefreshKey((prev) => prev + 1);
	};

	if (loading || !dashboardData) {
		return (
			<div className="admin-dashboard-loading">
				<div className="loading-spinner-large"></div>
				<p>Loading platform dashboard...</p>
			</div>
		);
	}

	const {
		stats,
		platformOverview,
		users,
		content,
		financials,
		systemHealth,
		recentActivity,
	} = dashboardData;

	return (
		<div className="admin-dashboard">
			<DashboardHeader
				title="Platform Administration"
				user={user}
				welcomeMessage="Complete platform oversight and management"
				onRefresh={handleRefresh}
				refreshLoading={loading}
			/>

			<div className="admin-dashboard-content">
				{/* Platform Stats */}
				<div className="stats-section">
					<StatsGrid stats={stats} />
				</div>

				<div className="admin-dashboard-grid">
					{/* Left Column */}
					<div className="admin-left-column">
						<PlatformOverview
							data={platformOverview}
							className="admin-dashboard-card"
						/>

						<UserManagement users={users} className="admin-dashboard-card" />

						<ContentManagement
							content={content}
							className="admin-dashboard-card"
						/>
					</div>

					{/* Right Column */}
					<div className="admin-right-column">
						<FinancialOverview
							financials={financials}
							className="admin-dashboard-card"
						/>

						<SystemHealth
							system={systemHealth}
							recentActivity={recentActivity}
							className="admin-dashboard-card"
						/>

						<QuickActions
							actions={[
								{
									label: "User Management",
									icon: "👥",
									path: "/admin/users",
									color: "primary",
								},
								{
									label: "Content Review",
									icon: "📝",
									path: "/admin/content",
									color: "secondary",
								},
								{
									label: "Financial Reports",
									icon: "💰",
									path: "/admin/financials",
									color: "accent",
								},
								{
									label: "System Settings",
									icon: "⚙️",
									path: "/admin/settings",
									color: "primary",
								},
							]}
							className="admin-dashboard-card"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
