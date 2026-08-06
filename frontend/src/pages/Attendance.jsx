import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, CheckCircle, XCircle, Clock, LogIn, LogOut, Trash2 } from 'lucide-react';
import InfoCard from '../components/cards/InfoCard';
import DataTable from '../components/tables/DataTable';
import Button from '../components/common/Button';
import attendanceService from '../services/attendanceService';
import memberService from '../services/memberService';
import { cn } from '../utils/cn';

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      let memData = [];
      let attData = [];
      
      try {
        const memRes = await memberService.getAll();
        memData = memRes.data || [];
        setMembers(memData);
        if (memData.length > 0) {
          setSelectedMemberId(memData[0].id);
        }
      } catch (err) {
        console.error('Failed to load members:', err);
      }

      try {
        const attRes = await attendanceService.getAll();
        attData = attRes.data || [];
        setAttendance(attData);
      } catch (err) {
        console.error('Failed to load attendance logs:', err);
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

  const columns = [
    { 
      header: 'Member', 
      render: (row) => <span className="font-bold text-white">{row.memberName}</span>
    },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Check-In Time', 
      render: (row) => (
        <span className="font-semibold text-green-400">
          {row.checkInTime ? row.checkInTime.toString().substring(0, 5) : 'N/A'}
        </span>
      ) 
    },
    { 
      header: 'Check-Out Time', 
      render: (row) => (
        row.checkOutTime ? (
          <span className="font-semibold text-primary">
            {row.checkOutTime.toString().substring(0, 5)}
          </span>
        ) : (
          <Button 
            variant="secondary" 
            className="h-8 px-3 text-xs py-1" 
            leftIcon={<LogOut size={14} />}
            onClick={() => handleCheckOut(row.id)}
          >
            Check Out Now
          </Button>
        )
      ) 
    },
    { 
      header: 'Status', 
      render: (row) => {
        const status = row.status || 'PRESENT';
        return (
          <span className={cn(
            "px-2.5 py-1 rounded-full text-xs font-medium",
            status === 'PRESENT' && "bg-green-500/10 text-green-400",
            status === 'ABSENT' && "bg-red-500/10 text-red-400",
            status === 'LATE' && "bg-yellow-500/10 text-yellow-400"
          )}>
            {status}
          </span>
        );
      }
    },
    {
      header: 'Actions',
      className: 'text-right',
      cellClassName: 'text-right',
      render: (row) => (
        <button 
          className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
          onClick={() => handleDelete(row.id)}
          title="Delete Log"
        >
          <Trash2 size={16} />
        </button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Attendance Tracking</h2>
        <p className="text-gray-400 text-sm mt-1">Real-time member check-in / check-out logs and daily presence records.</p>
      </div>

      <div className="bg-darkSurface border border-white/5 p-4 rounded-2xl flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 text-primary shrink-0">
          <CheckCircle size={20} />
          <h3 className="font-semibold text-white">Quick Check-In</h3>
        </div>
        <div className="flex-1 w-full">
          <select
            className="w-full h-11 px-4 rounded-lg bg-darkBg border border-white/10 text-sm text-white focus:border-primary/50 outline-none"
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
        <Button leftIcon={<LogIn size={18} />} onClick={handleCheckIn} className="w-full sm:w-auto h-11">
          Confirm Check-In
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-darkSurface border border-white/5 rounded-2xl p-6 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3 text-green-400 mb-2">
            <CheckCircle size={24} />
            <span className="font-semibold text-lg">Present Today</span>
          </div>
          <span className="text-4xl font-bold text-white">
            {attendance.filter(a => a.status === 'PRESENT' && a.date === new Date().toISOString().substring(0, 10)).length}
          </span>
          <span className="text-sm text-gray-500">Checked in members</span>
        </div>

        <div className="bg-darkSurface border border-white/5 rounded-2xl p-6 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3 text-yellow-400 mb-2">
            <Clock size={24} />
            <span className="font-semibold text-lg">Late Check-ins</span>
          </div>
          <span className="text-4xl font-bold text-white">
            {attendance.filter(a => a.status === 'LATE' && a.date === new Date().toISOString().substring(0, 10)).length}
          </span>
          <span className="text-sm text-gray-500">Arrived past schedule</span>
        </div>
        
        <div className="bg-darkSurface border border-white/5 rounded-2xl p-6 flex flex-col justify-center gap-2">
          <div className="flex items-center gap-3 text-red-400 mb-2">
            <XCircle size={24} />
            <span className="font-semibold text-lg">Absent</span>
          </div>
          <span className="text-4xl font-bold text-white">
            {attendance.filter(a => a.status === 'ABSENT' && a.date === new Date().toISOString().substring(0, 10)).length}
          </span>
          <span className="text-sm text-gray-500">Expected but no-show</span>
        </div>
      </div>

      <div className="bg-darkSurface border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-darkBg/50">
          <CalendarIcon className="text-primary" size={20} />
          <h3 className="font-semibold text-white">Attendance Log</h3>
        </div>
        <DataTable 
          columns={columns} 
          data={attendance} 
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default Attendance;
