// Admin Careers Management
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface Career {
    id: number;
    title: string;
    department: string;
    location: string;
    description: string;
    requirements: string;
    job_type: string;
    deadline: string;
    vacancies: number;
    is_active: boolean;
    created_at: string;
}

const JOB_TYPES = [
    { value: 'full_time', label: 'Full Time' },
    { value: 'part_time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
];

function AdminCareers() {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Career | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        department: '',
        location: 'Rampal, Bagerhat',
        description: '',
        requirements: '',
        job_type: 'full_time',
        deadline: '',
        vacancies: 1,
    });

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const res = await fetch(`${API_URL}/careers/`);
            const data = await res.json();
            setCareers(data.results || data || []);
        } catch (error) {
            console.error('Error fetching careers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                const res = await fetch(`${API_URL}/careers/${editingItem.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, is_active: true })
                });
                const updated = await res.json();
                setCareers(careers.map(c => c.id === editingItem.id ? updated : c));
            } else {
                const res = await fetch(`${API_URL}/careers/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, is_active: true })
                });
                const created = await res.json();
                setCareers([created, ...careers]);
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error saving career:', error);
            alert('Error saving. Please try again.');
        }
    };

    const handleEdit = (item: Career) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            department: item.department,
            location: item.location,
            description: item.description,
            requirements: item.requirements,
            job_type: item.job_type,
            deadline: item.deadline,
            vacancies: item.vacancies,
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this job posting?')) {
            try {
                await fetch(`${API_URL}/careers/${id}/`, { method: 'DELETE' });
                setCareers(careers.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting career:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({
            title: '', department: '', location: 'Rampal, Bagerhat',
            description: '', requirements: '', job_type: 'full_time', deadline: '', vacancies: 1
        });
        setEditingItem(null);
    };

    const getJobTypeBadge = (type: string) => {
        const colors: Record<string, string> = {
            full_time: 'success', part_time: 'info', contract: 'warning', internship: 'purple'
        };
        return colors[type] || 'info';
    };

    const filteredCareers = careers.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading careers...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="admin-toolbar">
                <div className="admin-search">
                    <span className="admin-search-icon">🔍</span>
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search jobs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    + Add Job
                </button>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">All Job Postings ({filteredCareers.length})</h2>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Department</th>
                                <th>Type</th>
                                <th>Vacancies</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCareers.length > 0 ? (
                                filteredCareers.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 600 }}>{item.title}</td>
                                        <td style={{ color: '#64748b' }}>{item.department}</td>
                                        <td>
                                            <span className={`admin-badge ${getJobTypeBadge(item.job_type)}`}>
                                                {JOB_TYPES.find(t => t.value === item.job_type)?.label}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 600 }}>{item.vacancies}</td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            {new Date(item.deadline).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleEdit(item)}>
                                                    ✏️ Edit
                                                </button>
                                                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">💼</div>
                                            <div className="admin-empty-title">No job postings</div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">{editingItem ? 'Edit Job' : 'Add New Job'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Job Title *</label>
                                        <input type="text" className="admin-form-input" value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Department *</label>
                                        <input type="text" className="admin-form-input" value={formData.department}
                                            onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Job Type</label>
                                        <select className="admin-form-select" value={formData.job_type}
                                            onChange={(e) => setFormData({ ...formData, job_type: e.target.value })}>
                                            {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                                        </select>
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Location</label>
                                        <input type="text" className="admin-form-input" value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Description *</label>
                                    <textarea className="admin-form-textarea" value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Requirements *</label>
                                    <textarea className="admin-form-textarea" value={formData.requirements}
                                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} required />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Vacancies</label>
                                        <input type="number" className="admin-form-input" min="1" value={formData.vacancies}
                                            onChange={(e) => setFormData({ ...formData, vacancies: parseInt(e.target.value) })} />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Deadline *</label>
                                        <input type="date" className="admin-form-input" value={formData.deadline}
                                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })} required />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editingItem ? 'Save Changes' : 'Create Job'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminCareers;
