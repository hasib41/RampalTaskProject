// Admin Board Members Management
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface BoardMember {
    id: number;
    name: string;
    title: string;
    bio: string;
    image_url: string | null;
    is_chairman: boolean;
    order: number;
    is_active: boolean;
}

function AdminBoard() {
    const [members, setMembers] = useState<BoardMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<BoardMember | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        title: '',
        bio: '',
        image_url: '',
        is_chairman: false,
        order: 1,
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch(`${API_URL}/board/`);
            const data = await res.json();
            setMembers(data.results || data || []);
        } catch (error) {
            console.error('Error fetching board members:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingItem) {
            setMembers(members.map(m => m.id === editingItem.id ? { ...m, ...formData, is_active: true } : m));
        } else {
            setMembers([...members, { id: Date.now(), ...formData, is_active: true }]);
        }
        setShowModal(false);
        resetForm();
    };

    const handleEdit = (item: BoardMember) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            title: item.title,
            bio: item.bio,
            image_url: item.image_url || '',
            is_chairman: item.is_chairman,
            order: item.order,
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this board member?')) {
            setMembers(members.filter(m => m.id !== id));
        }
    };

    const resetForm = () => {
        setFormData({ name: '', title: '', bio: '', image_url: '', is_chairman: false, order: 1 });
        setEditingItem(null);
    };

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading board members...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="admin-toolbar">
                <div style={{ flex: 1 }} />
                <button className="admin-btn admin-btn-primary" onClick={() => { resetForm(); setShowModal(true); }}>
                    + Add Member
                </button>
            </div>

            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">Board of Directors ({members.length})</h2>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Member</th>
                                <th>Title</th>
                                <th>Role</th>
                                <th>Order</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.length > 0 ? (
                                members.map((item) => (
                                    <tr key={item.id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                                                ) : (
                                                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, color: '#64748b' }}>
                                                        {item.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span style={{ fontWeight: 600 }}>{item.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ color: '#64748b' }}>{item.title}</td>
                                        <td>
                                            {item.is_chairman ? (
                                                <span className="admin-badge warning">👑 Chairman</span>
                                            ) : (
                                                <span className="admin-badge info">Director</span>
                                            )}
                                        </td>
                                        <td>{item.order}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleEdit(item)}>✏️</button>
                                                <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDelete(item.id)}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">👥</div>
                                            <div className="admin-empty-title">No board members</div>
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
                            <h3 className="admin-modal-title">{editingItem ? 'Edit Member' : 'Add Member'}</h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Full Name *</label>
                                        <input type="text" className="admin-form-input" value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Title/Position *</label>
                                        <input type="text" className="admin-form-input" value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Bio</label>
                                    <textarea className="admin-form-textarea" value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
                                </div>
                                <div className="admin-form-row">
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Image URL</label>
                                        <input type="text" className="admin-form-input" value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })} placeholder="/images/director-1.png" />
                                    </div>
                                    <div className="admin-form-group">
                                        <label className="admin-form-label">Display Order</label>
                                        <input type="number" className="admin-form-input" value={formData.order}
                                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} min="1" />
                                    </div>
                                </div>
                                <div className="admin-form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input type="checkbox" checked={formData.is_chairman}
                                            onChange={(e) => setFormData({ ...formData, is_chairman: e.target.checked })} />
                                        <span>Chairman of the Board</span>
                                    </label>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="admin-btn admin-btn-primary">{editingItem ? 'Save' : 'Add Member'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminBoard;
