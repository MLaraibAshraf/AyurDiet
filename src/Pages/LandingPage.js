import React from "react";
import { AuthProvider, useAuth } from "../Context/AuthContext"; 
import Header from "../Components/NavBar/Header"
import Hero from "../Components/Landing/Hero";
import Challenge from "../Components/Landing/Challenge";
import Solution from "../Components/Landing/Solution";
import Features from "../Components/Landing/Features";
import HowItWorks from "../Components/Landing/HowItWorks";
import Testimonials from "../Components/Landing/Testimonials";
import Pricing from "../Components/Landing/Pricing";
import Footer from "../Components/Landing/Footer";
import AuthPage from "./AuthPage";

// Component that conditionally renders based on authentication
const AppContent = () => {
	const { isAuthenticated, loading } = useAuth();

	if (loading) {
		return (
			<div className="loading-screen">
				<div className="loading-spinner"></div>
				<p>Loading AyurDiet...</p>
			</div>
		);
	}

	return (
		<div className="App">
			<Header />
			<Hero />
			<Challenge />
			<Solution />
			<Features />
			<HowItWorks />
			<Testimonials />
			<Pricing />
			<Footer />
		</div>
	);
};

function LandingPage() {
	return (
		<AuthProvider>
			<AppContent />
		</AuthProvider>
	);
}

export default LandingPage;
