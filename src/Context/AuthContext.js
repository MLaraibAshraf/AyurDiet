import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const token = localStorage.getItem("authToken");
		const userData = localStorage.getItem("userData");

		if (token && userData) {
			setUser(JSON.parse(userData));
		}
		setLoading(false);
	}, []);

	const login = async (email, password) => {
		try {
			const response = await mockLoginAPI(email, password);

			if (response.success) {
				setUser(response.user);
				localStorage.setItem("authToken", response.token);
				localStorage.setItem("userData", JSON.stringify(response.user));
				return { success: true };
			} else {
				return { success: false, error: response.error };
			}
		} catch (error) {
			return { success: false, error: "Login failed. Please try again." };
		}
	};

	const register = async (userData) => {
		try {
			const response = await mockRegisterAPI(userData);

			if (response.success) {
				setUser(response.user);
				localStorage.setItem("authToken", response.token);
				localStorage.setItem("userData", JSON.stringify(response.user));
				return { success: true };
			} else {
				return { success: false, error: response.error };
			}
		} catch (error) {
			return {
				success: false,
				error: "Registration failed. Please try again.",
			};
		}
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("authToken");
		localStorage.removeItem("userData");
	};

	const value = {
		user,
		login,
		register,
		logout,
		loading,
		isAuthenticated: !!user,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Mock API functions
const mockLoginAPI = (email, password) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			const users = {
				"client@ayursaas.com": {
					id: 1,
					name: "John Client",
					email: "client@ayursaas.com",
					role: "client",
					joinDate: "2024-01-15",
				},
				"dietitian@ayursaas.com": {
					id: 2,
					name: "Dr. Anika Sharma",
					email: "dietitian@ayursaas.com",
					role: "dietitian",
					joinDate: "2023-01-15",
				},
				"admin@ayursaas.com": {
					id: 3,
					name: "Admin User",
					email: "admin@ayursaas.com",
					role: "admin",
					joinDate: "2022-01-15",
				},
			};

			if (users[email] && password === "password") {
				resolve({
					success: true,
					token: "mock-jwt-token",
					user: users[email],
				});
			} else {
				resolve({
					success: false,
					error: "Invalid email or password",
				});
			}
		}, 1000);
	});
};


const mockRegisterAPI = (userData) => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				success: true,
				token: "mock-jwt-token",
				user: {
					id: Date.now(),
					...userData,
					joinDate: new Date().toISOString().split("T")[0],
					// Set default values based on role
					...(userData.role === "dietitian" && {
						practiceName: "",
						specialization: "",
						totalClients: 0,
						monthlyRevenue: "$0",
					}),
					...(userData.role === "client" && {
						healthGoals: [],
					}),
				},
			});
		}, 1000);
	});
};
