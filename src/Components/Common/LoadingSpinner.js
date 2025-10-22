import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({
	size = "medium",
	variant = "primary",
	text = "Loading...",
	overlay = false,
	fullScreen = false,
}) => {
	const spinnerClass = `spinner spinner-${variant} spinner-${size}`;

	if (fullScreen) {
		return (
			<div className="spinner-fullscreen">
				<div className={spinnerClass}></div>
				{text && <p className="spinner-text">{text}</p>}
			</div>
		);
	}

	if (overlay) {
		return (
			<div className="spinner-overlay">
				<div className={spinnerClass}></div>
				{text && <p className="spinner-text">{text}</p>}
			</div>
		);
	}

	return (
		<div className="spinner-container">
			<div className={spinnerClass}></div>
			{text && <p className="spinner-text">{text}</p>}
		</div>
	);
};

// Additional Spinner Variants
export const CircleSpinner = ({ size = "medium", variant = "primary" }) => (
	<div
		className={`circle-spinner circle-spinner-${variant} circle-spinner-${size}`}
	></div>
);

export const DotsSpinner = ({ size = "medium", variant = "primary" }) => (
	<div className={`dots-spinner dots-spinner-${variant} dots-spinner-${size}`}>
		<div className="dot"></div>
		<div className="dot"></div>
		<div className="dot"></div>
	</div>
);

export const PulseSpinner = ({ size = "medium", variant = "primary" }) => (
	<div
		className={`pulse-spinner pulse-spinner-${variant} pulse-spinner-${size}`}
	></div>
);

export const BounceSpinner = ({ size = "medium", variant = "primary" }) => (
	<div
		className={`bounce-spinner bounce-spinner-${variant} bounce-spinner-${size}`}
	>
		<div className="bounce bounce1"></div>
		<div className="bounce bounce2"></div>
		<div className="bounce bounce3"></div>
	</div>
);

export const WaveSpinner = ({ size = "medium", variant = "primary" }) => (
	<div className={`wave-spinner wave-spinner-${variant} wave-spinner-${size}`}>
		<div className="bar"></div>
		<div className="bar"></div>
		<div className="bar"></div>
		<div className="bar"></div>
		<div className="bar"></div>
	</div>
);

export default LoadingSpinner;
