// src/Components/Dashboard/Dietitian/DietitianDashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import DashboardHeader from "../../Common/DashboardHeader";
import StatsGrid from "../../Common/StatsGrid";
import PracticeOverview from "./PracticeOverview";
import ClientManagement from "./ClientManagement";
import AppointmentSchedule from "./AppointmentSchedule";
import DietPlanManagement from "./DietPlanManagement";
import PracticeAnalytics from "./PracticeAnalytics";
import QuickActions from "../../Common/QuickActions";
import { dietitianDashboardService } from "../../../utils/mockDataService";
import LoadingSpinner from "../../Common/LoadingSpinner";
import "./DietitianDashboard.css";

const DietitianDashboard = () => {
	const { user } = useAuth();
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				const data = await dietitianDashboardService.getDashboardData(user.id);
				setDashboardData(data);
			} catch (error) {
				console.error("Error loading dashboard data:", error);
			} finally {
				setLoading(false);
			}
		};

		loadDashboardData();
	}, [user.id]);

	if (loading) {
		return (
			<div className="dashboard-loading">
				<LoadingSpinner
					fullScreen
					text="Loading your practice dashboard..."
					variant="primary"
				/>
			</div>
		);
	}

	if (!dashboardData) {
		return (
			<div className="dashboard-error">
				<p>Failed to load dashboard data</p>
			</div>
		);
	}

	const {
		stats,
		practiceOverview,
		clients,
		appointments,
		activePlans,
		analytics,
	} = dashboardData;

	return (
		<div className="dietitian-dashboard">
			<DashboardHeader
				title="My Practice"
				user={user}
				welcomeMessage={`Welcome back, ${user.name}! ${practiceOverview.message}`}
			/>

			<div className="dashboard-content">
				{/* Practice Stats */}
				<div className="stats-section">
					<StatsGrid stats={stats} />
				</div>

				<div className="dashboard-grid">
					{/* Left Column */}
					<div className="left-column">
						<PracticeOverview
							data={practiceOverview}
							className="dashboard-card"
						/>

						<ClientManagement clients={clients} className="dashboard-card" />

						<DietPlanManagement
							plans={activePlans}
							className="dashboard-card"
						/>
					</div>

					{/* Right Column */}
					<div className="right-column">
						<AppointmentSchedule
							appointments={appointments}
							className="dashboard-card"
						/>

						<PracticeAnalytics
							analytics={analytics}
							className="dashboard-card"
						/>

						<QuickActions
							actions={[
								{ label: "New Client", icon: "👥", path: "/clients/new" },
								{ label: "Create Plan", icon: "📋", path: "/plans/create" },
								{ label: "Schedule", icon: "📅", path: "/schedule" },
								{ label: "Reports", icon: "📊", path: "/reports" },
							]}
							className="dashboard-card"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DietitianDashboard;
