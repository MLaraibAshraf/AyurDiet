// src/Components/Dashboard/Client/ClientDashboard.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../../../Context/AuthContext";
import DashboardHeader from "../../Common/DashboardHeader";
import StatsGrid from "../../Common/StatsGrid";
import HealthOverview from "./HealthOverview";
import CurrentDietPlan from "./CurrentDietPlan";
import ProgressTracking from "./ProgressTracking";
import FoodLog from "./FoodLog";
import AppointmentsList from "./AppointmentsList";
import QuickActions from "../../Common/QuickActions";
import LoadingSpinner from "../../Common/LoadingSpinner";
import { clientDashboardService } from "../../../utils/mockDataService";
import "./ClientDashboard.css";

const ClientDashboard = () => {
	const { user } = useAuth();
	const [dashboardData, setDashboardData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadDashboardData = async () => {
			try {
				const data = await clientDashboardService.getDashboardData(user.id);
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
		return <LoadingSpinner />;
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
		healthData,
		currentPlan,
		progress,
		appointments,
		recentFoodLogs,
	} = dashboardData;


	console.log(ClientDashboard);

	return (
		<>
			<div className="client-dashboard">
				<DashboardHeader
					title="My Health Journey"
					user={user}
					welcomeMessage={`Welcome back, ${user.name}! Ready for your wellness journey?`}
				/>

				<div className="dashboard-content">
					{/* Top Stats */}
					<div className="stats-section">
						<StatsGrid stats={stats} />
					</div>

					<div className="dashboard-grid">
						{/* Left Column */}
						<div className="left-column">
							<HealthOverview data={healthData} className="dashboard-card" />

							<CurrentDietPlan plan={currentPlan} className="dashboard-card" />

							<ProgressTracking
								progress={progress}
								className="dashboard-card"
							/>
						</div>

						{/* Right Column */}
						<div className="right-column">
							<AppointmentsList
								appointments={appointments}
								className="dashboard-card"
							/>

							<FoodLog logs={recentFoodLogs} className="dashboard-card" />

							<QuickActions
								actions={[
									{ label: "Log Meal", icon: "🍽️", path: "/log-meal" },
									{ label: "Track Symptoms", icon: "📝", path: "/symptoms" },
									{ label: "Message Dietitian", icon: "💬", path: "/messages" },
									{ label: "View Progress", icon: "📊", path: "/progress" },
								]}
								className="dashboard-card"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientDashboard;
