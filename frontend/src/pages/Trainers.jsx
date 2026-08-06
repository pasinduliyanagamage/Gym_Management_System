import React, { useState, useEffect } from 'react';
import { Plus, Search, Star, Phone, Mail, Award, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { cn } from '../utils/cn';
import trainerService from '../services/trainerService';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setTrainers(res.data || []);
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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
    const query = searchQuery.toLowerCase();
    return name.includes(query) || (t.specialization && t.specialization.toLowerCase().includes(query));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Our Trainers</h2>
          <p className="text-gray-400 text-sm mt-1">Manage personal trainers and instructors.</p>
        </div>
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-darkSurface border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>
            Add Trainer
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTrainers.map((trainer) => (
            <div 
              key={trainer.id} 
              className="bg-darkSurface border border-white/5 rounded-2xl p-6 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
                  trainer.status === 'ACTIVE' ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full", trainer.status === 'ACTIVE' ? "bg-green-400" : "bg-red-400")} />
                  {trainer.status}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(trainer)} className="text-gray-400 hover:text-primary transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(trainer.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-yellow-600 p-1 mb-3">
                  <div className="w-full h-full rounded-full bg-darkBg flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{trainer.firstName?.charAt(0)}{trainer.lastName?.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">{trainer.firstName} {trainer.lastName}</h3>
                <p className="text-primary text-sm font-medium">{trainer.specialization}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Award size={16} className="text-gray-500" />
                  <span>{trainer.experienceYears} Years Experience</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Phone size={16} className="text-gray-500" />
                  <span>{trainer.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Mail size={16} className="text-gray-500" />
                  <span className="truncate">{trainer.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/5">
                <button className="py-2 text-sm font-medium text-white hover:text-primary transition-colors">
                  View Profile
                </button>
                <button className="py-2 text-sm font-medium text-white hover:text-primary transition-colors">
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Trainer Info' : 'Add New Trainer'}
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

          <Input
            label="Specialization"
            placeholder="e.g. CrossFit, Yoga"
            value={formData.specialization}
            onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Experience (Years)"
              type="number"
              value={formData.experienceYears}
              onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
            />
            <Input
              label="Salary (Rs./year)"
              type="number"
              value={formData.salary}
              onChange={(e) => setFormData({ ...formData, salary: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Status</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="ON_LEAVE">ON LEAVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {formData.id ? 'Save Changes' : 'Create Trainer'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Trainers;
