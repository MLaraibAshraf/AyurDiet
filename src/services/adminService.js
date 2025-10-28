import { supabase } from '../config/supabase';

export const adminService = {
	async getDashboardData() {
		const [
			stats,
			platformOverview,
			users,
			content,
			financials,
			systemHealth,
			recentActivity
		] = await Promise.all([
			this.getPlatformStats(),
			this.getPlatformOverview(),
			this.getRecentUsers(),
			this.getContentStats(),
			this.getFinancialStats(),
			this.getSystemHealth(),
			this.getRecentActivity()
		]);

		return {
			stats,
			platformOverview,
			users,
			content,
			financials,
			systemHealth,
			recentActivity
		};
	},

	async getPlatformStats() {
		const { count: totalUsers } = await supabase
			.from('profiles')
			.select('*', { count: 'exact', head: true });

		const { count: activeDietitians } = await supabase
			.from('profiles')
			.select('*', { count: 'exact', head: true })
			.eq('role', 'dietitian');

		const { count: activePlans } = await supabase
			.from('diet_plans')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'active');

		return [
			{
				title: "Total Users",
				value: (totalUsers || 0).toLocaleString(),
				change: "+124",
				trend: "up",
				icon: "👥",
			},
			{
				title: "Active Dietitians",
				value: (activeDietitians || 0).toString(),
				change: "+12",
				trend: "up",
				icon: "🌿",
			},
			{
				title: "Monthly Revenue",
				value: "$48.2K",
				change: "+$3.5K",
				trend: "up",
				icon: "💰",
			},
			{
				title: "Platform Growth",
				value: "28%",
				change: "+4%",
				trend: "up",
				icon: "📈",
			},
		];
	},

	async getPlatformOverview() {
		const { count: totalUsers } = await supabase
			.from('profiles')
			.select('*', { count: 'exact', head: true });

		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		const { count: activeUsers } = await supabase
			.from('profiles')
			.select('*', { count: 'exact', head: true })
			.gte('updated_at', thirtyDaysAgo.toISOString());

		return {
			activeUsers: (activeUsers || 0).toLocaleString(),
			retentionRate: totalUsers > 0 ? `${Math.round((activeUsers / totalUsers) * 100)}%` : "0%",
			avgSession: "12.4min",
			supportTickets: 23,
			growth: "15%",
			performance: {
				uptime: 99.8,
				responseTime: 85,
				errorRate: 0.2,
			},
		};
	},

	async getRecentUsers() {
		const { data: users } = await supabase
			.from('profiles')
			.select('*')
			.order('created_at', { ascending: false })
			.limit(10);

		return (users || []).map(user => ({
			id: user.id,
			name: user.name,
			email: user.email,
			type: user.role,
			status: "active",
			joinDate: user.join_date?.split('T')[0] || user.created_at?.split('T')[0],
		}));
	},

	async getContentStats() {
		const { count: totalPlans } = await supabase
			.from('diet_plans')
			.select('*', { count: 'exact', head: true });

		return {
			pendingRecipes: 12,
			pendingArticles: 5,
			reportedContent: 3,
			moderationQueue: Math.floor(totalPlans / 10) || 0,
		};
	},

	async getFinancialStats() {
		const { count: activePlans } = await supabase
			.from('diet_plans')
			.select('*', { count: 'exact', head: true })
			.eq('status', 'active');

		const estimatedMonthly = (activePlans || 0) * 50;

		return {
			revenue: {
				monthly: estimatedMonthly,
				quarterly: estimatedMonthly * 3,
				yearly: estimatedMonthly * 12,
			},
			subscriptions: {
				active: activePlans || 0,
				newThisMonth: 156,
				churnRate: "2.3%",
			},
			payouts: [
				{
					recipient: "Dr. Sharma",
					amount: 1250,
					date: new Date().toISOString().split('T')[0],
					status: "completed",
				},
			],
			growth: {
				monthly: 12,
				quarterly: 8,
				yearly: 28,
			},
		};
	},

	async getSystemHealth() {
		return {
			uptime: 99.98,
			responseTime: 124,
			activeSessions: 289,
			errorRate: 0.02,
			serverLoad: 65,
			databaseStatus: "connected",
		};
	},

	async getRecentActivity() {
		const { data: recentUsers } = await supabase
			.from('profiles')
			.select('name, created_at')
			.order('created_at', { ascending: false })
			.limit(3);

		const activities = [];

		if (recentUsers && recentUsers.length > 0) {
			recentUsers.forEach(user => {
				const minutesAgo = Math.floor((Date.now() - new Date(user.created_at).getTime()) / 60000);
				activities.push({
					icon: "👤",
					message: `New user registration: ${user.name}`,
					time: minutesAgo < 60 ? `${minutesAgo} mins ago` : `${Math.floor(minutesAgo / 60)} hours ago`,
					severity: "info",
				});
			});
		}

		activities.push(
			{
				icon: "💰",
				message: "Monthly subscription payment processed",
				time: "1 hour ago",
				severity: "info",
			},
			{
				icon: "🔧",
				message: "Database backup completed",
				time: "2 hours ago",
				severity: "info",
			}
		);

		return activities;
	}
};
