// Admin Login Page
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

// Simple password for demo (in production, use proper auth)
const ADMIN_PASSWORD = 'admin123';

function AdminLogin() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));

        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem('adminLoggedIn', 'true');
            navigate('/admin');
        } else {
            setError('Invalid password. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="admin-login">
            <div className="admin-login-card">
                <div className="admin-login-logo">⚡</div>
                <h1 className="admin-login-title">BIFPCL Admin</h1>
                <p className="admin-login-subtitle">Enter your password to access the admin panel</p>

                {error && (
                    <div className="admin-login-error">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="admin-form-group">
                        <input
                            type="password"
                            className="admin-form-input"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="admin-btn admin-btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In →'}
                    </button>
                </form>

                <p style={{ marginTop: '24px', fontSize: '13px', color: '#64748b' }}>
                    Default password: <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>
                </p>
            </div>
        </div>
    );
}

export default AdminLogin;
