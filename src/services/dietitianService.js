import { supabase } from '../config/supabase';

export const dietitianService = {
	async getDashboardData(dietitianId) {
		const [
			stats,
			practiceOverview,
			clients,
			appointments,
			activePlans,
			analytics
		] = await Promise.all([
			this.getDietitianStats(dietitianId),
			this.getPracticeOverview(dietitianId),
			this.getClients(dietitianId),
			this.getTodayAppointments(dietitianId),
			this.getActivePlans(dietitianId),
			this.getAnalytics(dietitianId)
		]);

		return {
			stats,
			practiceOverview,
			clients,
			appointments,
			activePlans,
			analytics
		};
	},

	async getDietitianStats(dietitianId) {
		const { count: totalClients } = await supabase
			.from('diet_plans')
			.select('client_id', { count: 'exact', head: true })
			.eq('dietitian_id', dietitianId);

		const { count: activePlans } = await supabase
			.from('diet_plans')
			.select('*', { count: 'exact', head: true })
			.eq('dietitian_id', dietitianId)
			.eq('status', 'active');

		const { data: profile } = await supabase
			.from('dietitian_profiles')
			.select('rating, total_reviews')
			.eq('id', dietitianId)
			.maybeSingle();

		return [
			{
				title: "Total Clients",
				value: (totalClients || 0).toString(),
				change: "+3",
				trend: "up",
				icon: "👥",
			},
			{
				title: "Active Plans",
				value: (activePlans || 0).toString(),
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
				value: `${profile?.rating?.toFixed(1) || '5.0'}/5`,
				change: "+0.2",
				trend: "up",
				icon: "⭐",
			},
		];
	},

	async getPracticeOverview(dietitianId) {
		const { count: todayAppointments } = await supabase
			.from('appointments')
			.select('*', { count: 'exact', head: true })
			.eq('dietitian_id', dietitianId)
			.eq('appointment_date', new Date().toISOString().split('T')[0]);

		const { count: pendingPlans } = await supabase
			.from('diet_plans')
			.select('*', { count: 'exact', head: true })
			.eq('dietitian_id', dietitianId)
			.eq('status', 'active')
			.lt('progress_percentage', 20);

		const { count: activeClients } = await supabase
			.from('diet_plans')
			.select('client_id', { count: 'exact', head: true })
			.eq('dietitian_id', dietitianId)
			.eq('status', 'active');

		return {
			message: `You have ${todayAppointments || 0} appointments today and ${pendingPlans || 0} pending diet plans.`,
			growth: "15%",
			activeClients: activeClients || 0,
			monthlySessions: 89,
		};
	},

	async getClients(dietitianId) {
		const { data: plans } = await supabase
			.from('diet_plans')
			.select('*, client:client_id(id, name)')
			.eq('dietitian_id', dietitianId)
			.eq('status', 'active')
			.order('updated_at', { ascending: false })
			.limit(10);

		const clientMap = new Map();
		plans?.forEach(plan => {
			if (plan.client && !clientMap.has(plan.client.id)) {
				clientMap.set(plan.client.id, {
					id: plan.client.id,
					name: plan.client.name,
					progress: plan.progress_percentage,
					lastSession: plan.updated_at?.split('T')[0],
					nextAppointment: "Upcoming"
				});
			}
		});

		return Array.from(clientMap.values()).slice(0, 5);
	},

	async getTodayAppointments(dietitianId) {
		const { data: appointments } = await supabase
			.from('appointments')
			.select('*, client:client_id(name)')
			.eq('dietitian_id', dietitianId)
			.eq('appointment_date', new Date().toISOString().split('T')[0])
			.order('appointment_time', { ascending: true });

		return (appointments || []).map(apt => ({
			id: apt.id,
			client: apt.client?.name || 'Unknown',
			time: apt.appointment_time,
			type: apt.type,
			status: apt.status,
		}));
	},

	async getActivePlans(dietitianId) {
		const { data: plans } = await supabase
			.from('diet_plans')
			.select('*')
			.eq('dietitian_id', dietitianId)
			.eq('status', 'active')
			.order('created_at', { ascending: false });

		const planStats = new Map();
		plans?.forEach(plan => {
			if (!planStats.has(plan.name)) {
				planStats.set(plan.name, {
					id: plan.id,
					name: plan.name,
					clients: 0,
					progress: [],
					status: 'active'
				});
			}
			const stat = planStats.get(plan.name);
			stat.clients += 1;
			stat.progress.push(plan.progress_percentage);
		});

		return Array.from(planStats.values()).map(stat => ({
			...stat,
			progress: Math.round(stat.progress.reduce((a, b) => a + b, 0) / stat.progress.length)
		})).slice(0, 5);
	},

	async getAnalytics(dietitianId) {
		return {
			clientGrowth: [65, 59, 80, 81, 56, 55, 72, 65, 78, 82, 90, 85],
			revenueTrend: [4500, 5200, 6100, 6800, 7200, 7800, 8100, 7900, 8250, 8600, 8900, 9200],
			satisfaction: [4.5, 4.6, 4.7, 4.8, 4.7, 4.8, 4.8, 4.9, 4.8, 4.8, 4.9, 4.9],
		};
	}
};
