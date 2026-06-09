import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardBody } from '../ui/Card';

const COLORS = ['#18181B', '#3F3F46', '#71717A', '#A1A1AA', '#D4D4D8', '#E4E4E7'];
const ACCENT_COLOR = '#FF4500';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border-2 border-[#18181B] px-5 py-4 shadow-[4px_4px_0px_0px_#18181B] rounded-none font-['Manrope',sans-serif]">
      {label && <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A] mb-2">{label}</p>}
      {payload.map((entry, i) => (
        <p key={i} className="text-xs font-bold uppercase tracking-wider text-[#09090B]">
          {entry.name}: <span className="text-sm font-['Outfit',sans-serif] font-black ml-1 text-[#FF4500]">{entry.value}</span>
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
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#71717A]">Last {chartData.length} months</span>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="leadGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={ACCENT_COLOR} stopOpacity={0.2} />
                <stop offset="95%" stopColor={ACCENT_COLOR} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'Manrope', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'Manrope', fontWeight: 'bold' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="leads"
              stroke={ACCENT_COLOR}
              strokeWidth={3}
              fill="url(#leadGrad)"
              dot={{ fill: '#18181B', stroke: ACCENT_COLOR, strokeWidth: 2, r: 4 }}
              activeDot={{ fill: ACCENT_COLOR, r: 6, strokeWidth: 0 }}
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
    isConverted: d._id === 'converted',
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Distribution</CardTitle>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry, i) => (
                <Cell 
                  key={i} 
                  fill={entry.isConverted ? ACCENT_COLOR : COLORS[i % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconSize={8}
              iconType="square"
              formatter={(val) => <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#09090B] ml-1">{val}</span>}
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

  // Find max value to highlight it
  const maxCount = Math.max(...chartData.map(d => d.count), 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Source</CardTitle>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E4E4E7" horizontal vertical={false} />
            <XAxis dataKey="source" tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'Manrope', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#71717A', fontSize: 10, fontFamily: 'Manrope', fontWeight: 'bold' }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" radius={[0, 0, 0, 0]} maxBarSize={48}>
              {chartData.map((entry, i) => (
                <Cell 
                  key={i} 
                  fill={entry.count === maxCount ? ACCENT_COLOR : '#18181B'} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
}