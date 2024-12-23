import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Sidebar Section */}
            <aside className="sidebar">
                <div className="profile-section">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Profile"
                        className="profile-pic"
                    />
                    <h3>Admin</h3>
                    <p className="status">Online</p>
                </div>
                <ul className="nav-links">
                    <li>Dashboard</li>
                    <li>Payment</li>
                    <li>Users</li>
                    <li>Tables</li>
                    <li>Apps</li>
                    <li>Pricing Tables</li>
                    <li>Contact</li>
                    <li>Additional Pages</li>
                    <li>Map</li>
                    <li>Charts</li>
                    <li>Settings</li>
                </ul>
            </aside>

            {/* Main Content Section */}
            <main className="main-content">
                {/* Header Section */}
                <header className="header">
                    <h1>Travel app</h1>
                    <div className="header-right">
                        <div className="notifications">
                            <span>🔔</span>
                            <span className="badge">2</span>
                        </div>
                        <div className="profile-header">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="profile-pic-small"
                            />
                            <span>Admin</span>
                        </div>
                    </div>
                </header>

                {/* Dashboard Metrics Section */}
                <section className="dashboard-metrics">
                    <div className="card">
                        <p>2500</p>
                        <h4>Bokkings</h4>
                    </div>
                    <div className="card">
                        <p>123.50</p>
                        <h4>Average hours</h4>
                    </div>
                    <div className="card">
                        <p>1,805</p>
                        <h4>packs</h4>
                    </div>
                    <div className="card">
                        <p>54</p>
                        <h4>hotels</h4>
                    </div>
                </section>


            </main>
        </div>
    );
};

export default Dashboard;