import React from 'react';

const StatusBadge = ({ status }) => {
  if (!status) return null;
  const normalized = status.toString().toLowerCase().replace(/_/g, ' ');

  let badgeClass = 'badge-active';
  if (['inactive', 'expired', 'failed', 'absent', 'cancelled'].includes(normalized)) {
    badgeClass = 'badge-inactive';
  } else if (['pending', 'maintenance required', 'on leave', 'late'].includes(normalized)) {
    badgeClass = 'badge-pending';
  }

  return (
    <span className={`badge ${badgeClass}`}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
      {status.toString().replace(/_/g, ' ')}
    </span>
  );
};

export default StatusBadge;
