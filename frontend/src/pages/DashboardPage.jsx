import React, { useState, useEffect } from 'react';
import { Users, Award, Dumbbell, CreditCard, Clock, Package, TrendingUp, Plus, ArrowRight } from 'lucide-react';
import memberService from '../services/memberService';
import subscriptionService from '../services/subscriptionService';
import trainerService from '../services/trainerService';
import paymentService from '../services/paymentService';
import attendanceService from '../services/attendanceService';
import StatusBadge from '../components/StatusBadge';

const DashboardPage = ({ setActiveTab }) => {
  const [stats, setStats] = useState({
    membersCount: 0,
    subscriptionsCount: 0,
    trainersCount: 0,
    totalRevenue: 0,
    todayAttendance: 0,
  });
  const [recentMembers, setRecentMembers] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [membersRes, subsRes, trainersRes, paymentsRes, attendanceRes] = await Promise.allSettled([
        memberService.getAll(),
        subscriptionService.getAll(),
        trainerService.getAll(),
        paymentService.getAll(),
        attendanceService.getAll(),
      ]);

      const members = membersRes.status === 'fulfilled' ? membersRes.value.data : [];
      const subs = subsRes.status === 'fulfilled' ? subsRes.value.data : [];
      const trainers = trainersRes.status === 'fulfilled' ? trainersRes.value.data : [];
      const payments = paymentsRes.status === 'fulfilled' ? paymentsRes.value.data : [];
      const attendance = attendanceRes.status === 'fulfilled' ? attendanceRes.value.data : [];

      const revenue = payments.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

      setStats({
        membersCount: members.length,
        subscriptionsCount: subs.length,
        trainersCount: trainers.length,
        totalRevenue: revenue,
        todayAttendance: attendance.length,
      });

      setRecentMembers(members.slice(-4).reverse());
      setRecentPayments(payments.slice(-4).reverse());
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div>
      {/* Banner */}
      <div className="glass-card" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.08) 100%)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        marginBottom: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.4rem' }}>
            Welcome back, Administrator 👋
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Here is your gym's performance overview for today. 7 core modules active.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn btn-primary" onClick={() => setActiveTab('members')}>
            <Plus size={16} /> Add Member
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('attendance')}>
            <Clock size={16} /> Quick Check-In
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="stat-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper stat-icon-cyan">
            <Users />
          </div>
          <div>
            <div className="stat-value">{stats.membersCount}</div>
            <div className="stat-label">Total Members</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper stat-icon-purple">
            <Award />
          </div>
          <div>
            <div className="stat-value">{stats.subscriptionsCount}</div>
            <div className="stat-label">Active Plan Types</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper stat-icon-emerald">
            <TrendingUp />
          </div>
          <div>
            <div className="stat-value">Rs. {stats.totalRevenue.toFixed(2)}</div>
            <div className="stat-label">Total Revenue</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon-wrapper stat-icon-amber">
            <Dumbbell />
          </div>
          <div>
            <div className="stat-value">{stats.trainersCount}</div>
            <div className="stat-label">Pro Trainers</div>
          </div>
        </div>
      </div>

      {/* Two Column Layout for Dashboard Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
        {/* Recent Members */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recently Joined Members</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('members')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Plan</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentMembers.map((m) => (
                  <tr key={m.id}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{m.firstName} {m.lastName}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{m.email}</div>
                    </td>
                    <td>{m.subscriptionName}</td>
                    <td><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Transactions</h3>
            <button className="btn btn-sm btn-secondary" onClick={() => setActiveTab('payments')}>
              View All <ArrowRight size={14} />
            </button>
          </div>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Invoice</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPayments.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight: 600 }}>{p.memberName}</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{p.invoiceNumber}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-emerald)' }}>Rs. {p.amount}</td>
                    <td><StatusBadge status={p.paymentStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
