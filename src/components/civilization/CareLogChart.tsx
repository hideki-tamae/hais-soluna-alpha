import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
export const CareLogChart = ({ logs }: any) => (
  <div className="h-64 bg-slate-900/40 p-4 rounded-2xl border border-slate-800">
    <h3 className="text-sm mb-4 text-slate-400">Care Economy resonance (HAIS Feed)</h3>
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={logs}><XAxis dataKey="category" hide /><Tooltip /><Bar dataKey="value" fill="#06b6d4" radius={[4, 4, 0, 0]} /></BarChart>
    </ResponsiveContainer>
  </div>
);
