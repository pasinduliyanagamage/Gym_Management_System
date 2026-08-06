import React, { useState } from 'react';
import { Save, Shield, Bell, Moon, Sun, Monitor, Database, Upload } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import InfoCard from '../components/cards/InfoCard';

const Settings = () => {
  const [themePref, setThemePref] = useState('dark');
  
  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-2xl font-bold text-white">System Settings</h2>
        <p className="text-gray-400 text-sm mt-1">Configure your gym management application.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Profile Settings */}
          <InfoCard>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Shield className="text-primary" size={20} />
              <h3 className="text-lg font-semibold text-white">Admin Profile</h3>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-darkBg border-2 border-primary/20 flex items-center justify-center text-4xl text-gray-500 mb-3">
                  A
                </div>
                <button className="text-sm text-primary hover:underline flex items-center gap-1">
                  <Upload size={14} /> Change Photo
                </button>
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="Admin" />
                  <Input label="Last Name" defaultValue="User" />
                </div>
                <Input label="Email Address" type="email" defaultValue="admin@gymmaster.com" />
                <Input label="Phone Number" defaultValue="+94 77 123 4567" />
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-white/5">
              <Button leftIcon={<Save size={16} />}>Save Changes</Button>
            </div>
          </InfoCard>

          {/* Security Settings */}
          <InfoCard>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Shield className="text-primary" size={20} />
              <h3 className="text-lg font-semibold text-white">Security</h3>
            </div>
            
            <div className="space-y-4 max-w-md">
              <Input label="Current Password" type="password" />
              <Input label="New Password" type="password" />
              <Input label="Confirm New Password" type="password" />
              <Button variant="secondary" className="mt-2">Update Password</Button>
            </div>
          </InfoCard>
        </div>

        <div className="space-y-6">
          {/* Preferences */}
          <InfoCard>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Monitor className="text-primary" size={20} />
              <h3 className="text-lg font-semibold text-white">Appearance</h3>
            </div>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-darkBg cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 text-white">
                  <Moon size={18} className="text-gray-400" /> Dark Mode
                </div>
                <input 
                  type="radio" 
                  name="theme" 
                  checked={themePref === 'dark'} 
                  onChange={() => setThemePref('dark')}
                  className="text-primary focus:ring-primary bg-darkSurface border-white/20"
                />
              </label>
              
              <label className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-darkBg cursor-pointer hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3 text-white">
                  <Sun size={18} className="text-gray-400" /> Light Mode
                </div>
                <input 
                  type="radio" 
                  name="theme" 
                  checked={themePref === 'light'} 
                  onChange={() => setThemePref('light')}
                  className="text-primary focus:ring-primary bg-darkSurface border-white/20"
                />
              </label>
            </div>
          </InfoCard>

          {/* Notifications */}
          <InfoCard>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Bell className="text-primary" size={20} />
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
            </div>
            
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Email Alerts for New Members</span>
                <input type="checkbox" defaultChecked className="rounded border-white/20 bg-darkBg text-primary focus:ring-primary focus:ring-offset-darkSurface" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Daily Attendance Summary</span>
                <input type="checkbox" defaultChecked className="rounded border-white/20 bg-darkBg text-primary focus:ring-primary focus:ring-offset-darkSurface" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Payment Failure Alerts</span>
                <input type="checkbox" defaultChecked className="rounded border-white/20 bg-darkBg text-primary focus:ring-primary focus:ring-offset-darkSurface" />
              </label>
            </div>
          </InfoCard>

          {/* System */}
          <InfoCard>
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <Database className="text-primary" size={20} />
              <h3 className="text-lg font-semibold text-white">System Info</h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <div className="flex justify-between">
                <span>Version</span>
                <span className="text-white">v2.4.1</span>
              </div>
              <div className="flex justify-between">
                <span>Last Backup</span>
                <span className="text-white">Today, 03:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Database Status</span>
                <span className="text-green-400">Healthy</span>
              </div>
            </div>
            
            <Button variant="secondary" className="w-full text-sm">Initiate Manual Backup</Button>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Settings;
