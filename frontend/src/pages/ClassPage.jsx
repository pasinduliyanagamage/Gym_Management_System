import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Calendar, Clock, MapPin, Users, Search } from 'lucide-react';
import classService from '../services/classService';
import trainerService from '../services/trainerService';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const ClassPage = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    className: '',
    description: '',
    scheduleTime: '',
    durationMinutes: 45,
    capacity: 20,
    room: 'Studio A',
    trainerId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classesRes, trainersRes] = await Promise.all([
        classService.getAll(),
        trainerService.getAll(),
      ]);
      setClasses(classesRes.data);
      setTrainers(trainersRes.data);
    } catch (err) {
      console.error('Failed to load classes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (gymClass = null) => {
    if (gymClass) {
      setFormData({
        id: gymClass.id,
        className: gymClass.className,
        description: gymClass.description || '',
        scheduleTime: gymClass.scheduleTime ? gymClass.scheduleTime.substring(0, 16) : '',
        durationMinutes: gymClass.durationMinutes || 45,
        capacity: gymClass.capacity || 20,
        room: gymClass.room || 'Studio A',
        trainerId: gymClass.trainerId || '',
      });
    } else {
      setFormData({
        id: null,
        className: '',
        description: '',
        scheduleTime: new Date(Date.now() + 86400000).toISOString().substring(0, 16),
        durationMinutes: 45,
        capacity: 20,
        room: 'Studio A',
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
        trainerId: formData.trainerId ? Number(formData.trainerId) : null,
      };
      if (formData.id) {
        await classService.update(formData.id, payload);
      } else {
        await classService.create(payload);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Error saving class:', err);
      alert('Failed to save class schedule.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this fitness class?')) {
      try {
        await classService.delete(id);
        setClasses(classes.filter((c) => c.id !== id));
      } catch (err) {
        console.error('Error deleting class:', err);
      }
    }
  };

  const filteredClasses = classes.filter((c) => {
    const name = c.className.toLowerCase();
    const query = search.toLowerCase();
    return name.includes(query) || (c.room && c.room.toLowerCase().includes(query));
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Class & Session Scheduling</h2>
          <p className="text-gray-400 text-sm mt-1">Schedule group fitness classes, assign trainers, set capacities & rooms.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Schedule New Class
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search class by name or room..."
          className="w-full h-11 pl-11 pr-4 bg-darkCard border border-white/5 rounded-xl text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClasses.map((c) => (
            <div key={c.id} className="bg-darkCard border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors" onClick={() => handleOpenModal(c)}>
                  <Edit2 size={14} />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors" onClick={() => handleDelete(c.id)}>
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">{c.className}</h3>
                  <span className="text-xs font-medium text-cyan-400">
                    {c.trainerName || 'Unassigned Trainer'}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-400 mb-5 min-h-[40px]">
                {c.description || 'No description provided.'}
              </p>

              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/5 text-sm">
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock size={16} className="text-cyan-400" />
                  <span>{c.durationMinutes} mins</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Users size={16} className="text-amber-400" />
                  <span>Cap: {c.capacity}</span>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-gray-300">
                  <MapPin size={16} className="text-rose-400" />
                  <span>Room: {c.room || 'Main Gym Floor'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Class Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Class Schedule' : 'Schedule New Class'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Class Name"
            required
            placeholder="e.g. HIIT Power Hour"
            value={formData.className}
            onChange={(e) => setFormData({ ...formData, className: e.target.value })}
          />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Assign Trainer</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
              value={formData.trainerId}
              onChange={(e) => setFormData({ ...formData, trainerId: e.target.value })}
            >
              <option value="">-- Select Trainer --</option>
              {trainers.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.firstName} {t.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Room / Location"
              placeholder="e.g. Studio A"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
            />
            <Input
              label="Duration (Minutes)"
              type="number"
              value={formData.durationMinutes}
              onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Max Capacity"
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              className="w-full h-24 px-4 py-3 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none resize-none"
              placeholder="Class overview, targeted muscle groups..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {formData.id ? 'Update Schedule' : 'Schedule Class'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ClassPage;
