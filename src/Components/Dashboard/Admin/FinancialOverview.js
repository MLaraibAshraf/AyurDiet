import React from "react";
import "./AdminComponent.css";

const FinancialOverview = ({ financials, className = "" }) => {
	const { revenue, subscriptions, payouts, growth } = financials;

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0,
		}).format(amount);
	};

	const formatPercent = (value) => {
		return `${value > 0 ? "+" : ""}${value}%`;
	};

	return (
		<div className={`financial-overview ${className}`}>
			<div className="financial-header">
				<h3>Financial Overview</h3>
				<div className="time-filter">
					<select className="filter-select">
						<option value="monthly">This Month</option>
						<option value="quarterly">This Quarter</option>
						<option value="yearly">This Year</option>
					</select>
				</div>
			</div>

			<div className="revenue-section">
				<h4>Revenue</h4>
				<div className="revenue-cards">
					<div className="revenue-card">
						<div className="revenue-label">Monthly</div>
						<div className="revenue-amount">
							{formatCurrency(revenue.monthly)}
						</div>
						<div
							className={`revenue-change ${
								growth.monthly >= 0 ? "positive" : "negative"
							}`}
						>
							{formatPercent(growth.monthly)}
						</div>
					</div>

					<div className="revenue-card">
						<div className="revenue-label">Quarterly</div>
						<div className="revenue-amount">
							{formatCurrency(revenue.quarterly)}
						</div>
						<div
							className={`revenue-change ${
								growth.quarterly >= 0 ? "positive" : "negative"
							}`}
						>
							{formatPercent(growth.quarterly)}
						</div>
					</div>

					<div className="revenue-card">
						<div className="revenue-label">Yearly</div>
						<div className="revenue-amount">
							{formatCurrency(revenue.yearly)}
						</div>
						<div
							className={`revenue-change ${
								growth.yearly >= 0 ? "positive" : "negative"
							}`}
						>
							{formatPercent(growth.yearly)}
						</div>
					</div>
				</div>
			</div>

			<div className="subscriptions-section">
				<h4>Subscriptions</h4>
				<div className="subscription-metrics">
					<div className="metric">
						<div className="metric-value">
							{subscriptions.active.toLocaleString()}
						</div>
						<div className="metric-label">Active Subscriptions</div>
					</div>

					<div className="metric">
						<div className="metric-value">+{subscriptions.newThisMonth}</div>
						<div className="metric-label">New This Month</div>
					</div>

					<div className="metric">
						<div className="metric-value">{subscriptions.churnRate}</div>
						<div className="metric-label">Churn Rate</div>
					</div>
				</div>
			</div>

			<div className="payouts-section">
				<h4>Recent Payouts</h4>
				<div className="payouts-list">
					{payouts.map((payout, index) => (
						<div key={index} className="payout-item">
							<div className="payout-info">
								<div className="payout-recipient">{payout.recipient}</div>
								<div className="payout-date">{payout.date}</div>
							</div>
							<div className="payout-amount">
								{formatCurrency(payout.amount)}
							</div>
							<div className={`payout-status ${payout.status}`}>
								{payout.status}
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="financial-actions">
				<button className="btn-secondary">Download Report</button>
				<button className="btn-primary">Generate Invoice</button>
			</div>
		</div>
	);
};

export default FinancialOverview;
