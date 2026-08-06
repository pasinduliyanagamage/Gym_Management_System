import React, { useState, useEffect } from 'react';
import { Download, CreditCard, DollarSign, TrendingUp, AlertCircle, Trash2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatCard from '../components/cards/StatCard';
import ChartCard from '../components/cards/ChartCard';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import DataTable from '../components/tables/DataTable';
import { cn } from '../utils/cn';
import paymentService from '../services/paymentService';
import memberService from '../services/memberService';

// Fallback static chart data if needed
const revenueData = [
  { name: 'Mon', amount: 1200 },
  { name: 'Tue', amount: 1800 },
  { name: 'Wed', amount: 1500 },
  { name: 'Thu', amount: 2100 },
  { name: 'Fri', amount: 2800 },
  { name: 'Sat', amount: 3200 },
  { name: 'Sun', amount: 1100 },
];

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setPayments(paymentsRes.data || []);
      setMembers(membersRes.data || []);
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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

  const totalRevenue = payments.reduce((acc, p) => acc + (Number(p.amount) || 0), 0);
  const pendingAmount = payments.filter(p => p.paymentStatus === 'PENDING').reduce((acc, p) => acc + (Number(p.amount) || 0), 0);

  const columns = [
    { header: 'Invoice ID', accessor: 'invoiceNumber', className: 'text-primary font-medium' },
    { header: 'Member', accessor: 'memberName' },
    { 
      header: 'Date', 
      render: (row) => (
        <span className="text-gray-400">
          {row.paymentDate ? new Date(row.paymentDate).toLocaleDateString() : 'N/A'}
        </span>
      )
    },
    { 
      header: 'Amount', 
      render: (row) => (
        <span className="font-semibold text-white">Rs. {row.amount}</span>
      )
    },
    { 
      header: 'Method', 
      render: (row) => (
        <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
          {row.paymentMethod}
        </span>
      ) 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          row.paymentStatus === 'PAID' && "bg-green-500/10 text-green-400",
          row.paymentStatus === 'PENDING' && "bg-yellow-500/10 text-yellow-400",
          row.paymentStatus === 'FAILED' && "bg-red-500/10 text-red-400"
        )}>
          {row.paymentStatus}
        </span>
      ) 
    },
    {
      header: 'Action',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-3">
          <button className="text-gray-400 hover:text-primary transition-colors flex items-center gap-1 text-sm" title="Download Invoice">
            <Download size={14} /> 
          </button>
          <button className="text-gray-400 hover:text-red-500 transition-colors" onClick={() => handleDelete(row.id)} title="Delete Payment">
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Payments & Billing</h2>
          <p className="text-gray-400 text-sm mt-1">Manage invoices, subscriptions and revenue.</p>
        </div>
        <Button leftIcon={<CreditCard size={18} />} onClick={handleOpenModal}>
          Record New Payment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`Rs. ${totalRevenue.toLocaleString()}`} 
          icon={DollarSign} 
          trend="up" 
          trendValue="14%" 
        />
        <StatCard 
          title="Pending Payments" 
          value={`Rs. ${pendingAmount.toLocaleString()}`} 
          icon={AlertCircle} 
          trend="down" 
          trendValue="2%" 
        />
        <StatCard 
          title="Monthly MRR" 
          value="Rs. 42,000" 
          icon={TrendingUp} 
          trend="up" 
          trendValue="5%" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartCard title="Revenue Trends" subtitle="Weekly income analysis">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff50" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1B1B1B', borderColor: '#ffffff10', borderRadius: '8px' }}
                />
                <Line type="monotone" dataKey="amount" stroke="#FFC107" strokeWidth={3} dot={{ fill: '#FFC107', r: 4 }} activeDot={{ r: 6, strokeWidth: 0 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        <div className="lg:col-span-1 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-white">Recent Invoices</h3>
          <div className="bg-darkSurface border border-white/5 rounded-2xl flex-1 p-1">
            <DataTable columns={columns} data={payments} isLoading={loading} />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Record New Payment"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Select Member</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
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
          
          <Input
            label="Amount (Rs.)"
            type="number"
            step="0.01"
            required
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
          />
          
          <Input
            label="Invoice Number"
            value={formData.invoiceNumber}
            onChange={(e) => setFormData({ ...formData, invoiceNumber: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Payment Method</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="CARD">Credit / Debit Card</option>
                <option value="CASH">Cash</option>
                <option value="UPI">UPI / Digital Wallet</option>
                <option value="NETBANKING">Net Banking</option>
              </select>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Payment Status</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
                value={formData.paymentStatus}
                onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              >
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="FAILED">FAILED</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              Record Payment
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Payments;
