import { useState } from 'react';

const COMPOUND_FREQ = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-Annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 },
];

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CompoundInterestCalculator() {
  const [vals, setVals] = useState({ freq: 12 });
  const [result, setResult] = useState(null);
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));

  const calculate = () => {
    const P = parseFloat(vals.principal);
    const r = parseFloat(vals.rate) / 100;
    const n = parseFloat(vals.freq);
    const t = parseFloat(vals.years);
    if (!P || !r || !n || !t) return;

    const A = P * Math.pow(1 + r / n, n * t);
    const interest = A - P;

    // Year-by-year breakdown (up to 10 rows)
    const rows = [];
    for (let y = 1; y <= Math.min(t, 10); y++) {
      rows.push({
        year: y,
        balance: P * Math.pow(1 + r / n, n * y),
      });
    }

    setResult({ total: A, interest, principal: P, rows });
  };

  const pct = result ? (result.interest / result.total) * 100 : 0;

  return (
    <div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Principal Amount ($)</label>
            <input className="calc-input" type="number" placeholder="e.g. 10000" value={vals.principal || ''} onChange={e => set('principal', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Annual Interest Rate (%)</label>
            <input className="calc-input" type="number" placeholder="e.g. 8" step="0.1" value={vals.rate || ''} onChange={e => set('rate', e.target.value)} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Time Period (years)</label>
            <input className="calc-input" type="number" placeholder="e.g. 10" value={vals.years || ''} onChange={e => set('years', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Compound Frequency</label>
            <select className="calc-input bg-white" value={vals.freq} onChange={e => set('freq', e.target.value)}>
              {COMPOUND_FREQ.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>
        </div>

        <button onClick={calculate} className="calc-btn">Calculate</button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Total Value', value: `$${fmt(result.total)}`, highlight: true },
              { label: 'Principal', value: `$${fmt(result.principal)}`, highlight: false },
              { label: 'Interest Earned', value: `$${fmt(result.interest)}`, highlight: false },
            ].map(c => (
              <div key={c.label} className={`rounded-xl p-4 text-center ${c.highlight ? 'bg-gradient-to-br from-brand-500 to-brand-700 text-white' : 'bg-surface-50 border border-surface-200'}`}>
                <p className={`text-xs font-display font-600 uppercase tracking-wider mb-1 ${c.highlight ? 'text-blue-200' : 'text-surface-400'}`}>{c.label}</p>
                <p className={`font-display font-800 text-lg ${c.highlight ? 'text-white' : 'text-surface-800'}`}>{c.value}</p>
              </div>
            ))}
          </div>

          {/* Stacked bar */}
          <div>
            <div className="flex rounded-full overflow-hidden h-4">
              <div className="bg-brand-400 transition-all duration-500" style={{ width: `${100 - pct}%` }} />
              <div className="bg-accent-400 transition-all duration-500" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex gap-4 mt-2 text-xs font-display font-600">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-brand-400 inline-block" />Principal</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent-400 inline-block" />Interest ({pct.toFixed(1)}%)</span>
            </div>
          </div>

          {/* Year-by-year table */}
          <div>
            <p className="font-display font-700 text-sm text-surface-600 mb-2">Year-by-Year Growth</p>
            <div className="rounded-xl overflow-hidden border border-surface-200">
              <table className="w-full text-sm">
                <thead className="bg-surface-50">
                  <tr>
                    <th className="text-left px-4 py-2.5 font-display font-600 text-surface-500">Year</th>
                    <th className="text-right px-4 py-2.5 font-display font-600 text-surface-500">Balance</th>
                    <th className="text-right px-4 py-2.5 font-display font-600 text-surface-500">Interest Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {result.rows.map(row => (
                    <tr key={row.year} className="border-t border-surface-100 hover:bg-surface-50">
                      <td className="px-4 py-2.5 font-mono text-surface-600">{row.year}</td>
                      <td className="px-4 py-2.5 font-mono text-surface-800 text-right font-600">${fmt(row.balance)}</td>
                      <td className="px-4 py-2.5 font-mono text-emerald-600 text-right">+${fmt(row.balance - result.principal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
