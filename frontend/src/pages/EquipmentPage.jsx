import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Package, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
import equipmentService from '../services/equipmentService';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const EquipmentPage = () => {
  const [equipment, setEquipment] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    category: 'Cardio',
    quantity: 1,
    conditionStatus: 'GOOD',
    purchaseDate: new Date().toISOString().substring(0, 10),
    lastMaintenanceDate: new Date().toISOString().substring(0, 10),
  });

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = async () => {
    try {
      setLoading(true);
      const res = await equipmentService.getAll();
      setEquipment(res.data);
    } catch (err) {
      console.error('Failed to load equipment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setFormData({
        id: item.id,
        name: item.name,
        category: item.category || 'Cardio',
        quantity: item.quantity || 1,
        conditionStatus: item.conditionStatus || 'GOOD',
        purchaseDate: item.purchaseDate || new Date().toISOString().substring(0, 10),
        lastMaintenanceDate: item.lastMaintenanceDate || new Date().toISOString().substring(0, 10),
      });
    } else {
      setFormData({
        id: null,
        name: '',
        category: 'Cardio',
        quantity: 1,
        conditionStatus: 'GOOD',
        purchaseDate: new Date().toISOString().substring(0, 10),
        lastMaintenanceDate: new Date().toISOString().substring(0, 10),
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await equipmentService.update(formData.id, formData);
      } else {
        await equipmentService.create(formData);
      }
      setIsModalOpen(false);
      loadEquipment();
    } catch (err) {
      console.error('Error saving equipment:', err);
      alert('Failed to save equipment.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this equipment item?')) {
      try {
        await equipmentService.delete(id);
        setEquipment(equipment.filter((item) => item.id !== id));
      } catch (err) {
        console.error('Error deleting equipment:', err);
      }
    }
  };

  const filteredEquipment = equipment.filter((e) => {
    const name = e.name.toLowerCase();
    const cat = e.category ? e.category.toLowerCase() : '';
    const query = search.toLowerCase();
    return name.includes(query) || cat.includes(query);
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Equipment / Inventory Management</h1>
          <p className="page-subtitle">Track gym machinery, free weights, quantities, condition status, and maintenance logs</p>
        </div>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}>
          <Plus size={18} /> Add New Equipment
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search equipment by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="glass-card table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Equipment Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Purchase Date</th>
                <th>Last Maintenance</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEquipment.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No equipment items found.
                  </td>
                </tr>
              ) : (
                filteredEquipment.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Package size={16} color="var(--accent-cyan)" />
                        {item.name}
                      </div>
                    </td>
                    <td>
                      <span className="btn btn-sm btn-secondary" style={{ padding: '0.2rem 0.55rem', fontSize: '0.78rem' }}>
                        {item.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{item.quantity} units</td>
                    <td><StatusBadge status={item.conditionStatus} /></td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.purchaseDate || 'N/A'}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.lastMaintenanceDate || 'N/A'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                        <button className="btn-icon" onClick={() => handleOpenModal(item)} title="Edit Item">
                          <Edit2 size={16} />
                        </button>
                        <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(item.id)} title="Delete Item">
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

      {/* Equipment Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Equipment' : 'Add New Equipment'}
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Equipment Name *</label>
              <input
                type="text"
                className="form-input"
                required
                placeholder="e.g. Commercial Treadmill T80, Olympic Barbell"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Free Weights">Free Weights</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Quantity</label>
              <input
                type="number"
                className="form-input"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Condition Status</label>
              <select
                className="form-select"
                value={formData.conditionStatus}
                onChange={(e) => setFormData({ ...formData, conditionStatus: e.target.value })}
              >
                <option value="GOOD">GOOD</option>
                <option value="MAINTENANCE_REQUIRED">MAINTENANCE REQUIRED</option>
                <option value="REPLACED">REPLACED</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Purchase Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Last Maintenance Date</label>
              <input
                type="date"
                className="form-input"
                value={formData.lastMaintenanceDate}
                onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
              />
            </div>
          </div>
          <div className="modal-footer" style={{ padding: 0, marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {formData.id ? 'Save Changes' : 'Add Equipment'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EquipmentPage;
