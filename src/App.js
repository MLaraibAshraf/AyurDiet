import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import LandingPage from "./Pages/LandingPage";
import AuthPage from "./Pages/AuthPage";
import DashboardRouter from "./Components/Dashboard/DashboardRouter";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="loading-spinner"></div>
				<p>Loading AyurDiet...</p>
			</div>
		);
	}

	return isAuthenticated ? children : <Navigate to="/auth" />;
};

// Public Route Component (redirects to dashboard if authenticated)
const PublicRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="loading-spinner"></div>
				<p>Loading AyurDiet...</p>
			</div>
		);
	}

	return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppContent() {
	return (
		<Router>
			<div className="App">
				<Routes>
					{/* Public routes */}
					<Route
						path="/"
						element={
							<PublicRoute>
								<LandingPage />
							</PublicRoute>
						}
					/>

					<Route
						path="/auth"
						element={
							<PublicRoute>
								<AuthPage />
							</PublicRoute>
						}
					/>

					{/* Protected routes */}
					<Route
						path="/dashboard"
						element={
							<ProtectedRoute>
								<DashboardRouter />
							</ProtectedRoute>
						}
					/>

					{/* Catch all route */}
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</Router>
	);
}

function App() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default App;
