import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, CreditCard, Receipt, DollarSign, Filter } from 'lucide-react';
import paymentService from '../services/paymentService';
import memberService from '../services/memberService';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    memberId: '',
    amount: 49.99,
    paymentMethod: 'CARD',
    paymentStatus: 'PAID',
    invoiceNumber: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [paymentsRes, membersRes] = await Promise.all([
        paymentService.getAll(),
        memberService.getAll(),
      ]);
      setPayments(paymentsRes.data);
      setMembers(membersRes.data);
    } catch (err) {
      console.error('Failed to load payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setFormData({
      id: null,
      memberId: members.length > 0 ? members[0].id : '',
      amount: 49.99,
      paymentMethod: 'CARD',
      paymentStatus: 'PAID',
      invoiceNumber: 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        memberId: Number(formData.memberId),
      };
      await paymentService.create(payload);
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error creating payment:', err);
      alert('Failed to record payment.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      try {
        await paymentService.delete(id);
        setPayments(payments.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Error deleting payment:', err);
      }
    }
  };

  const filteredPayments = payments.filter((p) => {
    const name = p.memberName ? p.memberName.toLowerCase() : '';
    const inv = p.invoiceNumber ? p.invoiceNumber.toLowerCase() : '';
    const query = search.toLowerCase();
    return name.includes(query) || inv.includes(query);
  });

  const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Payment & Billing</h1>
          <p className="page-subtitle">Track transactions, billing history, invoices, and membership renewals</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenModal}>
          <Plus size={18} /> Record New Payment
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search by member name or invoice number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.6rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontWeight: 700 }}>
          <DollarSign size={18} /> Total Volume: Rs. {totalRevenue.toFixed(2)}
        </div>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="glass-card table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Invoice No</th>
                <th>Member Name</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Date & Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                        {p.invoiceNumber}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{p.memberName}</td>
                    <td style={{ fontWeight: 800, color: 'var(--accent-emerald)', fontSize: '1rem' }}>
                      Rs. {p.amount}
                    </td>
                    <td>
                      <span className="btn btn-sm btn-secondary" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}>
                        {p.paymentMethod}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {p.paymentDate ? new Date(p.paymentDate).toLocaleString() : 'N/A'}
                    </td>
                    <td><StatusBadge status={p.paymentStatus} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(p.id)} title="Delete Payment">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Payment Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record New Payment"
      >
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group full-width">
              <label className="form-label">Select Member *</label>
              <select
                className="form-select"
                required
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
              >
                <option value="">-- Choose Member --</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.firstName} {m.lastName} ({m.email})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Amount (Rs.) *</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Invoice Number</label>
              <input
                type="text"
                className="form-input"
                value={formData.invoiceNumber}
                onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Payment Method</label>
              <select
                className="form-select"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="CARD">Credit / Debit Card</option>
                <option value="CASH">Cash</option>
                <option value="UPI">UPI / Digital Wallet</option>
                <option value="NETBANKING">Net Banking</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Payment Status</label>
              <select
                className="form-select"
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>
          </div>
          <div className="modal-footer" style={{ padding: 0, marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Record Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PaymentPage;
