import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardBody } from '../ui/Card';

const COLORS = ['#10B981', '#06D6A0', '#3B82F6', '#8B5CF6', '#F59E0B', '#EC4899', '#EF4444', '#64748B'];

// Custom tooltip
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0D1117] border border-[#1E2D45] rounded-[10px] px-3 py-2 shadow-xl">
      {label && <p className="text-[10px] font-mono text-slate-500 mb-1">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-mono font-medium" style={{ color: entry.color || '#10B981' }}>
          {entry.name}: <span className="text-white">{entry.value}</span>
        </p>
      ))}
    </div>
  );
};

export function MonthlyGrowthChart({ data = [] }) {
  const chartData = data.map((d) => ({
    month: `${d._id?.year}-${String(d._id?.month).padStart(2, '0')}`,
    leads: d.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Lead Growth</CardTitle>
        <span className="text-xs font-mono text-slate-600">Last {chartData.length} months</span>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#leadGrad)"
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              activeDot={{ fill: '#10B981', r: 5, strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}

export function StatusDistributionChart({ data = [] }) {
  const STATUS_LABELS = {
    new: 'New', contacted: 'Contacted', qualified: 'Qualified',
    proposal_sent: 'Proposal', negotiation: 'Negotiation',
    converted: 'Converted', lost: 'Lost',
  };

  const chartData = data.map((d) => ({
    name: STATUS_LABELS[d._id] || d._id,
    value: d.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconSize={8}
              iconType="circle"
              formatter={(val) => <span className="text-xs text-slate-400 font-mono">{val}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}

export function SourceBarChart({ data = [] }) {
  const SOURCE_LABELS = {
    website: 'Website', referral: 'Referral', partner: 'Partner',
    advertisement: 'Ads', cold_outreach: 'Cold', social_media: 'Social',
    event: 'Event', other: 'Other',
  };

  const chartData = data.map((d) => ({
    source: SOURCE_LABELS[d._id] || d._id,
    count: d.count,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Source</CardTitle>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E2D45" horizontal vertical={false} />
            <XAxis dataKey="source" tick={{ fill: '#475569', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#475569', fontSize: 10, fontFamily: 'DM Mono' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40}>
              {chartData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}
