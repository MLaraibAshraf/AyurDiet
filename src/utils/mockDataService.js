// Mock data service that simulates API calls
// Replace these with actual API calls when backend is ready

export const clientDashboardService = {
	async getDashboardData(userId) {
		// Simulate API delay
		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			stats: [
				{
					title: "Wellness Score",
					value: "85%",
					change: "+5%",
					trend: "up",
					icon: "⭐",
				},
				{
					title: "Plan Adherence",
					value: "92%",
					change: "+3%",
					trend: "up",
					icon: "📊",
				},
				{
					title: "Weekly Progress",
					value: "78%",
					change: "+8%",
					trend: "up",
					icon: "📈",
				},
				{
					title: "Goals Achieved",
					value: "3/5",
					change: "1 new",
					trend: "up",
					icon: "🎯",
				},
			],
			healthData: {
				doshaType: "Vata-Pitta",
				imbalances: ["Digestive Issues", "Sleep Quality"],
				lastCheckup: "2024-01-15",
				nextAppointment: "2024-02-15",
			},
			currentPlan: {
				id: 1,
				name: "Vata Balancing Diet",
				duration: "30 days",
				progress: 65,
				meals: {
					breakfast: "Warm oatmeal with ghee",
					lunch: "Kitchari with vegetables",
					dinner: "Stewed apples with spices",
				},
				recommendations: {
					foods: ["Warm foods", "Nourishing soups", "Healthy fats"],
					avoid: ["Cold foods", "Raw vegetables", "Caffeine"],
				},
			},
			progress: {
				weight: { current: 68, target: 65, unit: "kg" },
				energy: { current: 8, target: 9, unit: "/10" },
				sleep: { current: 7, target: 8, unit: "hours" },
				symptoms: ["Improved digestion", "Better sleep quality"],
			},
			appointments: [
				{
					id: 1,
					date: "2024-01-20",
					time: "10:00 AM",
					type: "Follow-up",
					dietitian: "Dr. Sharma",
				},
				{
					id: 2,
					date: "2024-02-15",
					time: "2:00 PM",
					type: "Progress Review",
					dietitian: "Dr. Sharma",
				},
			],
			recentFoodLogs: [
				{
					id: 1,
					meal: "Breakfast",
					food: "Oatmeal with fruits",
					time: "8:00 AM",
					rating: 4,
				},
				{
					id: 2,
					meal: "Lunch",
					food: "Vegetable soup",
					time: "1:00 PM",
					rating: 5,
				},
			],
		};
	},
};

export const dietitianDashboardService = {
	async getDashboardData(dietitianId) {
		await new Promise((resolve) => setTimeout(resolve, 500));

		return {
			stats: [
				{
					title: "Total Clients",
					value: "47",
					change: "+3",
					trend: "up",
					icon: "👥",
				},
				{
					title: "Active Plans",
					value: "32",
					change: "+2",
					trend: "up",
					icon: "📋",
				},
				{
					title: "Monthly Revenue",
					value: "$8,250",
					change: "+$450",
					trend: "up",
					icon: "💰",
				},
				{
					title: "Satisfaction",
					value: "4.8/5",
					change: "+0.2",
					trend: "up",
					icon: "⭐",
				},
			],
			practiceOverview: {
				message: "You have 3 appointments today and 2 pending diet plans.",
				growth: "15%",
				activeClients: 32,
				monthlySessions: 89,
			},
			clients: [
				{
					id: 1,
					name: "John Client",
					progress: 85,
					lastSession: "2024-01-18",
					nextAppointment: "2024-01-25",
				},
				{
					id: 2,
					name: "Sarah Wilson",
					progress: 72,
					lastSession: "2024-01-17",
					nextAppointment: "2024-01-24",
				},
				{
					id: 3,
					name: "Mike Johnson",
					progress: 91,
					lastSession: "2024-01-16",
					nextAppointment: "2024-01-23",
				},
			],
			appointments: [
				{
					id: 1,
					client: "John Client",
					time: "10:00 AM",
					type: "Follow-up",
					status: "confirmed",
				},
				{
					id: 2,
					client: "Sarah Wilson",
					time: "2:00 PM",
					type: "Progress Review",
					status: "confirmed",
				},
				{
					id: 3,
					client: "New Client",
					time: "4:00 PM",
					type: "Consultation",
					status: "pending",
				},
			],
			activePlans: [
				{
					id: 1,
					name: "Weight Management",
					clients: 12,
					progress: 78,
					status: "active",
				},
				{
					id: 2,
					name: "Stress Relief",
					clients: 8,
					progress: 65,
					status: "active",
				},
				{
					id: 3,
					name: "Detox Program",
					clients: 5,
					progress: 45,
					status: "active",
				},
			],
			analytics: {
				clientGrowth: [65, 59, 80, 81, 56, 55, 72, 65, 78, 82, 90, 85],
				revenueTrend: [
					4500, 5200, 6100, 6800, 7200, 7800, 8100, 7900, 8250, 8600, 8900,
					9200,
				],
				satisfaction: [
					4.5, 4.6, 4.7, 4.8, 4.7, 4.8, 4.8, 4.9, 4.8, 4.8, 4.9, 4.9,
				],
			},
		};
	},
};

