import React, { useState, useEffect } from 'react';
import { Search, Clock, LogIn, LogOut, Trash2, Calendar, UserCheck } from 'lucide-react';
import attendanceService from '../services/attendanceService';
import memberService from '../services/memberService';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';

const AttendancePage = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attRes, memRes] = await Promise.all([
        attendanceService.getAll(),
        memberService.getAll(),
      ]);
      setAttendance(attRes.data);
      setMembers(memRes.data);
      if (memRes.data.length > 0) {
        setSelectedMemberId(memRes.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load attendance logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!selectedMemberId) {
      alert('Please select a member to check in.');
      return;
    }
    try {
      await attendanceService.checkIn(selectedMemberId);
      loadData();
    } catch (err) {
      console.error('Error during check-in:', err);
      alert('Check-in failed.');
    }
  };

  const handleCheckOut = async (id) => {
    try {
      await attendanceService.checkOut(id);
      loadData();
    } catch (err) {
      console.error('Error during check-out:', err);
      alert('Check-out failed.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendance log?')) {
      try {
        await attendanceService.delete(id);
        setAttendance(attendance.filter((a) => a.id !== id));
      } catch (err) {
        console.error('Error deleting attendance:', err);
      }
    }
  };

  const filteredAttendance = attendance.filter((a) => {
    const name = a.memberName ? a.memberName.toLowerCase() : '';
    const query = search.toLowerCase();
    return name.includes(query);
  });

  return (
    <div className="page-wrapper">
      <div className="page-header">
        <div>
          <h1 className="page-title">Attendance Tracking</h1>
          <p className="page-subtitle">Real-time member check-in / check-out logs and daily presence records</p>
        </div>
      </div>

      {/* Quick Check-In Bar */}
      <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
          <UserCheck size={24} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Quick Member Check-In</h3>
        </div>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <select
            className="form-select"
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
          >
            <option value="">-- Choose Member to Check In --</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.firstName} {m.lastName} ({m.email})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleCheckIn}>
          <LogIn size={18} /> Confirm Check-In
        </button>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search attendance by member name..."
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
                <th>Member Name</th>
                <th>Date</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendance.length === 0 ? (
                <tr>
                  <td colSpan="6" className="empty-state">
                    No attendance records logged today.
                  </td>
                </tr>
              ) : (
                filteredAttendance.map((log) => (
                  <tr key={log.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{log.memberName}</div>
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{log.date}</td>
                    <td>
                      <span style={{ fontWeight: 600, color: 'var(--accent-emerald)' }}>
                        {log.checkInTime ? log.checkInTime.toString().substring(0, 5) : 'N/A'}
                      </span>
                    </td>
                    <td>
                      {log.checkOutTime ? (
                        <span style={{ fontWeight: 600, color: 'var(--accent-cyan)' }}>
                          {log.checkOutTime.toString().substring(0, 5)}
                        </span>
                      ) : (
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => handleCheckOut(log.id)}
                          style={{ color: 'var(--accent-amber)', borderColor: 'rgba(245, 158, 11, 0.4)' }}
                        >
                          <LogOut size={14} /> Check Out Now
                        </button>
                      )}
                    </td>
                    <td><StatusBadge status={log.status} /></td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn-icon btn-icon-danger" onClick={() => handleDelete(log.id)} title="Delete Log">
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
    </div>
  );
};

export default AttendancePage;
