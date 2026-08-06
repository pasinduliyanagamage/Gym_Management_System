import React, { useState, useEffect } from 'react';
import { Plus, Search, AlertCircle, Filter, Edit, Trash2 } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import { cn } from '../utils/cn';
import equipmentService from '../services/equipmentService';

const Inventory = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setEquipment(res.data || []);
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
    setIsSubmitting(true);
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
    } finally {
      setIsSubmitting(false);
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

  const filteredItems = equipment.filter(item => {
    const name = item.name?.toLowerCase() || '';
    const cat = item.category?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return name.includes(query) || cat.includes(query);
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Equipment Inventory</h2>
          <p className="text-gray-400 text-sm mt-1">Manage gym machines and maintenance schedules.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" leftIcon={<Filter size={18} />}>Filters</Button>
          <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>Add Equipment</Button>
        </div>
      </div>

      <div className="bg-darkSurface p-4 rounded-2xl border border-white/5 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isLowStock = item.quantity < 3;
            const needsRepair = item.conditionStatus === 'MAINTENANCE_REQUIRED' || item.conditionStatus === 'REPLACED';
            
            return (
              <div 
                key={item.id} 
                className={cn(
                  "bg-darkSurface border rounded-2xl p-6 shadow-lg relative overflow-hidden transition-all group",
                  needsRepair ? "border-red-500/30" : "border-white/5 hover:border-primary/30"
                )}
              >
                {needsRepair && (
                  <div className="absolute top-0 right-0 bg-red-500/10 text-red-500 px-3 py-1 rounded-bl-xl text-xs font-medium flex items-center gap-1 border-b border-l border-red-500/20">
                    <AlertCircle size={14} /> Attention
                  </div>
                )}
                
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                    {item.category}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => handleOpenModal(item)} className="text-gray-400 hover:text-primary transition-colors">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-400 mb-6">ID: {item.id}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Quantity</span>
                    <span className={cn(
                      "font-bold",
                      isLowStock ? "text-red-400" : "text-white"
                    )}>{item.quantity} units</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Condition</span>
                    <span className={cn(
                      "font-medium",
                      item.conditionStatus === 'GOOD' && "text-green-400",
                      item.conditionStatus === 'MAINTENANCE_REQUIRED' && "text-yellow-400",
                      item.conditionStatus === 'REPLACED' && "text-red-400"
                    )}>{item.conditionStatus.replace('_', ' ')}</span>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Last Maint.</span>
                    <span className="text-white">{item.lastMaintenanceDate || 'N/A'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Equipment' : 'Add New Equipment'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Equipment Name"
            required
            placeholder="e.g. Commercial Treadmill T80"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-300">Category</label>
              <select
                className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Cardio">Cardio</option>
                <option value="Strength">Strength</option>
                <option value="Free Weights">Free Weights</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            
            <Input
              label="Quantity"
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Condition Status</label>
            <select
              className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
              value={formData.conditionStatus}
              onChange={(e) => setFormData({ ...formData, conditionStatus: e.target.value })}
            >
              <option value="GOOD">GOOD</option>
              <option value="MAINTENANCE_REQUIRED">MAINTENANCE REQUIRED</option>
              <option value="REPLACED">REPLACED</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Purchase Date"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
            />
            <Input
              label="Last Maintenance Date"
              type="date"
              value={formData.lastMaintenanceDate}
              onChange={(e) => setFormData({ ...formData, lastMaintenanceDate: e.target.value })}
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {formData.id ? 'Save Changes' : 'Add Equipment'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Inventory;
