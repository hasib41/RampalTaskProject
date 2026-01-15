// Admin Applications - View job applications
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface Application {
    id: number;
    career: number;
    career_title: string;
    name: string;
    email: string;
    phone: string;
    cover_letter: string;
    resume_url: string;
    experience_years: number;
    current_position: string;
    is_reviewed: boolean;
    created_at: string;
}

function AdminApplications() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [filter, setFilter] = useState<'all' | 'pending' | 'reviewed'>('all');

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await fetch(`${API_URL}/applications/`);
                const data = await res.json();
                const appsData = data.results || data || [];
                setApplications(appsData);
            } catch (error) {
                console.error('Error fetching applications:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchApplications();
    }, []);

    const markAsReviewed = async (id: number) => {
        try {
            await fetch(`${API_URL}/applications/${id}/mark_reviewed/`, { method: 'POST' });
            setApplications(applications.map(a =>
                a.id === id ? { ...a, is_reviewed: true } : a
            ));
            if (selectedApp?.id === id) {
                setSelectedApp({ ...selectedApp, is_reviewed: true });
            }
        } catch (error) {
            console.error('Error marking application as reviewed:', error);
        }
    };

    const deleteApplication = async (id: number) => {
        if (confirm('Are you sure you want to delete this application?')) {
            try {
                await fetch(`${API_URL}/applications/${id}/`, { method: 'DELETE' });
                setApplications(applications.filter(a => a.id !== id));
                if (selectedApp?.id === id) setSelectedApp(null);
            } catch (error) {
                console.error('Error deleting application:', error);
            }
        }
    };

    const filteredApps = applications.filter(a => {
        if (filter === 'pending') return !a.is_reviewed;
        if (filter === 'reviewed') return a.is_reviewed;
        return true;
    });

    const pendingCount = applications.filter(a => !a.is_reviewed).length;

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading applications...</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selectedApp ? '1fr 1fr' : '1fr', gap: '24px' }}>
            {/* Applications List */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">
                        Applications ({filteredApps.length})
                        {pendingCount > 0 && (
                            <span className="admin-badge warning" style={{ marginLeft: '8px' }}>
                                {pendingCount} pending
                            </span>
                        )}
                    </h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {(['all', 'pending', 'reviewed'] as const).map((f) => (
                            <button
                                key={f}
                                className={`admin-btn admin-btn-sm ${filter === f ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
                                onClick={() => setFilter(f)}
                            >
                                {f.charAt(0).toUpperCase() + f.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {filteredApps.length > 0 ? (
                        filteredApps.map((app) => (
                            <div
                                key={app.id}
                                onClick={() => setSelectedApp(app)}
                                style={{
                                    padding: '16px 24px',
                                    borderBottom: '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    background: selectedApp?.id === app.id ? '#f1f5f9' : (!app.is_reviewed ? '#fefce8' : 'white'),
                                    transition: 'background 0.2s',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {!app.is_reviewed && <span style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }} />}
                                        {app.name}
                                    </strong>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                                        {new Date(app.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px', color: '#1e3a5f' }}>
                                    💼 {app.career_title}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b', display: 'flex', gap: '16px' }}>
                                    <span>📧 {app.email}</span>
                                    <span>📅 {app.experience_years} yrs exp</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="admin-empty" style={{ padding: '48px' }}>
                            <div className="admin-empty-icon">📋</div>
                            <div className="admin-empty-title">No applications</div>
                            <div className="admin-empty-text">Applications will appear here when candidates apply for jobs.</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Application Detail */}
            {selectedApp && (
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2 className="admin-card-title">Application Details</h2>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {!selectedApp.is_reviewed && (
                                <button
                                    className="admin-btn admin-btn-success admin-btn-sm"
                                    onClick={() => markAsReviewed(selectedApp.id)}
                                >
                                    ✓ Mark Reviewed
                                </button>
                            )}
                            <button
                                className="admin-btn admin-btn-danger admin-btn-sm"
                                onClick={() => deleteApplication(selectedApp.id)}
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                    <div style={{ padding: '24px' }}>
                        {/* Status Badge */}
                        <div style={{ marginBottom: '24px' }}>
                            <span
                                className={`admin-badge ${selectedApp.is_reviewed ? 'success' : 'warning'}`}
                                style={{ fontSize: '12px' }}
                            >
                                {selectedApp.is_reviewed ? '✓ Reviewed' : '⏳ Pending Review'}
                            </span>
                        </div>

                        {/* Applicant Info */}
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Applicant</div>
                            <div style={{ fontSize: '20px', fontWeight: 600 }}>{selectedApp.name}</div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Email</div>
                                <a href={`mailto:${selectedApp.email}`} style={{ color: '#2563eb' }}>{selectedApp.email}</a>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Phone</div>
                                <a href={`tel:${selectedApp.phone}`} style={{ color: '#2563eb' }}>{selectedApp.phone}</a>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Applied For</div>
                                <div style={{ fontWeight: 600, color: '#1e3a5f' }}>{selectedApp.career_title}</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Experience</div>
                                <span>{selectedApp.experience_years} years</span>
                            </div>
                        </div>

                        {selectedApp.current_position && (
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Current Position</div>
                                <div>{selectedApp.current_position}</div>
                            </div>
                        )}

                        {selectedApp.resume_url && (
                            <div style={{ marginBottom: '24px' }}>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Resume/CV</div>
                                <a
                                    href={selectedApp.resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                >
                                    📄 View Resume
                                </a>
                            </div>
                        )}

                        {selectedApp.cover_letter && (
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Cover Letter</div>
                                <div style={{
                                    background: '#f8fafc',
                                    padding: '16px',
                                    borderRadius: '8px',
                                    lineHeight: 1.6,
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {selectedApp.cover_letter}
                                </div>
                            </div>
                        )}

                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                            <a
                                href={`mailto:${selectedApp.email}?subject=Re: Your application for ${selectedApp.career_title}`}
                                className="admin-btn admin-btn-primary"
                            >
                                ✉️ Reply via Email
                            </a>
                            <a
                                href={`tel:${selectedApp.phone}`}
                                className="admin-btn admin-btn-secondary"
                            >
                                📞 Call Applicant
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminApplications;
