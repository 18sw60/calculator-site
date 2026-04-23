import { useState } from 'react';

export function SimpleInterestCalculator() {
  const [vals, setVals] = useState({});
  const [result, setResult] = useState(null);
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));
  const fmt = n => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const calculate = () => {
    const P = parseFloat(vals.principal);
    const R = parseFloat(vals.rate);
    const T = parseFloat(vals.time);
    if (!P || !R || !T) return;
    const si = (P * R * T) / 100;
    setResult({ si, total: P + si, principal: P });
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Principal Amount ($)</label>
          <input className="calc-input" type="number" placeholder="e.g. 10000" value={vals.principal || ''} onChange={e => set('principal', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Rate of Interest (% per year)</label>
            <input className="calc-input" type="number" placeholder="e.g. 5" step="0.1" value={vals.rate || ''} onChange={e => set('rate', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Time Period (years)</label>
            <input className="calc-input" type="number" placeholder="e.g. 3" step="0.5" value={vals.time || ''} onChange={e => set('time', e.target.value)} />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn">Calculate</button>
      </div>
      {result && (
        <div className="mt-6 space-y-4">
          <div className="result-box">
            <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-1">Simple Interest</p>
            <p className="font-display font-800 text-4xl">${fmt(result.si)}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-surface-50 rounded-xl p-4 text-center border border-surface-200">
              <p className="font-display font-800 text-xl text-surface-800">${fmt(result.principal)}</p>
              <p className="text-xs text-surface-400 font-display font-600 mt-1">Principal</p>
            </div>
            <div className="bg-surface-50 rounded-xl p-4 text-center border border-surface-200">
              <p className="font-display font-800 text-xl text-surface-800">${fmt(result.total)}</p>
              <p className="text-xs text-surface-400 font-display font-600 mt-1">Total Amount</p>
            </div>
          </div>
          <div className="p-4 bg-surface-50 rounded-xl">
            <p className="text-xs font-display font-600 text-surface-400 uppercase tracking-wider mb-2">Formula</p>
            <p className="font-mono text-sm text-surface-600">SI = (P × R × T) / 100</p>
            <p className="font-mono text-sm text-surface-500 mt-1">
              = ({vals.principal} × {vals.rate} × {vals.time}) / 100 = <strong>${fmt(result.si)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimpleInterestCalculator;
