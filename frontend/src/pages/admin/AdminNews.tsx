// Admin News Management - CRUD operations for news articles
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000/api';

interface News {
    id: number;
    title: string;
    summary: string;
    content: string;
    image_url: string | null;
    is_featured: boolean;
    is_active: boolean;
    created_at: string;
}

function AdminNews() {
    const [news, setNews] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState<News | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        content: '',
        image_url: '',
        is_featured: false,
    });

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        try {
            const res = await fetch(`${API_URL}/news/`);
            const data = await res.json();
            setNews(data.results || data || []);
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingItem) {
                const res = await fetch(`${API_URL}/news/${editingItem.id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, is_active: true })
                });
                const updated = await res.json();
                setNews(news.map(n => n.id === editingItem.id ? updated : n));
            } else {
                const res = await fetch(`${API_URL}/news/`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...formData, is_active: true })
                });
                const created = await res.json();
                setNews([created, ...news]);
            }
            setShowModal(false);
            resetForm();
        } catch (error) {
            console.error('Error saving news:', error);
            alert('Error saving. Please try again.');
        }
    };

    const handleEdit = (item: News) => {
        setEditingItem(item);
        setFormData({
            title: item.title,
            summary: item.summary,
            content: item.content,
            image_url: item.image_url || '',
            is_featured: item.is_featured,
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this article?')) {
            try {
                await fetch(`${API_URL}/news/${id}/`, { method: 'DELETE' });
                setNews(news.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error deleting news:', error);
            }
        }
    };

    const resetForm = () => {
        setFormData({ title: '', summary: '', content: '', image_url: '', is_featured: false });
        setEditingItem(null);
    };

    const openAddModal = () => {
        resetForm();
        setShowModal(true);
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading news...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Toolbar */}
            <div className="admin-toolbar">
                <div className="admin-search">
                    <span className="admin-search-icon">🔍</span>
                    <input
                        type="text"
                        className="admin-search-input"
                        placeholder="Search articles..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
                    + Add Article
                </button>
            </div>

            {/* Data Table */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">All News Articles ({filteredNews.length})</h2>
                </div>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Summary</th>
                                <th>Featured</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNews.length > 0 ? (
                                filteredNews.map((item) => (
                                    <tr key={item.id}>
                                        <td style={{ fontWeight: 600, maxWidth: '250px' }}>
                                            {item.title.length > 50 ? item.title.slice(0, 50) + '...' : item.title}
                                        </td>
                                        <td style={{ color: '#64748b', maxWidth: '300px' }}>
                                            {item.summary.length > 60 ? item.summary.slice(0, 60) + '...' : item.summary}
                                        </td>
                                        <td>
                                            {item.is_featured ? (
                                                <span className="admin-badge warning">⭐ Featured</span>
                                            ) : (
                                                <span className="admin-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>—</span>
                                            )}
                                        </td>
                                        <td style={{ color: '#64748b', whiteSpace: 'nowrap' }}>
                                            {new Date(item.created_at).toLocaleDateString()}
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
                                    <td colSpan={5}>
                                        <div className="admin-empty">
                                            <div className="admin-empty-icon">📰</div>
                                            <div className="admin-empty-title">No articles found</div>
                                            <div className="admin-empty-text">Create your first news article</div>
                                            <button className="admin-btn admin-btn-primary" onClick={openAddModal}>
                                                + Add Article
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="admin-modal-header">
                            <h3 className="admin-modal-title">
                                {editingItem ? 'Edit Article' : 'Add New Article'}
                            </h3>
                            <button className="admin-modal-close" onClick={() => setShowModal(false)}>
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="admin-modal-body">
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
                                    <label className="admin-form-label">Summary *</label>
                                    <input
                                        type="text"
                                        className="admin-form-input"
                                        value={formData.summary}
                                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Content *</label>
                                    <textarea
                                        className="admin-form-textarea"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label className="admin-form-label">Image URL</label>
                                    <input
                                        type="url"
                                        className="admin-form-input"
                                        value={formData.image_url}
                                        onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                        placeholder="/images/news-1.png"
                                    />
                                </div>
                                <div className="admin-form-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                        />
                                        <span className="admin-form-label" style={{ margin: 0 }}>Mark as Featured</span>
                                    </label>
                                </div>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="admin-btn admin-btn-primary">
                                    {editingItem ? 'Save Changes' : 'Create Article'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminNews;