export const adminDashboardService = {
	async getDashboardData() {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		return {
			stats: [
				{
					title: "Total Users",
					value: "2,847",
					change: "+124",
					trend: "up",
					icon: "👥",
				},
				{
					title: "Active Dietitians",
					value: "156",
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
			],
			platformOverview: {
				activeUsers: "1,892",
				retentionRate: "87%",
				avgSession: "12.4min",
				supportTickets: 23,
				growth: "15%",
				performance: {
					uptime: 99.8,
					responseTime: 85,
					errorRate: 0.2,
				},
			},
			users: [
				{
					id: 1,
					name: "New User",
					email: "new@example.com",
					type: "client",
					status: "pending",
					joinDate: "2024-01-20",
				},
				{
					id: 2,
					name: "Dr. Patel",
					email: "dr.patel@example.com",
					type: "dietitian",
					status: "verified",
					joinDate: "2024-01-18",
				},
				{
					id: 3,
					name: "Sarah M.",
					email: "sarah@example.com",
					type: "client",
					status: "active",
					joinDate: "2024-01-17",
				},
				{
					id: 4,
					name: "John Doe",
					email: "john@example.com",
					type: "client",
					status: "suspended",
					joinDate: "2024-01-15",
				},
			],
			content: {
				pendingRecipes: 12,
				pendingArticles: 5,
				reportedContent: 3,
				moderationQueue: 8,
			},
			financials: {
				revenue: {
					monthly: 48200,
					quarterly: 142500,
					yearly: 525000,
				},
				subscriptions: {
					active: 1847,
					newThisMonth: 156,
					churnRate: "2.3%",
				},
				payouts: [
					{
						recipient: "Dr. Sharma",
						amount: 1250,
						date: "2024-01-20",
						status: "completed",
					},
					{
						recipient: "Ayurveda Center",
						amount: 890,
						date: "2024-01-19",
						status: "pending",
					},
					{
						recipient: "Dr. Kumar",
						amount: 2100,
						date: "2024-01-18",
						status: "completed",
					},
				],
				growth: {
					monthly: 12,
					quarterly: 8,
					yearly: 28,
				},
			},
			systemHealth: {
				uptime: 99.98,
				responseTime: 124,
				activeSessions: 289,
				errorRate: 0.02,
				serverLoad: 65,
				databaseStatus: "connected",
			},
			recentActivity: [
				{
					icon: "👤",
					message: "New user registration: Sarah Wilson",
					time: "2 mins ago",
					severity: "info",
				},
				{
					icon: "⚠️",
					message: "High server load detected",
					time: "15 mins ago",
					severity: "warning",
				},
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
				},
				{
					icon: "🚨",
					message: "Failed login attempt from unknown IP",
					time: "3 hours ago",
					severity: "error",
				},
			],
		};
	},
};