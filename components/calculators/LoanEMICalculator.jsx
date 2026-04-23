import { useState } from 'react';

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LoanEMICalculator() {
  const [vals, setVals] = useState({});
  const [result, setResult] = useState(null);
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));

  const calculate = () => {
    const P = parseFloat(vals.principal);
    const annualRate = parseFloat(vals.rate);
    const years = parseFloat(vals.years);
    if (!P || !annualRate || !years) return;

    const r = annualRate / 100 / 12;
    const n = years * 12;
    const emi = r === 0 ? P / n : (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // First 12 months of amortization
    const schedule = [];
    let balance = P;
    for (let m = 1; m <= Math.min(n, 12); m++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      balance -= principalPart;
      schedule.push({ month: m, emi, principal: principalPart, interest: interestPart, balance: Math.max(balance, 0) });
    }

    setResult({ emi, totalPayment, totalInterest, principal: P, schedule });
  };

  const pct = result ? (result.totalInterest / result.totalPayment) * 100 : 0;

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Loan Amount ($)</label>
          <input className="calc-input" type="number" placeholder="e.g. 500000" value={vals.principal || ''} onChange={e => set('principal', e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Annual Interest Rate (%)</label>
            <input className="calc-input" type="number" placeholder="e.g. 7.5" step="0.1" value={vals.rate || ''} onChange={e => set('rate', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Loan Tenure (years)</label>
            <input className="calc-input" type="number" placeholder="e.g. 20" value={vals.years || ''} onChange={e => set('years', e.target.value)} />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn">Calculate EMI</button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          {/* EMI highlight */}
          <div className="result-box">
            <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-1">Monthly EMI</p>
            <p className="font-display font-800 text-5xl">${fmt(result.emi)}</p>
            <p className="text-blue-200 text-sm mt-1">per month</p>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Principal', value: `$${fmt(result.principal)}` },
              { label: 'Total Interest', value: `$${fmt(result.totalInterest)}` },
              { label: 'Total Payment', value: `$${fmt(result.totalPayment)}` },
            ].map(s => (
              <div key={s.label} className="bg-surface-50 rounded-xl p-3 text-center border border-surface-200">
                <p className="font-display font-800 text-base text-surface-800 truncate">{s.value}</p>
                <p className="text-xs text-surface-400 font-display font-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Pie bar */}
          <div>
            <div className="flex rounded-full overflow-hidden h-4">
              <div className="bg-brand-400" style={{ width: `${100 - pct}%` }} />
              <div className="bg-accent-400" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex gap-4 mt-2 text-xs font-display font-600">
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-brand-400 inline-block" />Principal ({(100 - pct).toFixed(1)}%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-accent-400 inline-block" />Interest ({pct.toFixed(1)}%)</span>
            </div>
          </div>

          {/* Amortization (first 12 months) */}
          <div>
            <p className="font-display font-700 text-sm text-surface-600 mb-2">Amortization Schedule (first 12 months)</p>
            <div className="rounded-xl overflow-auto border border-surface-200">
              <table className="w-full text-sm min-w-[500px]">
                <thead className="bg-surface-50">
                  <tr>
                    {['Month', 'EMI', 'Principal', 'Interest', 'Balance'].map(h => (
                      <th key={h} className="text-right first:text-left px-3 py-2.5 font-display font-600 text-surface-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.schedule.map(row => (
                    <tr key={row.month} className="border-t border-surface-100 hover:bg-surface-50">
                      <td className="px-3 py-2 font-mono text-surface-600">{row.month}</td>
                      <td className="px-3 py-2 font-mono text-surface-800 text-right">${fmt(row.emi)}</td>
                      <td className="px-3 py-2 font-mono text-brand-600 text-right">${fmt(row.principal)}</td>
                      <td className="px-3 py-2 font-mono text-accent-600 text-right">${fmt(row.interest)}</td>
                      <td className="px-3 py-2 font-mono text-surface-500 text-right">${fmt(row.balance)}</td>
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
