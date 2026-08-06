import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, Award } from 'lucide-react';
import subscriptionService from '../services/subscriptionService';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    planName: '',
    price: 49.99,
    durationMonths: 1,
    description: '',
    features: '',
  });

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);
      const res = await subscriptionService.getAll();
      setSubscriptions(res.data);
    } catch (err) {
      console.error('Failed to load subscriptions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (plan = null) => {
    if (plan) {
      setFormData({
        id: plan.id,
        planName: plan.planName,
        price: plan.price,
        durationMonths: plan.durationMonths,
        description: plan.description || '',
        features: plan.features || '',
      });
    } else {
      setFormData({
        id: null,
        planName: '',
        price: 49.99,
        durationMonths: 1,
        description: '',
        features: '',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (formData.id) {
        await subscriptionService.update(formData.id, formData);
      } else {
        await subscriptionService.create(formData);
      }
      setIsModalOpen(false);
      loadSubscriptions();
    } catch (err) {
      console.error('Error saving subscription plan:', err);
      alert('Failed to save subscription plan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subscription plan?')) {
      try {
        await subscriptionService.delete(id);
        setSubscriptions(subscriptions.filter((s) => s.id !== id));
      } catch (err) {
        console.error('Error deleting plan:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Membership Plans</h2>
          <p className="text-gray-400 text-sm mt-1">Configure tiered pricing, durations, features, and membership perks.</p>
        </div>
        <Button leftIcon={<Plus size={18} />} onClick={() => handleOpenModal()}>
          Create New Plan
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((plan) => {
            const featureList = plan.features ? plan.features.split(',').map((f) => f.trim()) : [];
            return (
              <div key={plan.id} className="bg-darkCard border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 relative group overflow-hidden">
                <div className="absolute top-0 right-0 p-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors" onClick={() => handleOpenModal(plan)}>
                    <Edit2 size={14} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-colors" onClick={() => handleDelete(plan.id)}>
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Award size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.planName}</h3>
                </div>

                <div className="mb-4 flex items-end gap-1">
                  <span className="text-3xl font-bold text-white">Rs. {plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1"> / {plan.durationMonths} month{plan.durationMonths > 1 ? 's' : ''}</span>
                </div>

                <p className="text-sm text-gray-400 mb-6 min-h-[40px]">
                  {plan.description || 'No description provided.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-white/5">
                  {featureList.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subscription Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={formData.id ? 'Edit Plan Details' : 'Create Subscription Plan'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Plan Name"
            required
            placeholder="e.g. Premium Quarterly Pass"
            value={formData.planName}
            onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price (Rs.)"
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            />
            <Input
              label="Duration (Months)"
              type="number"
              required
              value={formData.durationMonths}
              onChange={(e) => setFormData({ ...formData, durationMonths: Number(e.target.value) })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-300">Description</label>
            <textarea
              className="w-full h-24 px-4 py-3 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none resize-none"
              placeholder="Brief summary of what this plan includes..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <Input
            label="Features (Comma separated)"
            placeholder="e.g. Gym Floor Access, Sauna, Free WiFi"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-white/5 mt-6">
            <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isSubmitting}>
              {formData.id ? 'Save Changes' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
