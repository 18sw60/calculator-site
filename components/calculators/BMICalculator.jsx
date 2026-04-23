import { useState } from 'react';

const BMI_CATEGORIES = [
  { range: [0, 18.5],  label: 'Underweight', color: 'text-blue-600',   bg: 'bg-blue-50',   bar: 'bg-blue-400' },
  { range: [18.5, 25], label: 'Normal',       color: 'text-green-600',  bg: 'bg-green-50',  bar: 'bg-green-400' },
  { range: [25, 30],   label: 'Overweight',   color: 'text-yellow-600', bg: 'bg-yellow-50', bar: 'bg-yellow-400' },
  { range: [30, 100],  label: 'Obese',        color: 'text-red-600',    bg: 'bg-red-50',    bar: 'bg-red-400' },
];

function getCategory(bmi) {
  return BMI_CATEGORIES.find(c => bmi >= c.range[0] && bmi < c.range[1]) || BMI_CATEGORIES[3];
}

export default function BMICalculator() {
  const [unit, setUnit] = useState('metric');
  const [vals, setVals] = useState({});
  const [result, setResult] = useState(null);
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));

  const calculate = () => {
    let bmi;
    if (unit === 'metric') {
      const h = parseFloat(vals.heightCm) / 100;
      const w = parseFloat(vals.weightKg);
      if (!h || !w) return;
      bmi = w / (h * h);
    } else {
      const h = parseFloat(vals.heightIn);
      const w = parseFloat(vals.weightLbs);
      if (!h || !w) return;
      bmi = (703 * w) / (h * h);
    }
    setResult({ bmi: bmi.toFixed(1), cat: getCategory(bmi) });
  };

  // Gauge bar position (0–100%)
  const gaugePos = result ? Math.min(Math.max((parseFloat(result.bmi) / 40) * 100, 0), 100) : 0;

  return (
    <div>
      {/* Unit Toggle */}
      <div className="flex gap-1 bg-surface-100 p-1 rounded-xl mb-6 w-fit">
        {['metric', 'imperial'].map(u => (
          <button
            key={u}
            onClick={() => { setUnit(u); setResult(null); setVals({}); }}
            className={`py-2 px-5 rounded-lg text-sm font-display font-600 transition-all duration-150 capitalize ${
              unit === u ? 'bg-white shadow text-brand-600' : 'text-surface-500'
            }`}
          >
            {u}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {unit === 'metric' ? (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Height (cm)</label>
              <input className="calc-input" type="number" placeholder="e.g. 175" value={vals.heightCm || ''} onChange={e => set('heightCm', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Weight (kg)</label>
              <input className="calc-input" type="number" placeholder="e.g. 70" value={vals.weightKg || ''} onChange={e => set('weightKg', e.target.value)} />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Height (inches)</label>
              <input className="calc-input" type="number" placeholder="e.g. 69" value={vals.heightIn || ''} onChange={e => set('heightIn', e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Weight (lbs)</label>
              <input className="calc-input" type="number" placeholder="e.g. 154" value={vals.weightLbs || ''} onChange={e => set('weightLbs', e.target.value)} />
            </div>
          </div>
        )}

        <button onClick={calculate} className="calc-btn">Calculate BMI</button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Main result */}
          <div className={`rounded-2xl p-6 ${result.cat.bg} border-2`} style={{ borderColor: 'transparent' }}>
            <p className="text-sm font-display font-600 text-surface-500 uppercase tracking-widest mb-1">Your BMI</p>
            <div className="flex items-end gap-3">
              <span className={`font-display font-800 text-5xl ${result.cat.color}`}>{result.bmi}</span>
              <span className={`font-display font-700 text-xl ${result.cat.color} mb-1`}>{result.cat.label}</span>
            </div>
          </div>

          {/* Gauge */}
          <div>
            <div className="flex justify-between text-xs font-mono text-surface-400 mb-1">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
            <div className="relative h-4 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-200" />
              <div className="flex-1 bg-green-200" />
              <div className="flex-1 bg-yellow-200" />
              <div className="flex-1 bg-red-200" />
              <div
                className="absolute top-0 w-1 h-full bg-surface-800 rounded-full shadow"
                style={{ left: `${gaugePos}%`, transform: 'translateX(-50%)' }}
              />
            </div>
            <div className="flex justify-between text-xs font-display font-600 text-surface-400 mt-1">
              <span className="text-blue-500">Underweight</span>
              <span className="text-green-500">Normal</span>
              <span className="text-yellow-500">Overweight</span>
              <span className="text-red-500">Obese</span>
            </div>
          </div>

          {/* BMI Table */}
          <div className="rounded-xl overflow-hidden border border-surface-200">
            <table className="w-full text-sm">
              <thead className="bg-surface-50">
                <tr>
                  <th className="text-left px-4 py-2.5 font-display font-600 text-surface-600">BMI Range</th>
                  <th className="text-left px-4 py-2.5 font-display font-600 text-surface-600">Category</th>
                </tr>
              </thead>
              <tbody>
                {[['Below 18.5', 'Underweight'], ['18.5 – 24.9', 'Normal weight'], ['25.0 – 29.9', 'Overweight'], ['30.0 and above', 'Obese']].map(([range, cat]) => (
                  <tr key={cat} className={`border-t border-surface-100 ${result.cat.label === cat.split(' ')[0] ? result.cat.bg : ''}`}>
                    <td className="px-4 py-2.5 font-mono text-surface-600">{range}</td>
                    <td className="px-4 py-2.5 font-display font-500 text-surface-700">{cat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
