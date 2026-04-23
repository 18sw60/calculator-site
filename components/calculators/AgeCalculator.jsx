import { useState } from 'react';

export default function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const target = new Date(toDate);
    if (birth > target) return;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((target - birth) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    // Next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) nextBirthday.setFullYear(target.getFullYear() + 1);
    const daysToNext = Math.floor((nextBirthday - target) / (1000 * 60 * 60 * 24));

    setResult({ years, months, days, totalDays, totalWeeks, totalMonths, totalHours, daysToNext, nextBirthday });
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Date of Birth</label>
          <input className="calc-input" type="date" value={dob} onChange={e => setDob(e.target.value)} max={toDate} />
        </div>
        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Age at Date (default: today)</label>
          <input className="calc-input" type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>
        <button onClick={calculate} className="calc-btn">Calculate Age</button>
      </div>

      {result && (
        <div className="mt-6 space-y-4">
          {/* Main result */}
          <div className="result-box">
            <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-2">Your Age</p>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-display font-800 text-5xl">{result.years}</span>
              <span className="text-blue-200 text-xl">years</span>
              <span className="font-display font-800 text-3xl">{result.months}</span>
              <span className="text-blue-200 text-xl">months</span>
              <span className="font-display font-800 text-3xl">{result.days}</span>
              <span className="text-blue-200 text-xl">days</span>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Total Days', value: result.totalDays.toLocaleString() },
              { label: 'Total Weeks', value: result.totalWeeks.toLocaleString() },
              { label: 'Total Months', value: result.totalMonths.toLocaleString() },
              { label: 'Total Hours', value: result.totalHours.toLocaleString() },
            ].map(s => (
              <div key={s.label} className="bg-surface-50 rounded-xl p-4 text-center border border-surface-200">
                <p className="font-display font-800 text-xl text-surface-800">{s.value}</p>
                <p className="text-xs text-surface-400 font-display font-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Next birthday */}
          <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
            <span className="text-2xl">🎂</span>
            <div>
              <p className="font-display font-700 text-purple-700">Next Birthday</p>
              <p className="text-sm text-purple-500">
                {result.nextBirthday.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                {' '}— <strong>{result.daysToNext} days</strong> away
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
