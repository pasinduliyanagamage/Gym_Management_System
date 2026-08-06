import React, { useState } from 'react';
import authService from '../services/authService';
import loginBg from '../assets/login_bg.jpg';

function LoginPage({ onLogin, onSwitchToRegister }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(form);
      if (res.data.success) {
        localStorage.setItem('user', JSON.stringify(res.data));
        onLogin(res.data);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="auth-overlay" />
      <div className="auth-card">
        <div className="auth-logo">
          <span className="auth-logo-icon">&#127947;</span>
          <h1>PULSE FIT</h1>
          <p className="auth-subtitle">Welcome back! Sign in to continue.</p>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}
          <div className="auth-field">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? <span className="auth-spinner" /> : 'Sign In'}
          </button>
        </form>
        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={onSwitchToRegister}>Register here</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
