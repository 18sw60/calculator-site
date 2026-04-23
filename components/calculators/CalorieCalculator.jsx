import { useState } from 'react';

const ACTIVITY = [
  { label: 'Sedentary (little or no exercise)', value: 1.2 },
  { label: 'Light (exercise 1–3 days/week)', value: 1.375 },
  { label: 'Moderate (exercise 3–5 days/week)', value: 1.55 },
  { label: 'Active (hard exercise 6–7 days/week)', value: 1.725 },
  { label: 'Very Active (very hard exercise / physical job)', value: 1.9 },
];

export default function CalorieCalculator() {
  const [vals, setVals] = useState({ gender: 'male', activity: 1.55 });
  const [result, setResult] = useState(null);
  const set = (k, v) => setVals(prev => ({ ...prev, [k]: v }));

  const calculate = () => {
    const age = parseFloat(vals.age);
    const weight = parseFloat(vals.weight); // kg
    const height = parseFloat(vals.height); // cm
    const activity = parseFloat(vals.activity);
    if (!age || !weight || !height) return;

    // Mifflin-St Jeor Equation
    let bmr;
    if (vals.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    const tdee = bmr * activity;
    setResult({
      bmr: Math.round(bmr),
      maintain: Math.round(tdee),
      mild_loss: Math.round(tdee - 250),
      loss: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
    });
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-2">
          {['male', 'female'].map(g => (
            <button
              key={g}
              onClick={() => set('gender', g)}
              className={`flex-1 py-2.5 rounded-xl font-display font-600 text-sm capitalize transition-all ${
                vals.gender === g ? 'bg-brand-500 text-white shadow' : 'bg-surface-100 text-surface-600 hover:bg-surface-200'
              }`}
            >
              {g === 'male' ? '♂' : '♀'} {g}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Age (years)</label>
            <input className="calc-input" type="number" placeholder="25" value={vals.age || ''} onChange={e => set('age', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Weight (kg)</label>
            <input className="calc-input" type="number" placeholder="70" value={vals.weight || ''} onChange={e => set('weight', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Height (cm)</label>
            <input className="calc-input" type="number" placeholder="175" value={vals.height || ''} onChange={e => set('height', e.target.value)} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Activity Level</label>
          <select className="calc-input bg-white" value={vals.activity} onChange={e => set('activity', e.target.value)}>
            {ACTIVITY.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>

        <button onClick={calculate} className="calc-btn">Calculate Calories</button>
      </div>

      {result && (
        <div className="mt-6 space-y-3">
          <div className="result-box">
            <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-1">Maintain Weight</p>
            <p className="font-display font-800 text-4xl">{result.maintain.toLocaleString()} <span className="text-xl text-blue-200">cal/day</span></p>
            <p className="text-blue-200 text-xs mt-1">BMR: {result.bmr.toLocaleString()} calories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { label: 'Mild Weight Loss', sub: '−0.25 kg/week', value: result.mild_loss, color: 'text-yellow-600 bg-yellow-50 border-yellow-200' },
              { label: 'Weight Loss', sub: '−0.5 kg/week', value: result.loss, color: 'text-orange-600 bg-orange-50 border-orange-200' },
              { label: 'Weight Gain', sub: '+0.5 kg/week', value: result.gain, color: 'text-green-600 bg-green-50 border-green-200' },
            ].map(g => (
              <div key={g.label} className={`rounded-xl p-4 border-2 ${g.color}`}>
                <p className="font-display font-800 text-xl">{g.value.toLocaleString()}</p>
                <p className="font-display font-600 text-sm mt-0.5">{g.label}</p>
                <p className="text-xs opacity-70 mt-0.5">{g.sub}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
