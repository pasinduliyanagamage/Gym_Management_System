import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Dumbbell, Award, DollarSign, Phone, Mail } from 'lucide-react';
import trainerService from '../services/trainerService';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const TrainerPage = () => {
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
    specialization: 'CrossFit & HIIT',
    experienceYears: 3,
    salary: 50000,
    status: 'ACTIVE',
  });

  useEffect(() => {
    loadTrainers();
  }, []);

  const loadTrainers = async () => {
    try {
      setLoading(true);
      const res = await trainerService.getAll();
      setTrainers(res.data);
    } catch (err) {
      console.error('Failed to load trainers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (trainer = null) => {
    if (trainer) {
      setFormData({
        id: trainer.id,
        firstName: trainer.firstName,
        lastName: trainer.lastName,
        email: trainer.email,
        phone: trainer.phone || '',
        specialization: trainer.specialization || 'CrossFit & HIIT',
        experienceYears: trainer.experienceYears || 1,
        salary: trainer.salary || 50000,
        status: trainer.status || 'ACTIVE',
      });
    } else {
      setFormData({
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        specialization: 'CrossFit & HIIT',
        experienceYears: 3,
        salary: 50000,
        status: 'ACTIVE',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await trainerService.update(formData.id, formData);
      } else {
        await trainerService.create(formData);
      }
      setIsModalOpen(false);
      loadTrainers();
    } catch (err) {
      console.error('Error saving trainer:', err);
      alert('Failed to save trainer.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trainer record?')) {
      try {
        await trainerService.delete(id);
        setTrainers(trainers.filter((t) => t.id !== id));
      } catch (err) {
        console.error('Error deleting trainer:', err);
      }
    }
  };

  const filteredTrainers = trainers.filter((t) => {
    const name = `${t.firstName} ${t.lastName}`.toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || (t.specialization && t.specialization.toLowerCase().includes(query));
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Trainer Management</h1>
          <p className="page-subtitle">Manage gym fitness coaches, specializations, schedules, and salaries</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Trainer
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search trainer by name or specialization..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="cards-grid">
          {filteredTrainers.map((t) => (
            <div key={t.id} className="glass-card module-card">
              <div>
                <div className="card-header-flex">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontWeight: 700
                    }}>
                      {t.firstName[0]}{t.lastName[0]}
                    </div>
                    <div>
                      <h3 className="card-title">{t.firstName} {t.lastName}</h3>
                      <StatusBadge status={t.status} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button className="btn-icon" onClick={() => handleOpenModal(t)}>
                      <Edit2 size={15} />
                    </button>
                    <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(t.id)}>
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Dumbbell size={16} color="var(--accent-cyan)" />
                    <span>Specialization: <strong>{t.specialization || 'General Fitness'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <Award size={16} color="var(--accent-purple)" />
                    <span>Experience: <strong>{t.experienceYears} Years</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <DollarSign size={16} color="var(--accent-emerald)" />
                    <span>Annual Salary: <strong>Rs. {t.salary ? Number(t.salary).toLocaleString() : 'N/A'}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    <Mail size={14} /> {t.email}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                    <Phone size={14} /> {t.phone || 'N/A'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Trainer Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Trainer Info' : 'Add New Trainer'}
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
              <label className="form-label">Specialization</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. CrossFit, Yoga, Bodybuilding"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Experience (Years)</label>
              <input
                type="number"
                className="form-input"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Salary (Rs./year)</label>
              <input
                type="number"
                className="form-input"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{ padding: 0, marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {formData.id ? 'Save Changes' : 'Create Trainer'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TrainerPage;
