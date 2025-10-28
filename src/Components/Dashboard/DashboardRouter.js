import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import ClientDashboard from "./Client/ClientDashboard";
import DietitianDashboard from "./Dietitian/DietitianDashboard";
import AdminDashboard from "./Admin/AdminDashboard";
import LoadingSpinner from "../Common/LoadingSpinner";

const DashboardRouter = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return <LoadingSpinner />;
	}

	// Determine which dashboard to show based on user role
	const getDefaultDashboard = () => {
		if (user?.role === "dietitian") {
			return <DietitianDashboard />;
		} else if (user?.role === "admin") {
			return <AdminDashboard />;
		} else {
			return <ClientDashboard />;
		}
	};

	return (
		<Routes>
			<Route path="/" element={getDefaultDashboard()} />
			<Route path="/client" element={<ClientDashboard />} />
			<Route path="/dietitian" element={<DietitianDashboard />} />
			<Route path="/admin" element={<AdminDashboard />} />
		</Routes>
	);
};

export default DashboardRouter;
