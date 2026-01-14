// Admin Projects Management
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface Project {
    id: number;
    name: string;
    location: string;
    description: string;
    capacity: string;
    status: string;
    category: string;
    image_url: string | null;
    efficiency: string;
    is_featured: boolean;
    is_active: boolean;
}

const STATUS_OPTIONS = [
    { value: 'operational', label: 'Operational' },
    { value: 'construction', label: 'Under Construction' },
    { value: 'planning', label: 'Planning' },
    { value: 'maintenance', label: 'Maintenance' },
];

const CATEGORY_OPTIONS = [
    { value: 'coal', label: 'Coal Power' },
    { value: 'solar', label: 'Solar Energy' },
    { value: 'wind', label: 'Wind Energy' },
    { value: 'hydro', label: 'Hydroelectric' },
    { value: 'transmission', label: 'Transmission' },
];

function AdminProjects() {
    const [projects, setProjects] = useState<Project[]>([
        {
            id: 1, name: 'Maitree Super Thermal Power Project', location: 'Rampal, Bagerhat',
            description: 'Ultra-supercritical coal-fired thermal power plant with 1320 MW capacity.',
            capacity: '1320 MW', status: 'operational', category: 'coal',
            image_url: '/images/hero-1.png', efficiency: '45.6%', is_featured: true, is_active: true
        },
        {
            id: 2, name: 'Solar Power Initiative', location: 'Rampal Complex',
            description: 'Rooftop solar installation for administrative buildings.',
            capacity: '5 MW', status: 'construction', category: 'solar',
            image_url: '/images/hero-2.png', efficiency: '', is_featured: false, is_active: true
        },
    ]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Project | null>(null);

    const [formData, setFormData] = useState({
        name: '', location: '', description: '', capacity: '',
        status: 'operational', category: 'coal', image_url: '', efficiency: '', is_featured: false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            setProjects(projects.map(p => p.id === editingItem.id ? { ...p, ...formData } : p));
        } else {
            setProjects([...projects, { id: Date.now(), ...formData, is_active: true }]);
        }
        setShowModal(false);
        resetForm();
    };

    const handleEdit = (item: Project) => {
        setEditingItem(item);
        setFormData({
            name: item.name, location: item.location, description: item.description,
            capacity: item.capacity, status: item.status, category: item.category,
            image_url: item.image_url || '', efficiency: item.efficiency, is_featured: item.is_featured
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this project?')) {
            setProjects(projects.filter(p => p.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', description: '', capacity: '', status: 'operational', category: 'coal', image_url: '', efficiency: '', is_featured: false });
        setEditingItem(null);
    };

    const getStatusBadge = (status: string) => {
        const colors: Record<string, string> = { operational: 'success', construction: 'warning', planning: 'info', maintenance: 'danger' };
        return colors[status] || 'info';
    };

    return (
        <div>
            <div className="admin-toolbar">
                <div style={{ flex: 1 }} />
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    + Add Project
                </button>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">All Projects ({projects.length})</h2>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Location</th>
                                <th>Capacity</th>
                                <th>Status</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            {item.image_url && (
                                                <img src={item.image_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }} />
                                            )}
                                            <div>
                                                <div style={{ fontWeight: 600 }}>{item.name}</div>
                                                {item.is_featured && <span className="admin-badge warning" style={{ marginTop: '4px' }}>⭐ Featured</span>}
                                            </div>
                                        </div>
                                    </td>
                                    <td style={{ color: '#64748b' }}>{item.location}</td>
                                    <td style={{ fontWeight: 600 }}>{item.capacity}</td>
                                    <td><span className={`admin-badge ${getStatusBadge(item.status)}`}>{STATUS_OPTIONS.find(s => s.value === item.status)?.label}</span></td>
                                    <td>{CATEGORY_OPTIONS.find(c => c.value === item.category)?.label}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleEdit(item)}>✏️</button>
                                            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">{editingItem ? 'Edit Project' : 'Add Project'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Project Name *</label>
                                    <input type="text" className="admin-form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Location *</label>
                                        <input type="text" className="admin-form-input" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} required />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Capacity *</label>
                                        <input type="text" className="admin-form-input" value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="1320 MW" required />
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Status</label>
                                        <select className="admin-form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                                            {STATUS_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Category</label>
                                        <select className="admin-form-select" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                                            {CATEGORY_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Description</label>
                                    <textarea className="admin-form-textarea" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Image URL</label>
                                        <input type="text" className="admin-form-input" value={formData.image_url} onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Efficiency</label>
                                        <input type="text" className="admin-form-input" value={formData.efficiency} onChange={(e) => setFormData({ ...formData, efficiency: e.target.value })} placeholder="45.6%" />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={formData.is_featured} onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })} />
                                        <span>Mark as Featured</span>
                                    </label>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editingItem ? 'Save' : 'Create'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProjects;
