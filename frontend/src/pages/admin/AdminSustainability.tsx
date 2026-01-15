// Admin Sustainability Management
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface SustainabilityStat {
    id: number;
    label: string;
    value: string;
    trend: string;
    icon: string;
    order: number;
    is_active: boolean;
}

interface CSRInitiative {
    id: number;
    title: string;
    description: string;
    category: string;
    impact_metric: string;
    image_url: string | null;
    is_active: boolean;
}

const CATEGORIES = [
    { value: 'education', label: 'Education' },
    { value: 'health', label: 'Healthcare' },
    { value: 'environment', label: 'Environment' },
    { value: 'livelihood', label: 'Livelihood' },
    { value: 'infrastructure', label: 'Infrastructure' },
];

type EditingItem =
    | ({ type: 'stat' } & Partial<SustainabilityStat>)
    | ({ type: 'csr' } & Partial<CSRInitiative>);

function AdminSustainability() {
    const [stats, setStats] = useState<SustainabilityStat[]>([]);
    const [csr, setCSR] = useState<CSRInitiative[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'stats' | 'csr'>('stats');
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<EditingItem | null>(null);

    const [statForm, setStatForm] = useState({ label: '', value: '', trend: '', icon: '🌱', order: 1 });
    const [csrForm, setCSRForm] = useState({ title: '', description: '', category: 'education', impact_metric: '', image_url: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [statsRes, csrRes] = await Promise.all([
                fetch(`${API_URL}/sustainability/`),
                fetch(`${API_URL}/csr/`)
            ]);
            const statsData = await statsRes.json();
            const csrData = await csrRes.json();
            setStats(statsData.results || statsData || []);
            setCSR(csrData.results || csrData || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem?.id) {
                const res = await fetch(`${API_URL}/sustainability/${editingItem.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...statForm, is_active: true })
                });
                const updated = await res.json();
                setStats(stats.map(s => s.id === editingItem.id ? updated : s));
            } else {
                const res = await fetch(`${API_URL}/sustainability/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...statForm, is_active: true })
                });
                const created = await res.json();
                setStats([...stats, created]);
            }
            setShowModal(false);
            resetForms();
        } catch (error) {
            console.error('Error saving stat:', error);
            alert('Error saving. Please try again.');
        }
    };

    const handleCSRSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem?.id) {
                const res = await fetch(`${API_URL}/csr/${editingItem.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...csrForm, is_active: true })
                });
                const updated = await res.json();
                setCSR(csr.map(c => c.id === editingItem.id ? updated : c));
            } else {
                const res = await fetch(`${API_URL}/csr/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...csrForm, is_active: true })
                });
                const created = await res.json();
                setCSR([...csr, created]);
            }
            setShowModal(false);
            resetForms();
        } catch (error) {
            console.error('Error saving CSR:', error);
            alert('Error saving. Please try again.');
        }
    };

    const handleEdit = (item: SustainabilityStat | CSRInitiative, type: 'stat' | 'csr') => {
        setEditingItem({ ...item, type });
        if (type === 'stat') {
            const stat = item as SustainabilityStat;
            setStatForm({ label: stat.label, value: stat.value, trend: stat.trend || '', icon: stat.icon || '🌱', order: stat.order });
        } else {
            const csr = item as CSRInitiative;
            setCSRForm({ title: csr.title, description: csr.description, category: csr.category, impact_metric: csr.impact_metric || '', image_url: csr.image_url || '' });
        }
        setShowModal(true);
    };

    const handleDelete = async (id: number, type: 'stat' | 'csr') => {
        if (confirm('Delete this item?')) {
            try {
                const endpoint = type === 'stat' ? 'sustainability' : 'csr';
                await fetch(`${API_URL}/${endpoint}/${id}/`, { method: 'DELETE' });
                if (type === 'stat') setStats(stats.filter(s => s.id !== id));
                else setCSR(csr.filter(c => c.id !== id));
            } catch (error) {
                console.error('Error deleting:', error);
            }
        }
    };

    const resetForms = () => {
        setStatForm({ label: '', value: '', trend: '', icon: '🌱', order: 1 });
        setCSRForm({ title: '', description: '', category: 'education', impact_metric: '', image_url: '' });
        setEditingItem(null);
    };

    const getCategoryBadge = (cat: string) => {
        const colors: Record<string, string> = { education: 'info', health: 'danger', environment: 'success', livelihood: 'warning', infrastructure: 'purple' };
        return colors[cat] || 'info';
    };

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading sustainability data...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button className={`admin-btn ${activeTab === 'stats' ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setActiveTab('stats')}>
                    📊 Statistics ({stats.length})
                </button>
                <button className={`admin-btn ${activeTab === 'csr' ? 'admin-btn-primary' : 'admin-btn-secondary'}`} onClick={() => setActiveTab('csr')}>
                    ❤️ CSR Initiatives ({csr.length})
                </button>
            </div>

            {/* Stats Tab */}
            {activeTab === 'stats' && (
                <>
                    <div className="admin-toolbar">
                        <div style={{ flex: 1 }} />
                        <button className="admin-btn admin-btn-primary" onClick={() => { resetForms(); setEditingItem({ type: 'stat' }); setShowModal(true); }}>
                            + Add Stat
                        </button>
                    </div>
                    <div className="admin-card">
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Icon</th>
                                        <th>Label</th>
                                        <th>Value</th>
                                        <th>Trend</th>
                                        <th>Order</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.map((item) => (
                                        <tr key={item.id}>
                                            <td style={{ fontSize: '24px' }}>{item.icon}</td>
                                            <td style={{ fontWeight: 600 }}>{item.label}</td>
                                            <td><strong>{item.value}</strong></td>
                                            <td style={{ color: item.trend?.startsWith('-') ? '#dc2626' : '#16a34a' }}>{item.trend || '—'}</td>
                                            <td>{item.order}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleEdit(item, 'stat')}>✏️</button>
                                                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id, 'stat')}>🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* CSR Tab */}
            {activeTab === 'csr' && (
                <>
                    <div className="admin-toolbar">
                        <div style={{ flex: 1 }} />
                        <button className="admin-btn admin-btn-primary" onClick={() => { resetForms(); setEditingItem({ type: 'csr' }); setShowModal(true); }}>
                            + Add Initiative
                        </button>
                    </div>
                    <div className="admin-card">
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Impact</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {csr.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    {item.image_url && <img src={item.image_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />}
                                                    <span style={{ fontWeight: 600 }}>{item.title}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`admin-badge ${getCategoryBadge(item.category)}`}>
                                                    {CATEGORIES.find(c => c.value === item.category)?.label}
                                                </span>
                                            </td>
                                            <td style={{ color: '#64748b' }}>{item.impact_metric || '—'}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleEdit(item, 'csr')}>✏️</button>
                                                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id, 'csr')}>🗑️</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">
                                {editingItem?.type === 'stat' ? (editingItem.id ? 'Edit Stat' : 'Add Stat') : (editingItem?.id ? 'Edit Initiative' : 'Add Initiative')}
                            </h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={editingItem?.type === 'stat' ? handleStatSubmit : handleCSRSubmit}>
                            <div className="admin-modal-body">
                                {editingItem?.type === 'stat' ? (
                                    <>
                                        <div className="admin-form-row">
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Label *</label>
                                                <input type="text" className="admin-form-input" value={statForm.label}
                                                    onChange={(e) => setStatForm({ ...statForm, label: e.target.value })} required />
                                            </div>
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Value *</label>
                                                <input type="text" className="admin-form-input" value={statForm.value}
                                                    onChange={(e) => setStatForm({ ...statForm, value: e.target.value })} placeholder="45.6%" required />
                                            </div>
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Trend</label>
                                                <input type="text" className="admin-form-input" value={statForm.trend}
                                                    onChange={(e) => setStatForm({ ...statForm, trend: e.target.value })} placeholder="+5%" />
                                            </div>
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Icon</label>
                                                <input type="text" className="admin-form-input" value={statForm.icon}
                                                    onChange={(e) => setStatForm({ ...statForm, icon: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-form-label">Order</label>
                                            <input type="number" className="admin-form-input" value={statForm.order}
                                                onChange={(e) => setStatForm({ ...statForm, order: parseInt(e.target.value) })} min="1" />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="admin-form-group">
                                            <label className="admin-form-label">Title *</label>
                                            <input type="text" className="admin-form-input" value={csrForm.title}
                                                onChange={(e) => setCSRForm({ ...csrForm, title: e.target.value })} required />
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-form-label">Category</label>
                                            <select className="admin-form-select" value={csrForm.category}
                                                onChange={(e) => setCSRForm({ ...csrForm, category: e.target.value })}>
                                                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                            </select>
                                        </div>
                                        <div className="admin-form-group">
                                            <label className="admin-form-label">Description</label>
                                            <textarea className="admin-form-textarea" value={csrForm.description}
                                                onChange={(e) => setCSRForm({ ...csrForm, description: e.target.value })} />
                                        </div>
                                        <div className="admin-form-row">
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Impact Metric</label>
                                                <input type="text" className="admin-form-input" value={csrForm.impact_metric}
                                                    onChange={(e) => setCSRForm({ ...csrForm, impact_metric: e.target.value })} placeholder="500+ beneficiaries" />
                                            </div>
                                            <div className="admin-form-group">
                                                <label className="admin-form-label">Image URL</label>
                                                <input type="text" className="admin-form-input" value={csrForm.image_url}
                                                    onChange={(e) => setCSRForm({ ...csrForm, image_url: e.target.value })} />
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminSustainability;
