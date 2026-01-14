// Admin Tenders Management
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface Tender {
    id: number;
    title: string;
    description: string;
    reference_number: string;
    deadline: string;
    document_url: string | null;
    category: string;
    is_active: boolean;
    created_at: string;
}

const CATEGORIES = [
    { value: 'goods', label: 'Goods' },
    { value: 'works', label: 'Works' },
    { value: 'services', label: 'Services' },
    { value: 'consultancy', label: 'Consultancy' },
];

function AdminTenders() {
    const [tenders, setTenders] = useState<Tender[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<Tender | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        reference_number: '',
        deadline: '',
        document_url: '',
        category: 'goods',
    });

    useEffect(() => {
        fetchTenders();
    }, []);

    const fetchTenders = async () => {
        try {
            const res = await fetch(`${API_URL}/tenders/`);
            const data = await res.json();
            setTenders(data.results || data || []);
        } catch (error) {
            console.error('Error fetching tenders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting:', formData);
        alert(editingItem ? 'Tender updated!' : 'Tender created!');
        setShowModal(false);
        resetForm();
    };

    const handleEdit = (item: Tender) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            description: item.description,
            reference_number: item.reference_number,
            deadline: item.deadline.split('T')[0],
            document_url: item.document_url || '',
            category: item.category,
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this tender?')) {
            setTenders(tenders.filter(item => item.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ title: '', description: '', reference_number: '', deadline: '', document_url: '', category: 'goods' });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const getCategoryBadge = (category: string) => {
        const colors: Record<string, string> = {
            goods: 'success',
            works: 'info',
            services: 'warning',
            consultancy: 'purple',
        };
        return colors[category] || 'info';
    };

    const isExpired = (deadline: string) => new Date(deadline) < new Date();

    const filteredTenders = tenders.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.reference_number.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading tenders...</div>
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
                        placeholder="Search by title or reference..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
                    + Add Tender
                </button>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">All Tenders ({filteredTenders.length})</h2>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTenders.length > 0 ? (
                                filteredTenders.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <code style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                                                {item.reference_number}
                                            </code>
                                        </td>
                                        <td style={{ fontWeight: 500, maxWidth: '250px' }}>
                                            {item.title.length > 40 ? item.title.slice(0, 40) + '...' : item.title}
                                        </td>
                                        <td>
                                            <span className={`admin-badge ${getCategoryBadge(item.category)}`}>
                                                {CATEGORIES.find(c => c.value === item.category)?.label}
                                            </span>
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }}>
                                            {new Date(item.deadline).toLocaleDateString()}
                                        </td>
                                        <td>
                                            {isExpired(item.deadline) ? (
                                                <span className="admin-badge danger">🔴 Closed</span>
                                            ) : (
                                                <span className="admin-badge success">🟢 Open</span>
                                            )}
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    className="admin-btn admin-btn-secondary admin-btn-sm"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="admin-btn admin-btn-danger admin-btn-sm"
                                                    onClick={() => handleDelete(item.id)}
                                                >
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
                                            <div className="admin-empty-icon">📋</div>
                                            <div className="admin-empty-title">No tenders found</div>
                                            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
                                                + Add Tender
                                            </button>
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
                            <h3 className="admin-modal-title">
                                {editingItem ? 'Edit Tender' : 'Add New Tender'}
                            </h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Reference Number *</label>
                                        <input
                                            type="text"
                                            className="admin-form-input"
                                            value={formData.reference_number}
                                            onChange={(e) => setFormData({ ...formData, reference_number: e.target.value })}
                                            placeholder="BIFPCL/TENDER/2026/001"
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Category *</label>
                                        <select
                                            className="admin-form-select"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {CATEGORIES.map((cat) => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Title *</label>
                                    <input
                                        type="text"
                                        className="admin-form-input"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Description *</label>
                                    <textarea
                                        className="admin-form-textarea"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Deadline *</label>
                                        <input
                                            type="date"
                                            className="admin-form-input"
                                            value={formData.deadline}
                                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Document URL</label>
                                        <input
                                            type="url"
                                            className="admin-form-input"
                                            value={formData.document_url}
                                            onChange={(e) => setFormData({ ...formData, document_url: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn-primary">
                                    {editingItem ? 'Save Changes' : 'Create Tender'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminTenders;
