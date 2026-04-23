import { useState } from 'react';

export default function DaysBetweenDates() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!from || !to) return;
    const d1 = new Date(from);
    const d2 = new Date(to);
    const [start, end] = d1 <= d2 ? [d1, d2] : [d2, d1];

    const totalMs = end - start;
    const totalDays = Math.round(totalMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;

    // Count weekdays
    let weekdays = 0;
    const cur = new Date(start);
    while (cur < end) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) weekdays++;
      cur.setDate(cur.getDate() + 1);
    }

    // Months & years breakdown
    let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    if (end.getDate() < start.getDate()) months--;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;

    setResult({ totalDays, weeks, remDays, weekdays, weekends: totalDays - weekdays, years, months, remMonths, from: start, to: end });
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Start Date</label>
            <input className="calc-input" type="date" value={from} onChange={e => setFrom(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">End Date</label>
            <input className="calc-input" type="date" value={to} onChange={e => setTo(e.target.value)} />
          </div>
        </div>
        <button onClick={calculate} className="calc-btn">Calculate Days</button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="result-box">
            <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-1">Total Days</p>
            <p className="font-display font-800 text-5xl">{result.totalDays.toLocaleString()}</p>
            <p className="text-blue-200 text-sm mt-1">
              {result.weeks} weeks and {result.remDays} day{result.remDays !== 1 ? 's' : ''}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Weekdays', value: result.weekdays },
              { label: 'Weekends', value: result.weekends },
              { label: 'Total Weeks', value: result.weeks },
              { label: 'Months', value: result.months },
            ].map(s => (
              <div key={s.label} className="bg-surface-50 rounded-xl p-4 text-center border border-surface-200">
                <p className="font-display font-800 text-xl text-surface-800">{s.value.toLocaleString()}</p>
                <p className="text-xs text-surface-400 font-display font-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {(result.years > 0 || result.remMonths > 0) && (
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="font-display font-700 text-indigo-700">
                {result.years > 0 ? `${result.years} year${result.years > 1 ? 's' : ''} ` : ''}
                {result.remMonths > 0 ? `${result.remMonths} month${result.remMonths > 1 ? 's' : ''}` : ''}
              </p>
              <p className="text-sm text-indigo-400 mt-0.5">
                From {result.from.toLocaleDateString()} to {result.to.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
