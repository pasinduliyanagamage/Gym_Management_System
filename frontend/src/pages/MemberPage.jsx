import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, UserPlus, Filter } from 'lucide-react';
import memberService from '../services/memberService';
import subscriptionService from '../services/subscriptionService';
import trainerService from '../services/trainerService';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const MemberPage = () => {
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'Male',
    status: 'ACTIVE',
    subscriptionId: '',
    trainerId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [membersRes, subsRes, trainersRes] = await Promise.all([
        memberService.getAll(),
        subscriptionService.getAll(),
        trainerService.getAll(),
      ]);
      setMembers(membersRes.data);
      setSubscriptions(subsRes.data);
      setTrainers(trainersRes.data);
    } catch (err) {
      console.error('Failed to load members data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (member = null) => {
    if (member) {
      setFormData({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        email: member.email,
        phone: member.phone || '',
        gender: member.gender || 'Male',
        status: member.status || 'ACTIVE',
        subscriptionId: member.subscriptionId || '',
        trainerId: member.trainerId || '',
      });
    } else {
      setFormData({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        gender: 'Male',
        status: 'ACTIVE',
        subscriptionId: subscriptions.length > 0 ? subscriptions[0].id : '',
        trainerId: trainers.length > 0 ? trainers[0].id : '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        subscriptionId: formData.subscriptionId ? Number(formData.subscriptionId) : null,
        trainerId: formData.trainerId ? Number(formData.trainerId) : null,
      };

      if (formData.id) {
        await memberService.update(formData.id, payload);
      } else {
        await memberService.create(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving member:', err);
      alert('Failed to save member. Please check required fields.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await memberService.delete(id);
        setMembers(members.filter((m) => m.id !== id));
      } catch (err) {
        console.error('Error deleting member:', err);
      }
    }
  };

  const filteredMembers = members.filter((m) => {
    const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
    const query = search.toLowerCase();
    return fullName.includes(query) || m.email.toLowerCase().includes(query);
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Member Management</h1>
          <p className="page-subtitle">Register, update, assign plans and personal trainers to members</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <UserPlus size={18} /> Register New Member
        </button>
      </div>

      {/* Controls Bar */}
      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search member by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Members Data Table */}
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="glass-card table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Member Name</th>
                <th>Contact</th>
                <th>Subscription Plan</th>
                <th>Assigned Trainer</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No members found matching your search.
                  </td>
                </tr>
              ) : (
                filteredMembers.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{m.firstName} {m.lastName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Gender: {m.gender}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.88rem' }}>{m.email}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.phone || 'N/A'}</div>
                    </td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>
                        {m.subscriptionName || 'None'}
                      </span>
                    </td>
                    <td>{m.trainerName || 'Unassigned'}</td>
                    <td><StatusBadge status={m.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                        <button className="btn-icon" onClick={() => handleOpenModal(m)} title="Edit Member">
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(m.id)} title="Delete Member">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Member Create/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Member Details' : 'Register New Member'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name *</label>
              <input
                type="text"
                className="form-input"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Gender</label>
              <select
                className="form-select"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Subscription Plan</label>
              <select
                className="form-select"
                value={formData.subscriptionId}
                onChange={(e) => setFormData({ ...formData, subscriptionId: e.target.value })}
              >
                <option value="">-- Select Plan --</option>
                {subscriptions.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.planName} (Rs. {s.price})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assigned Trainer</label>
              <select
                className="form-select"
                value={formData.trainerId}
                onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
              >
                <option value="">-- Select Trainer --</option>
                {trainers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.firstName} {t.lastName} ({t.specialization})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{ padding: 0, marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {formData.id ? 'Update Member' : 'Register Member'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default MemberPage;
