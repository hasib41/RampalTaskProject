// Admin Layout - Shell with sidebar navigation
import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet, Navigate } from 'react-router-dom';
import './admin.css';

// Navigation items
const NAV_ITEMS = [
    { path: '/admin', label: 'Dashboard', icon: '📊', exact: true },
    { path: '/admin/news', label: 'News Articles', icon: '📰' },
    { path: '/admin/tenders', label: 'Tenders', icon: '📋' },
    { path: '/admin/careers', label: 'Job Postings', icon: '💼' },
    { path: '/admin/applications', label: 'Applications', icon: '📄', badge: true },
    { path: '/admin/projects', label: 'Projects', icon: '🏭' },
    { path: '/admin/messages', label: 'Messages', icon: '✉️', badge: true },
    { path: '/admin/board', label: 'Board Members', icon: '👥' },
    { path: '/admin/sustainability', label: 'Sustainability', icon: '🌱' },
];

function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState(0);

    // Check if logged in - use Navigate component for redirect
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    const handleLogout = () => {
        sessionStorage.removeItem('adminLoggedIn');
        navigate('/admin/login');
    };


    const isActive = (path: string, exact?: boolean) => {
        if (exact) return location.pathname === path;
        return location.pathname.startsWith(path);
    };

    // Get page title from current path
    const getPageTitle = () => {
        const item = NAV_ITEMS.find(item =>
            item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
        );
        return item?.label || 'Admin Panel';
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="admin-sidebar-header">
                    <Link to="/admin" className="admin-logo">
                        <span className="admin-logo-icon">⚡</span>
                        <span className="admin-logo-text">BIFPCL</span>
                        <span className="admin-logo-badge">Admin</span>
                    </Link>
                </div>

                <nav className="admin-nav">
                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Main Menu</div>
                        {NAV_ITEMS.slice(0, 5).map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive(item.path, item.exact) ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.badge && unreadMessages > 0 && (
                                    <span className="admin-nav-badge">{unreadMessages}</span>
                                )}
                            </Link>
                        ))}
                    </div>

                    <div className="admin-nav-section">
                        <div className="admin-nav-title">Content</div>
                        {NAV_ITEMS.slice(5).map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`admin-nav-item ${isActive(item.path) ? 'active' : ''}`}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                {item.label}
                                {item.badge && unreadMessages > 0 && (
                                    <span className="admin-nav-badge">{unreadMessages}</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </nav>

                <div className="admin-sidebar-footer">
                    <div className="admin-user">
                        <div className="admin-user-avatar">A</div>
                        <div className="admin-user-info">
                            <div className="admin-user-name">Admin</div>
                            <div className="admin-user-role">Administrator</div>
                        </div>
                        <button className="admin-logout" onClick={handleLogout} title="Logout">
                            🚪
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <button
                        className="admin-btn-icon mobile-menu-btn"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        style={{ display: 'none' }}
                    >
                        ☰
                    </button>
                    <h1 className="admin-header-title">{getPageTitle()}</h1>
                    <div className="admin-header-actions">
                        <Link to="/" className="admin-btn admin-btn-secondary" target="_blank">
                            🌐 View Site
                        </Link>
                    </div>
                </header>

                <div className="admin-content">
                    <Outlet context={{ setUnreadMessages }} />
                </div>
            </main>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 99,
                        display: 'none'
                    }}
                />
            )}
        </div>
    );
}

export default AdminLayout;
