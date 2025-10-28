import React, { useState, useEffect } from "react";
import "./Solution.css";

const Solution = () => {
	const [activeModule, setActiveModule] = useState(null);
	const [connections, setConnections] = useState([]);

	const modules = [
		{ id: "clients", icon: "👥", label: "Clients", position: "module-clients" },
		{ id: "diet", icon: "🍛", label: "Diet Plans", position: "module-diet" },
		{
			id: "analytics",
			icon: "📈",
			label: "Analytics",
			position: "module-analytics",
		},
		{ id: "herbs", icon: "🌿", label: "Herb DB", position: "module-herbs" },
		{
			id: "nutrients",
			icon: "🧪",
			label: "Nutrients",
			position: "module-nutrients",
		},
		{
			id: "scheduling",
			icon: "📅",
			label: "Scheduling",
			position: "module-scheduling",
		},
		{ id: "reports", icon: "📊", label: "Reports", position: "module-reports" },
		{
			id: "communication",
			icon: "💬",
			label: "Messages",
			position: "module-communication",
		},
	];

	useEffect(() => {
		const generateConnections = () => {
			const newConnections = [];
			modules.forEach((module, i) => {
				modules.forEach((otherModule, j) => {
					if (i < j) {
						newConnections.push({
							from: module.position,
							to: otherModule.position,
							id: `${module.id}-${otherModule.id}`,
						});
					}
				});
			});
			setConnections(newConnections);
		};

		generateConnections();
	}, []);

	useEffect(() => {
		if (!activeModule) return;

		const animateDataStream = () => {
			const activeModuleEl = document.querySelector(`.${activeModule}`);
			if (!activeModuleEl) return;

			modules.forEach((module) => {
				if (module.position !== activeModule) {
					createStream(activeModule, module.position);
				}
			});
		};

		const interval = setInterval(animateDataStream, 1000);
		return () => clearInterval(interval);
	}, [activeModule]);

	const createStream = (fromPosition, toPosition) => {
		const fromEl = document.querySelector(`.${fromPosition}`);
		const toEl = document.querySelector(`.${toPosition}`);
		const visualEl = document.querySelector(".integration-visual");

		if (!fromEl || !toEl || !visualEl) return;

		const fromRect = fromEl.getBoundingClientRect();
		const toRect = toEl.getBoundingClientRect();
		const visualRect = visualEl.getBoundingClientRect();

		const startX = fromRect.left + fromRect.width / 2 - visualRect.left;
		const startY = fromRect.top + fromRect.height / 2 - visualRect.top;
		const endX = toRect.left + toRect.width / 2 - visualRect.left;
		const endY = toRect.top + toRect.height / 2 - visualRect.top;

		const streamParticle = document.createElement("div");
		streamParticle.className = "stream-particle";
		streamParticle.style.left = `${startX}px`;
		streamParticle.style.top = `${startY}px`;
		streamParticle.style.setProperty(
			"--stream-end",
			`translate(${endX - startX}px, ${endY - startY}px)`
		);

		visualEl.appendChild(streamParticle);

		setTimeout(() => {
			if (streamParticle.parentNode) {
				streamParticle.remove();
			}
		}, 2000);
	};

	const handleModuleInteraction = (modulePosition) => {
		setActiveModule(activeModule === modulePosition ? null : modulePosition);
	};

	return (
		<section className="section solution-section">
			<div className="solution-bg">
				<div className="bg-orb"></div>
				<div className="bg-orb"></div>
				<div className="bg-orb"></div>
			</div>

			<div className="container">
				<div className="solution-content">
					<div className="solution-text">
						<h2 className="section-title">
							<strong>Everything Connected.</strong>
							<br />
							Perfectly Integrated.
						</h2>
						<p className="solution-description">
							Every component of your practice works together seamlessly. Client
							data flows to diet plans, herb databases inform recommendations,
							and analytics drive better outcomes—all in one unified platform.
						</p>
						<a href="#trial" className="btn-explore">
							Explore Integration
							<span></span>
						</a>
					</div>
					<div className="solution-visual">
						<div className="integration-visual">
							{/* Central Hub */}
							<div
								className="hub-core"
								onMouseEnter={() => setActiveModule(null)}
								onClick={() => setActiveModule(null)}
							>
								<div className="hub-icon">⚡</div>
							</div>

							{/* Connection System with Gradient */}
							<svg
								className="connection-system"
								width="400"
								height="400"
								viewBox="0 0 400 400"
							>
								<defs>
									<linearGradient
										id="connectionGradient"
										x1="0%"
										y1="0%"
										x2="100%"
										y2="100%"
									>
										<stop offset="0%" stopColor="#2d5a27" stopOpacity="0.6" />
										<stop offset="50%" stopColor="#4a7c59" stopOpacity="0.8" />
										<stop offset="100%" stopColor="#67b26f" stopOpacity="0.6" />
									</linearGradient>
								</defs>
								{connections.map((conn) => (
									<line
										key={conn.id}
										className="connection-beam"
										x1={getModuleCoordinates(conn.from).x}
										y1={getModuleCoordinates(conn.from).y}
										x2={getModuleCoordinates(conn.to).x}
										y2={getModuleCoordinates(conn.to).y}
									/>
								))}
							</svg>

							{/* Module Nodes */}
							{modules.map((module, index) => (
								<div
									key={module.id}
									className={`module-node ${module.position} ${
										activeModule === module.position ? "active" : ""
									}`}
									onMouseEnter={() => handleModuleInteraction(module.position)}
									onClick={() => handleModuleInteraction(module.position)}
								>
									<div className="node-icon">{module.icon}</div>
									<div className="node-label">{module.label}</div>
								</div>
							))}

							{/* Interactive Status */}
							<div className="interactive-status">
								{activeModule
									? "Data streaming between modules..."
									: "Hover over any module to see connections"}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const getModuleCoordinates = (position) => {
	const coords = {
		"module-clients": { x: 100, y: 100 },
		"module-diet": { x: 300, y: 100 },
		"module-analytics": { x: 300, y: 300 },
		"module-herbs": { x: 100, y: 300 },
		"module-nutrients": { x: 200, y: 50 },
		"module-scheduling": { x: 350, y: 200 },
		"module-reports": { x: 200, y: 350 },
		"module-communication": { x: 50, y: 200 },
	};
	return coords[position] || { x: 200, y: 200 };
};

export default Solution;
