import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { cn } from '../utils/cn';

import memberService from '../services/memberService';
import subscriptionService from '../services/subscriptionService';
import trainerService from '../services/trainerService';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [trainers, setTrainers] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setMembers(membersRes.data || []);
      setSubscriptions(subsRes.data || []);
      setTrainers(trainersRes.data || []);
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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

  // Filter real data
  const filteredData = members.filter(m => {
    const fullName = `${m.firstName} ${m.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || m.email.toLowerCase().includes(query);
  });
  
  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const columns = [
    { header: 'ID', accessor: 'id' },
    { 
      header: 'Member', 
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
            {row.firstName?.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-white">{row.firstName} {row.lastName}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      )
    },
    { header: 'Phone', accessor: 'phone' },
    { 
      header: 'Plan', 
      render: (row) => (
        <span className="font-medium text-primary">
          {row.subscriptionName || 'None'}
        </span>
      ) 
    },
    { 
      header: 'Status', 
      render: (row) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium flex w-fit items-center gap-1.5",
          row.status === 'ACTIVE' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
        )}>
          <span className={cn("w-1.5 h-1.5 rounded-full", row.status === 'ACTIVE' ? "bg-green-400" : "bg-red-400")} />
          {row.status}
        </span>
      ) 
    },
    { header: 'Assigned Trainer', accessor: 'trainerName' },
    {
      header: 'Actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button 
            className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
            onClick={() => handleOpenModal(row)}
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button 
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-500/10 rounded transition-colors"
            onClick={() => handleDelete(row.id)}
            title="Delete"
          >
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
          <h2 className="text-2xl font-bold text-white">Members</h2>
          <p className="text-gray-400 text-sm mt-1">Manage your gym members and their subscriptions.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Add New Member
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={paginatedData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pagination={{
          currentPage,
          pageSize,
          total: filteredData.length
        }}
        onPageChange={setCurrentPage}
        isLoading={loading}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Member Details' : 'Register New Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <Input
              label="Last Name"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          
          <Input
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          
          <Input
            label="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Gender</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Status</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Subscription Plan</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
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

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Assigned Trainer</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
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

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {formData.id ? 'Update Member' : 'Register Member'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Members;
