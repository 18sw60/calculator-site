import { useState } from 'react';

export default function PercentageCalculator() {
  const [tab, setTab] = useState(0);
  const [vals, setVals] = useState({});
  const [result, setResult] = useState(null);

  const tabs = [
    { label: 'X% of Y', desc: 'What is X% of Y?' },
    { label: '% Change', desc: 'Percentage increase or decrease' },
    { label: 'X is Y% of?', desc: 'Find the whole number' },
  ];

  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));

  const calculate = () => {
    const n = k => parseFloat(vals[k]);
    if (tab === 0) {
      if (!vals.pct || !vals.num) return;
      const r = (n('pct') / 100) * n('num');
      setResult({ main: r.toFixed(4).replace(/\.?0+$/, ''), label: `${vals.pct}% of ${vals.num}` });
    } else if (tab === 1) {
      if (!vals.old || !vals.new_) return;
      const change = ((n('new_') - n('old')) / n('old')) * 100;
      setResult({
        main: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`,
        label: change >= 0 ? '📈 Increase' : '📉 Decrease',
        sub: `From ${vals.old} to ${vals.new_}`
      });
    } else {
      if (!vals.part || !vals.pct2) return;
      const whole = (n('part') / n('pct2')) * 100;
      setResult({ main: whole.toFixed(4).replace(/\.?0+$/, ''), label: `${vals.part} is ${vals.pct2}% of this` });
    }
  };

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl mb-6">
        {tabs.map((t, i) => (
          <button
            key={i}
            onClick={() => { setTab(i); setResult(null); setVals({}); }}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-display font-600 transition-all duration-150 ${
              tab === i ? 'bg-white shadow text-brand-600' : 'text-surface-500 hover:text-surface-700'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="text-surface-400 text-sm mb-5">{tabs[tab].desc}</p>

      {/* Inputs */}
      <div className="space-y-4">
        {tab === 0 && <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Percentage (%)</label>
              <input className="calc-input" type="number" placeholder="e.g. 20" value={vals.pct || ''} onChange={e => set('pct', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Number</label>
              <input className="calc-input" type="number" placeholder="e.g. 150" value={vals.num || ''} onChange={e => set('num', e.target.value)} />
            </div>
          </div>
        </>}

        {tab === 1 && <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Original Value</label>
              <input className="calc-input" type="number" placeholder="e.g. 100" value={vals.old || ''} onChange={e => set('old', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">New Value</label>
              <input className="calc-input" type="number" placeholder="e.g. 120" value={vals.new_ || ''} onChange={e => set('new_', e.target.value)} />
            </div>
          </div>
        </>}

        {tab === 2 && <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">The Part</label>
              <input className="calc-input" type="number" placeholder="e.g. 30" value={vals.part || ''} onChange={e => set('part', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Is what % of?</label>
              <input className="calc-input" type="number" placeholder="e.g. 20" value={vals.pct2 || ''} onChange={e => set('pct2', e.target.value)} />
            </div>
          </div>
        </>}

        <button onClick={calculate} className="calc-btn">Calculate</button>
      </div>

      {/* Result */}
      {result && (
        <div className="result-box mt-6">
          <p className="text-sm text-blue-200 font-display font-600 uppercase tracking-widest mb-1">{result.label}</p>
          <p className="font-display font-800 text-4xl">{result.main}</p>
          {result.sub && <p className="text-blue-200 text-sm mt-1">{result.sub}</p>}
        </div>
      )}

      {/* Formula */}
      <div className="mt-6 p-4 bg-surface-50 rounded-xl">
        <p className="text-xs font-display font-600 text-surface-400 uppercase tracking-wider mb-2">Formula Used</p>
        {tab === 0 && <p className="font-mono text-sm text-surface-600">Result = (Percentage ÷ 100) × Number</p>}
        {tab === 1 && <p className="font-mono text-sm text-surface-600">Change% = ((New − Old) ÷ Old) × 100</p>}
        {tab === 2 && <p className="font-mono text-sm text-surface-600">Whole = (Part ÷ Percentage) × 100</p>}
      </div>
    </div>
  );
}
