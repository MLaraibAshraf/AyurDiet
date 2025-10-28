// Lists/exploreitems.js
import prakriti from "../Components/Explore/imgs/prakriti.jpg";
import dietplan from "../Components/Explore/imgs/dietplan.jpg";
import clientprofile from "../Components/Explore/imgs/clientprofile.jpg";
import nutrient from "../Components/Explore/imgs/nutrient.jpg";
import herbs from "../Components/Explore/imgs/herbs.jpg";
import reminder from "../Components/Explore/imgs/reminder.jpg";
import dashboard from "../Components/Explore/imgs/dashboard.jpg";
import appointment from "../Components/Explore/imgs/appointment.jpg";
import allergy from "../Components/Explore/imgs/allergy.jpg";
import securedata from "../Components/Explore/imgs/securedata.jpg";
import seasonal from "../Components/Explore/imgs/seasonal.jpg";
import recipe from "../Components/Explore/imgs/recipe.jpg";
import chat from "../Components/Explore/imgs/chat.jpg";


export const exploreItems = [
	{
		title: "Prakriti & Dosha Assessment Tool",
		desc: "Detailed intake questionnaire and pattern‑analysis to determine an individual’s prakriti (constitution) and current imbalance (vikriti). Use this baseline to personalize diet, lifestyle, and herbal support.",
		img: prakriti,
	},
	{
		title: "Dynamic Diet Plan Generator",
		desc: "Generate diet plans that adapt to client metrics (weight, age, health conditions), Ayurvedic properties (rasa, guna, virya), seasonal changes, and macro‑/micro‑nutrient balance.",
		img: dietplan,
	},
	{
		title: "Client Profile & Case Notes",
		desc: "Maintain full client profiles with medical history, allergies, previous changes in dosha, hepatic/digestive markers, and ongoing case notes or herb & supplement prescriptions.",
		img: clientprofile,
	},
	{
		title: "Nutrient Analysis & Reporting",
		desc: "Detailed macro‑ and micro‑nutrient breakdowns for individual meals or full day intakes. Compare against Ayurvedic dietary standards plus modern RDAs. Generate PDF reports & share with clients.",
		img: nutrient,
	},
	{
		title: "Herbs & Food Database with Ayurvedic Tags",
		desc: "Search thousands of foods and herbs. Each entry includes rasa (taste), guna (quality), virya (energy), vipaka (post‑digestive effect), and nutritional content. Also includes food compatibility & custom tags.",
		img: herbs,
	},
	{
		title: "Meal Logging & Reminders",
		desc: "Clients log meals with optional photo/camera input. Get automated reminders based on dinacharya (daily cycles) or meal schedules tied to dosha balance. Track adherence & patterns.",
		img: reminder,
	},
	{
		title: "Trend Dashboards & Visualizations",
		desc: "Track changes in client weight, digestion markers, nutrient deficiencies, and dosha imbalance over time via interactive graphs. Use trends to adjust plans dynamically.",
		img: dashboard,
	},
	{
		title: "Appointment & Practice Management",
		desc: "Manage client sessions, schedule follow‑ups, record prescriptions and herbal formulations. Cloud sync ensures access across devices for clinic or remote consulting.",
		img: appointment,
	},
	{
		title: "Food Sensitivity & Allergen Filtering",
		desc: "Enable clients to declare allergens, intolerances, or preferences (e.g. gluten, dairy, nightshades). Plans & recipe suggestions adapt to avoid triggers and support gut health.",
		img: allergy,
	},
	{
		title: "Seasonal Adjustments",
		desc: "Automatically adjust diet recommendations based on season (ritu) and region. Suggest seasonal produce, herbs & food combinations that align with Ayurveda’s climatic wisdom.",
		img: seasonal,
	},
	{
		title: "Secure Data, Privacy & User Roles",
		desc: "All client data encrypted at rest & in transit. Support role‑based access (dietitians, assistants, clients). Audit logs, backup & compliance with privacy standards.",
		img: securedata,
	},
	{
		title: "Recipe & Formulation Analyzer",
		desc: "Input custom recipes or herbal formulations and get detailed analysis of nutritional values + Ayurvedic properties. Useful for creating clients’ unique dishes or herbal blends.",
		img: recipe,
	},
	{
		title: "Live Consultation & Chat Module",
		desc: "Secure messaging between practitioner and client. Share images, progress photos, and recommendations. Optional video consult with in‑platform scheduling.",
		img: chat,
	},
];
