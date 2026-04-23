# CalcHub — Universal Calculator Website Template

A production-ready Next.js template for building a large-scale, SEO-optimized calculator website. Built to compete with sites like CalculatorSoup.

## ✅ What's Included

- **8 fully working calculators** (Percentage, BMI, Compound Interest, Age, Loan EMI, Calories, Simple Interest, Days Between Dates)
- **SEO-optimized** every page has meta tags, Open Graph, canonical URLs, and JSON-LD structured data
- **Auto-routing** — pages generate automatically from `data/calculators.js`
- **Auto-sitemap** — generated on every build
- **Mobile responsive** — works perfectly on phones and tablets
- **Ad-ready** — sidebar ad slot included on every calculator page
- **Fast** — all calculations happen in the browser, no server needed

---

## 🚀 Setup Guide (No Coding Knowledge Required)

### Step 1 — Install Node.js
1. Go to **https://nodejs.org**
2. Download the **LTS version** (green button)
3. Install it (just click Next/Next/Finish)

### Step 2 — Open Terminal / Command Prompt
- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac**: Press `Cmd + Space`, type `Terminal`, press Enter

### Step 3 — Navigate to this folder
```
cd path/to/calculator-site
```
(Replace `path/to/calculator-site` with where you saved this folder)

### Step 4 — Install dependencies
```
npm install
```
Wait for it to finish (1–2 minutes).

### Step 5 — Run the website locally
```
npm run dev
```
Open your browser and go to: **http://localhost:3000**

Your website is running! 🎉

---

## 🌐 Deploy to the Internet (Free with Vercel)

1. Go to **https://github.com** and create a free account
2. Create a new repository and upload this folder
3. Go to **https://vercel.com** and sign in with GitHub
4. Click "New Project" → select your repository → click "Deploy"
5. Your site is live in ~2 minutes at a free `.vercel.app` URL
6. Connect your custom domain in Vercel settings

---

## ➕ How to Add a New Calculator

### Step 1 — Add metadata to `data/calculators.js`
Open `data/calculators.js` and add a new entry:

```javascript
{
  slug: "square-root-calculator",       // URL: /math/square-root-calculator/
  category: "math",                      // math | finance | health | time
  title: "Square Root Calculator",
  shortTitle: "Square Root",
  description: "Calculate the square root of any number instantly.",
  metaDescription: "Free square root calculator. Find the square root of any positive number.",
  keywords: ["square root calculator", "sqrt calculator", "√ calculator"],
  icon: "√",
  color: "blue",                         // blue | green | emerald | purple | orange | red | teal | indigo
  featured: false,
  faqs: [
    { q: "What is a square root?", a: "The square root of a number N is a value that, when multiplied by itself, gives N." }
  ]
},
```

### Step 2 — Create the calculator component
Create a new file: `components/calculators/SquareRootCalculator.jsx`

Use this template:
```jsx
import { useState } from 'react';

export default function SquareRootCalculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const calculate = () => {
    const n = parseFloat(input);
    if (isNaN(n) || n < 0) return;
    setResult(Math.sqrt(n));
  };

  return (
    <div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-display font-600 text-surface-600 mb-1.5">Number</label>
          <input className="calc-input" type="number" placeholder="e.g. 144" value={input} onChange={e => setInput(e.target.value)} />
        </div>
        <button onClick={calculate} className="calc-btn">Calculate</button>
      </div>
      {result !== null && (
        <div className="result-box mt-6">
          <p className="text-blue-200 text-sm font-display font-600 uppercase tracking-widest mb-1">Square Root</p>
          <p className="font-display font-800 text-4xl">√{input} = {result}</p>
        </div>
      )}
    </div>
  );
}
```

### Step 3 — Register it in `pages/[category]/[slug].js`
Open that file and add two lines:

```javascript
// At the top (imports):
import SquareRootCalculator from '../../components/calculators/SquareRootCalculator';

// In the CALCULATOR_MAP object:
'square-root-calculator': SquareRootCalculator,
```

That's it! Your new calculator page is live at `/math/square-root-calculator/`.

---

## 🎨 Customization

### Change the site name
Search for `CalcHub` in all files and replace with your brand name.

### Change the domain
Search for `yourcalculatorsite.com` and replace with your domain.

### Add Google AdSense
Replace the ad placeholder in `components/CalculatorLayout.jsx`:
```jsx
// Find this block and replace with your AdSense code:
<div className="rounded-2xl border-2 border-dashed ...">
  ...
</div>
```

### Add Google Analytics
In `pages/_app.js`, add your GA4 script tag inside `<Head>`.

---

## 📁 Project Structure

```
calculator-site/
├── data/
│   └── calculators.js          ← ALL calculator metadata lives here
├── pages/
│   ├── index.js                ← Homepage
│   ├── _app.js                 ← App wrapper
│   ├── [category]/
│   │   ├── index.js            ← Category page (e.g. /math/)
│   │   └── [slug].js           ← Individual calculator page
├── components/
│   ├── Header.jsx
│   ├── Footer.jsx
│   ├── CalculatorLayout.jsx    ← SEO wrapper for all calculator pages
│   └── calculators/            ← One file per calculator
│       ├── PercentageCalculator.jsx
│       ├── BMICalculator.jsx
│       └── ...
├── styles/
│   └── globals.css
└── README.md
```

---

## 🔍 SEO Checklist (After Launch)

- [ ] Submit sitemap to Google Search Console: `yourdomain.com/sitemap.xml`
- [ ] Add Google Analytics 4
- [ ] Write 300+ words of content on each calculator page
- [ ] Build backlinks from relevant finance/health/education blogs
- [ ] Monitor rankings in Google Search Console weekly

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | Framework (routing, SSG, SEO) |
| Tailwind CSS | Styling |
| next-sitemap | Auto sitemap generation |
| Vercel | Hosting (free tier) |
