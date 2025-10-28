import { supabase } from '../config/supabase';

export const clientService = {
	async getDashboardData(userId) {
		const [
			statsData,
			healthData,
			currentPlan,
			progressData,
			appointments,
			foodLogs
		] = await Promise.all([
			this.getClientStats(userId),
			this.getHealthData(userId),
			this.getCurrentDietPlan(userId),
			this.getProgressData(userId),
			this.getAppointments(userId),
			this.getRecentFoodLogs(userId)
		]);

		return {
			stats: statsData,
			healthData,
			currentPlan,
			progress: progressData,
			appointments,
			recentFoodLogs: foodLogs
		};
	},

	async getClientStats(userId) {
		const { data: plans } = await supabase
			.from('diet_plans')
			.select('*')
			.eq('client_id', userId)
			.eq('status', 'active');

		const activePlanCount = plans?.length || 0;
		const avgProgress = plans?.length
			? Math.round(plans.reduce((sum, p) => sum + p.progress_percentage, 0) / plans.length)
			: 0;

		return [
			{
				title: "Wellness Score",
				value: `${avgProgress}%`,
				change: "+5%",
				trend: "up",
				icon: "⭐",
			},
			{
				title: "Plan Adherence",
				value: `${Math.min(avgProgress + 10, 100)}%`,
				change: "+3%",
				trend: "up",
				icon: "📊",
			},
			{
				title: "Weekly Progress",
				value: `${Math.max(avgProgress - 10, 0)}%`,
				change: "+8%",
				trend: "up",
				icon: "📈",
			},
			{
				title: "Active Plans",
				value: activePlanCount.toString(),
				change: "current",
				trend: "up",
				icon: "🎯",
			},
		];
	},

	async getHealthData(userId) {
		const { data: clientProfile } = await supabase
			.from('client_profiles')
			.select('*')
			.eq('id', userId)
			.maybeSingle();

		const { data: nextAppointment } = await supabase
			.from('appointments')
			.select('appointment_date')
			.eq('client_id', userId)
			.gte('appointment_date', new Date().toISOString().split('T')[0])
			.order('appointment_date', { ascending: true })
			.limit(1)
			.maybeSingle();

		return {
			doshaType: clientProfile?.dosha_type || "Not assessed",
			imbalances: clientProfile?.health_goals || [],
			lastCheckup: clientProfile?.updated_at?.split('T')[0] || "N/A",
			nextAppointment: nextAppointment?.appointment_date || "Not scheduled",
		};
	},

	async getCurrentDietPlan(userId) {
		const { data: plan } = await supabase
			.from('diet_plans')
			.select('*, dietitian:dietitian_id(name)')
			.eq('client_id', userId)
			.eq('status', 'active')
			.order('created_at', { ascending: false })
			.limit(1)
			.maybeSingle();

		if (!plan) {
			return null;
		}

		return {
			id: plan.id,
			name: plan.name,
			duration: `${plan.duration_days} days`,
			progress: plan.progress_percentage,
			meals: plan.meals || {},
			recommendations: plan.recommendations || {},
		};
	},

	async getProgressData(userId) {
		const { data: latestMetric } = await supabase
			.from('health_metrics')
			.select('*')
			.eq('client_id', userId)
			.order('recorded_at', { ascending: false })
			.limit(1)
			.maybeSingle();

		const { data: clientProfile } = await supabase
			.from('client_profiles')
			.select('target_weight')
			.eq('id', userId)
			.maybeSingle();

		return {
			weight: {
				current: latestMetric?.weight || 0,
				target: clientProfile?.target_weight || 0,
				unit: "kg"
			},
			energy: {
				current: latestMetric?.energy_level || 0,
				target: 9,
				unit: "/10"
			},
			sleep: {
				current: latestMetric?.sleep_hours || 0,
				target: 8,
				unit: "hours"
			},
			symptoms: latestMetric?.symptoms || [],
		};
	},

	async getAppointments(userId) {
		const { data: appointments } = await supabase
			.from('appointments')
			.select('*, dietitian:dietitian_id(name)')
			.eq('client_id', userId)
			.gte('appointment_date', new Date().toISOString().split('T')[0])
			.order('appointment_date', { ascending: true })
			.limit(5);

		return (appointments || []).map(apt => ({
			id: apt.id,
			date: apt.appointment_date,
			time: apt.appointment_time,
			type: apt.type,
			dietitian: apt.dietitian?.name || 'Unknown',
			status: apt.status
		}));
	},

	async getRecentFoodLogs(userId) {
		const { data: logs } = await supabase
			.from('food_logs')
			.select('*')
			.eq('client_id', userId)
			.order('meal_time', { ascending: false })
			.limit(5);

		return (logs || []).map(log => ({
			id: log.id,
			meal: log.meal_type,
			food: log.food_items,
			time: new Date(log.meal_time).toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit',
				hour12: true
			}),
			rating: log.rating,
		}));
	}
};
