import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../config/supabase";

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
		const initAuth = async () => {
			const { data: { session } } = await supabase.auth.getSession();

			if (session?.user) {
				await loadUserProfile(session.user.id);
			}

			setLoading(false);
		};

		initAuth();

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			(async () => {
				if (session?.user) {
					await loadUserProfile(session.user.id);
				} else {
					setUser(null);
				}
			})();
		});

		return () => {
			subscription.unsubscribe();
		};
	}, []);

	const loadUserProfile = async (userId) => {
		const { data: profile, error } = await supabase
			.from('profiles')
			.select('*')
			.eq('id', userId)
			.maybeSingle();

		if (profile && !error) {
			setUser({
				id: profile.id,
				name: profile.name,
				email: profile.email,
				role: profile.role,
				joinDate: profile.join_date,
				phone: profile.phone,
				avatarUrl: profile.avatar_url
			});
		}
	};

	const login = async (email, password) => {
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email,
				password
			});

			if (error) {
				return { success: false, error: error.message };
			}

			if (data.user) {
				await loadUserProfile(data.user.id);
				return { success: true };
			}

			return { success: false, error: "Login failed" };
		} catch (error) {
			return { success: false, error: "Login failed. Please try again." };
		}
	};

	const register = async (userData) => {
		try {
			const { data: authData, error: authError } = await supabase.auth.signUp({
				email: userData.email,
				password: userData.password,
			});

			if (authError) {
				return { success: false, error: authError.message };
			}

			if (!authData.user) {
				return { success: false, error: "Registration failed" };
			}

			const { error: profileError } = await supabase
				.from('profiles')
				.insert({
					id: authData.user.id,
					name: userData.name,
					email: userData.email,
					role: userData.role || 'client',
					phone: userData.phone
				});

			if (profileError) {
				return { success: false, error: profileError.message };
			}

			if (userData.role === 'dietitian') {
				await supabase.from('dietitian_profiles').insert({
					id: authData.user.id,
					practice_name: userData.practiceName || '',
					specialization: userData.specialization || ''
				});
			} else if (userData.role === 'client') {
				await supabase.from('client_profiles').insert({
					id: authData.user.id,
					health_goals: userData.healthGoals || []
				});
			}

			await loadUserProfile(authData.user.id);
			return { success: true };
		} catch (error) {
			return {
				success: false,
				error: "Registration failed. Please try again.",
			};
		}
	};

	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null);
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
