import React, { useState } from "react";
import "./AdminComponent.css";

const ContentManagement = ({ content, className = "" }) => {
	const [activeTab, setActiveTab] = useState("recipes");

	const { pendingRecipes, pendingArticles, reportedContent, moderationQueue } =
		content;

	const tabs = [
		{ id: "recipes", label: "Recipes", count: pendingRecipes },
		{ id: "articles", label: "Articles", count: pendingArticles },
		{ id: "reported", label: "Reported", count: reportedContent },
		{ id: "queue", label: "Moderation Queue", count: moderationQueue },
	];

	const renderContent = () => {
		switch (activeTab) {
			case "recipes":
				return (
					<div className="content-list">
						{[...Array(pendingRecipes)].map((_, index) => (
							<div key={index} className="content-item">
								<div className="content-preview">
									<div className="content-image"></div>
									<div className="content-details">
										<h4>Ayurvedic Detox Smoothie #{index + 1}</h4>
										<p>Submitted by User {index + 1}</p>
										<span className="content-meta">2 days ago</span>
									</div>
								</div>
								<div className="content-actions">
									<button className="btn-success btn-sm">Approve</button>
									<button className="btn-error btn-sm">Reject</button>
									<button className="btn-secondary btn-sm">Preview</button>
								</div>
							</div>
						))}
					</div>
				);

			case "articles":
				return (
					<div className="content-list">
						{[...Array(pendingArticles)].map((_, index) => (
							<div key={index} className="content-item">
								<div className="content-preview">
									<div className="content-details">
										<h4>
											Understanding Dosha Balance in Modern Life #{index + 1}
										</h4>
										<p>By Dr. Ayurveda Expert</p>
										<span className="content-meta">1 day ago</span>
									</div>
								</div>
								<div className="content-actions">
									<button className="btn-success btn-sm">Approve</button>
									<button className="btn-error btn-sm">Reject</button>
									<button className="btn-secondary btn-sm">Preview</button>
								</div>
							</div>
						))}
					</div>
				);

			default:
				return (
					<div className="empty-state">
						<div className="empty-icon">📝</div>
						<h4>No content pending</h4>
						<p>All content has been moderated and approved.</p>
					</div>
				);
		}
	};

	return (
		<div className={`content-management ${className}`}>
			<div className="content-header">
				<h3>Content Management</h3>
				<div className="content-stats">
					<div className="stat-item">
						<span className="stat-number">
							{pendingRecipes + pendingArticles}
						</span>
						<span className="stat-label">Pending Review</span>
					</div>
					<div className="stat-item">
						<span className="stat-number">{reportedContent}</span>
						<span className="stat-label">Reported</span>
					</div>
				</div>
			</div>

			<div className="content-tabs">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.label}
						{tab.count > 0 && <span className="tab-badge">{tab.count}</span>}
					</button>
				))}
			</div>

			<div className="content-body">{renderContent()}</div>

			<div className="content-footer">
				<button className="btn-text">Content Guidelines</button>
				<button className="btn-primary">Bulk Actions</button>
			</div>
		</div>
	);
};

export default ContentManagement;
