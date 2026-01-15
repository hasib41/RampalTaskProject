// Admin Messages - View contact form submissions
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const API_URL = 'http://localhost:8000/api';

interface Message {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

    const context = useOutletContext<{ setUnreadMessages: (count: number) => void }>();

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`${API_URL}/contact/`);
                const data = await res.json();
                const messagesData = data.results || data || [];
                setMessages(messagesData);
                const unreadCount = messagesData.filter((m: Message) => !m.is_read).length;
                context?.setUnreadMessages?.(unreadCount);
            } catch (error) {
                console.error('Error fetching messages:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMessages();
    }, [context]);

    const markAsRead = async (id: number) => {
        try {
            await fetch(`${API_URL}/contact/${id}/mark_read/`, { method: 'POST' });
            setMessages(messages.map(m =>
                m.id === id ? { ...m, is_read: true } : m
            ));
            const newUnread = messages.filter(m => !m.is_read && m.id !== id).length;
            context?.setUnreadMessages?.(newUnread);
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    };

    const deleteMessage = async (id: number) => {
        if (confirm('Are you sure you want to delete this message?')) {
            try {
                await fetch(`${API_URL}/contact/${id}/`, { method: 'DELETE' });
                const msg = messages.find(m => m.id === id);
                setMessages(messages.filter(m => m.id !== id));
                if (msg && !msg.is_read) {
                    const newUnread = messages.filter(m => !m.is_read && m.id !== id).length;
                    context?.setUnreadMessages?.(newUnread);
                }
                if (selectedMessage?.id === id) setSelectedMessage(null);
            } catch (error) {
                console.error('Error deleting message:', error);
            }
        }
    };

    const filteredMessages = messages.filter(m => {
        if (filter === 'unread') return !m.is_read;
        if (filter === 'read') return m.is_read;
        return true;
    });

    if (loading) {
        return (
            <div className="admin-empty">
                <div className="admin-empty-icon">⏳</div>
                <div className="admin-empty-title">Loading messages...</div>
            </div>
        );
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '24px' }}>
            {/* Messages List */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h2 className="admin-card-title">
                        Messages ({filteredMessages.length})
                        {messages.filter(m => !m.is_read).length > 0 && (
                            <span className="admin-badge danger" style={{ marginLeft: '8px' }}>
                                {messages.filter(m => !m.is_read).length} unread
                            </span>
                        )}
                    </h2>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {(['all', 'unread', 'read'] as const).map((f) => (
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
                    {filteredMessages.length > 0 ? (
                        filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => { setSelectedMessage(msg); markAsRead(msg.id); }}
                                style={{
                                    padding: '16px 24px',
                                    borderBottom: '1px solid #e2e8f0',
                                    cursor: 'pointer',
                                    background: selectedMessage?.id === msg.id ? '#f1f5f9' : (!msg.is_read ? '#fffbeb' : 'white'),
                                    transition: 'background 0.2s',
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <strong style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {!msg.is_read && <span style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />}
                                        {msg.name}
                                    </strong>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>
                                        {new Date(msg.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{msg.subject}</div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    {msg.message.slice(0, 80)}...
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="admin-empty" style={{ padding: '48px' }}>
                            <div className="admin-empty-icon">✉️</div>
                            <div className="admin-empty-title">No messages</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Message Detail */}
            {selectedMessage && (
                <div className="admin-card">
                    <div className="admin-card-header">
                        <h2 className="admin-card-title">Message Details</h2>
                        <button
                            className="admin-btn admin-btn-danger admin-btn-sm"
                            onClick={() => deleteMessage(selectedMessage.id)}
                        >
                            🗑️ Delete
                        </button>
                    </div>
                    <div style={{ padding: '24px' }}>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>From</div>
                            <div style={{ fontSize: '18px', fontWeight: 600 }}>{selectedMessage.name}</div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Email</div>
                                <a href={`mailto:${selectedMessage.email}`} style={{ color: '#2563eb' }}>{selectedMessage.email}</a>
                            </div>
                            <div>
                                <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Phone</div>
                                <span>{selectedMessage.phone || '—'}</span>
                            </div>
                        </div>
                        <div style={{ marginBottom: '24px' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>Subject</div>
                            <div style={{ fontSize: '16px', fontWeight: 600 }}>{selectedMessage.subject}</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Message</div>
                            <div style={{
                                background: '#f8fafc',
                                padding: '16px',
                                borderRadius: '8px',
                                lineHeight: 1.6,
                                whiteSpace: 'pre-wrap'
                            }}>
                                {selectedMessage.message}
                            </div>
                        </div>
                        <div style={{ marginTop: '24px' }}>
                            <a
                                href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                className="admin-btn admin-btn-primary"
                            >
                                ✉️ Reply via Email
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminMessages;
