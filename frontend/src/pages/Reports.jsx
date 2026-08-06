import React from 'react';
import { Download, FileText, FileSpreadsheet, Filter } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import ChartCard from '../components/cards/ChartCard';
import Button from '../components/common/Button';
import InfoCard from '../components/cards/InfoCard';

const membershipData = [
  { name: '1 Month', value: 400 },
  { name: '3 Months', value: 300 },
  { name: '6 Months', value: 300 },
  { name: '1 Year', value: 200 },
];
const COLORS = ['#FFC107', '#FFA000', '#FF8F00', '#FF6F00'];

const growthData = [
  { month: 'Jan', members: 800 },
  { month: 'Feb', members: 850 },
  { month: 'Mar', members: 920 },
  { month: 'Apr', members: 1050 },
  { month: 'May', members: 1100 },
  { month: 'Jun', members: 1248 },
];

const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Analytics & Reports</h2>
          <p className="text-gray-400 text-sm mt-1">Visualize gym performance and export data.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leftIcon={<Filter size={18} />}>Last 6 Months</Button>
          <Button leftIcon={<Download size={18} />}>Export All</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard 
          title="Membership Distribution" 
          subtitle="Active plans by duration"
          action={
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white bg-darkBg rounded transition-colors" title="Export PDF"><FileText size={16}/></button>
              <button className="p-2 text-gray-400 hover:text-white bg-darkBg rounded transition-colors" title="Export Excel"><FileSpreadsheet size={16}/></button>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={membershipData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {membershipData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1B1B1B', borderColor: '#ffffff10', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Member Growth" 
          subtitle="Total active members over time"
          action={
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white bg-darkBg rounded transition-colors"><FileText size={16}/></button>
              <button className="p-2 text-gray-400 hover:text-white bg-darkBg rounded transition-colors"><FileSpreadsheet size={16}/></button>
            </div>
          }
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff50" axisLine={false} tickLine={false} />
              <YAxis stroke="#ffffff50" axisLine={false} tickLine={false} />
              <RechartsTooltip 
                contentStyle={{ backgroundColor: '#1B1B1B', borderColor: '#ffffff10', borderRadius: '8px' }}
                cursor={{ fill: '#ffffff05' }}
              />
              <Bar dataKey="members" fill="#FFC107" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <InfoCard>
          <h3 className="font-semibold text-white mb-2">Generate Financial Report</h3>
          <p className="text-sm text-gray-400 mb-4">Detailed breakdown of revenue, expenses, and pending payments.</p>
          <Button variant="secondary" className="w-full">Generate</Button>
        </InfoCard>
        <InfoCard>
          <h3 className="font-semibold text-white mb-2">Attendance Summary</h3>
          <p className="text-sm text-gray-400 mb-4">Export member check-in data and class popularity metrics.</p>
          <Button variant="secondary" className="w-full">Generate</Button>
        </InfoCard>
        <InfoCard>
          <h3 className="font-semibold text-white mb-2">Inventory Audit</h3>
          <p className="text-sm text-gray-400 mb-4">Complete list of equipment status, maintenance logs and value.</p>
          <Button variant="secondary" className="w-full">Generate</Button>
        </InfoCard>
      </div>
    </div>
  );
};

export default Reports;
