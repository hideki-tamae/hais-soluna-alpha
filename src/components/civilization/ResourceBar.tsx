export const ResourceBar = ({ resources }: any) => (
  <div className="flex gap-4 p-4 bg-slate-900/50 backdrop-blur-md border-b border-slate-800 sticky top-0 z-50">
    {Object.entries(resources || {}).map(([k, v]: any) => (
      <div key={k} className="flex flex-col"><span className="text-[10px] uppercase text-slate-500">{k}</span><span className="font-mono text-cyan-400">{v}</span></div>
    ))}
  </div>
);
