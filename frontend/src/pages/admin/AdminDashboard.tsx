// Admin Dashboard - Overview with stats and quick actions
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

interface DashboardStats {
    news: number;
    tenders: number;
    careers: number;
    messages: number;
    projects: number;
    board: number;
}

interface RecentItem {
    id: number;
    title: string;
    type: string;
    date: string;
    status?: string;
}

function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        news: 0, tenders: 0, careers: 0, messages: 0, projects: 0, board: 0
    });
    const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch stats from various endpoints
            const [newsRes, tendersRes, careersRes] = await Promise.all([
                fetch(`${API_URL}/news/`),
                fetch(`${API_URL}/tenders/`),
                fetch(`${API_URL}/careers/`),
            ]);

            const newsData = await newsRes.json();
            const tendersData = await tendersRes.json();
            const careersData = await careersRes.json();

            setStats({
                news: newsData.count || newsData.results?.length || newsData.length || 0,
                tenders: tendersData.count || tendersData.results?.length || tendersData.length || 0,
                careers: careersData.count || careersData.results?.length || careersData.length || 0,
                messages: 0,
                projects: 4,
                board: 6,
            });

            // Create recent items from fetched data
            const news = newsData.results || newsData || [];
            const recent: RecentItem[] = news.slice(0, 5).map((item: any) => ({
                id: item.id,
                title: item.title,
                type: 'News',
                date: new Date(item.created_at).toLocaleDateString(),
                status: item.is_featured ? 'Featured' : 'Published',
            }));
            setRecentItems(recent);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { label: 'News Articles', value: stats.news, icon: '📰', color: 'blue', path: '/admin/news' },
        { label: 'Active Tenders', value: stats.tenders, icon: '📋', color: 'green', path: '/admin/tenders' },
        { label: 'Job Postings', value: stats.careers, icon: '💼', color: 'yellow', path: '/admin/careers' },
        { label: 'Projects', value: stats.projects, icon: '🏭', color: 'purple', path: '/admin/projects' },
    ];

    const quickActions = [
        { label: 'Add News Article', icon: '📰', path: '/admin/news', action: 'add' },
        { label: 'Post New Tender', icon: '📋', path: '/admin/tenders', action: 'add' },
        { label: 'Add Job Opening', icon: '💼', path: '/admin/careers', action: 'add' },
        { label: 'View Messages', icon: '✉️', path: '/admin/messages', action: 'view' },
    ];

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading dashboard...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Stats Grid */}
            <div className="admin-stats-grid">
                {statCards.map((stat) => (
                    <Link to={stat.path} key={stat.label} className="admin-stat-card">
                        <div className="admin-stat-header">
                            <div className={`admin-stat-icon ${stat.color}`}>{stat.icon}</div>
                            <span className="admin-stat-trend up">↑ Active</span>
                        </div>
                        <div className="admin-stat-value">{stat.value}</div>
                        <div className="admin-stat-label">{stat.label}</div>
                    </Link>
                ))}
            </div>

            {/* Two Column Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Recent Activity */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2 className="admin-card-title">Recent Activity</h2>
                        <Link to="/admin/news" className="admin-btn admin-btn-secondary admin-btn-sm">
                            View All
                        </Link>
                    </div>
                    <div className="admin-table-wrapper">
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Type</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentItems.length > 0 ? (
                                    recentItems.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ fontWeight: 500 }}>{item.title}</td>
                                            <td>
                                                <span className="admin-badge info">{item.type}</span>
                                            </td>
                                            <td style={{ color: '#64748b' }}>{item.date}</td>
                                            <td>
                                                <span className={`admin-badge ${item.status === 'Featured' ? 'warning' : 'success'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', color: '#64748b', padding: '32px' }}>
                                            No recent activity
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2 className="admin-card-title">Quick Actions</h2>
                    </div>
                    <div style={{ padding: '16px' }}>
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                to={action.path}
                                className="admin-btn admin-btn-secondary"
                                style={{
                                    width: '100%',
                                    marginBottom: '12px',
                                    justifyContent: 'flex-start'
                                }}
                            >
                                <span style={{ fontSize: '18px' }}>{action.icon}</span>
                                {action.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
