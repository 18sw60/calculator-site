// ============================================================
// MASTER CALCULATOR DATA FILE
// To add a new calculator, just add an entry to this array.
// The website will automatically create a page, nav link, and
// sitemap entry for it.
// ============================================================

export const calculators = [
  // ─── MATH ────────────────────────────────────────────────
  {
    slug: "percentage-calculator",
    category: "math",
    title: "Percentage Calculator",
    shortTitle: "Percentage",
    description: "Calculate percentages, percentage change, and percentage of a number instantly.",
    metaDescription: "Free online percentage calculator. Find what percent of a number is, calculate percentage increase or decrease, and more.",
    keywords: ["percentage calculator", "percent calculator", "what is percent of", "percentage change calculator"],
    icon: "%",
    color: "blue",
    featured: true,
    faqs: [
      { q: "How do I calculate a percentage?", a: "To find X% of Y, multiply Y by X and divide by 100. For example, 20% of 150 = (150 × 20) / 100 = 30." },
      { q: "How do I calculate percentage change?", a: "Percentage change = ((New Value - Old Value) / Old Value) × 100. A positive result means increase, negative means decrease." },
    ]
  },
  {
    slug: "bmi-calculator",
    category: "health",
    title: "BMI Calculator",
    shortTitle: "BMI",
    description: "Calculate your Body Mass Index (BMI) using height and weight. Includes BMI category interpretation.",
    metaDescription: "Free BMI calculator for adults. Enter your height and weight to calculate BMI and find out if you're underweight, normal, overweight, or obese.",
    keywords: ["bmi calculator", "body mass index", "bmi chart", "healthy weight calculator"],
    icon: "⚖️",
    color: "green",
    featured: true,
    faqs: [
      { q: "What is a healthy BMI?", a: "A BMI between 18.5 and 24.9 is considered healthy for most adults. Below 18.5 is underweight, 25–29.9 is overweight, and 30+ is obese." },
      { q: "Is BMI accurate?", a: "BMI is a useful screening tool but doesn't directly measure body fat. Athletes may have a high BMI due to muscle mass. Consult a doctor for a full assessment." },
    ]
  },
  {
    slug: "compound-interest-calculator",
    category: "finance",
    title: "Compound Interest Calculator",
    shortTitle: "Compound Interest",
    description: "Calculate compound interest on investments and savings. See how your money grows over time with compounding.",
    metaDescription: "Free compound interest calculator. Calculate how your savings or investments grow with compound interest over time.",
    keywords: ["compound interest calculator", "investment calculator", "savings calculator", "interest rate calculator"],
    icon: "📈",
    color: "emerald",
    featured: true,
    faqs: [
      { q: "What is compound interest?", a: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods — interest on interest." },
      { q: "How often should interest compound for best returns?", a: "The more frequently interest compounds, the more you earn. Daily compounding yields slightly more than monthly, which yields more than annually." },
    ]
  },
  {
    slug: "age-calculator",
    category: "time",
    title: "Age Calculator",
    shortTitle: "Age",
    description: "Calculate your exact age in years, months, and days from your date of birth.",
    metaDescription: "Free age calculator. Find out your exact age in years, months, and days. Calculate the difference between any two dates.",
    keywords: ["age calculator", "how old am i", "birthday calculator", "date of birth calculator"],
    icon: "🎂",
    color: "purple",
    featured: true,
    faqs: [
      { q: "How is age calculated?", a: "Age is calculated by finding the difference between your birth date and today's date, broken down into years, months, and remaining days." },
    ]
  },
  {
    slug: "loan-emi-calculator",
    category: "finance",
    title: "Loan EMI Calculator",
    shortTitle: "Loan EMI",
    description: "Calculate your monthly loan EMI (Equated Monthly Installment) for home, car, or personal loans.",
    metaDescription: "Free loan EMI calculator. Calculate monthly installments for home loans, car loans, and personal loans with amortization schedule.",
    keywords: ["emi calculator", "loan calculator", "home loan calculator", "monthly payment calculator"],
    icon: "🏦",
    color: "orange",
    featured: true,
    faqs: [
      { q: "What is EMI?", a: "EMI (Equated Monthly Installment) is a fixed payment made every month to repay a loan. It includes both principal and interest components." },
      { q: "How is EMI calculated?", a: "EMI = P × r × (1+r)^n / ((1+r)^n - 1), where P is principal, r is monthly interest rate, and n is number of months." },
    ]
  },
  {
    slug: "calorie-calculator",
    category: "health",
    title: "Calorie Calculator",
    shortTitle: "Calories",
    description: "Calculate your daily calorie needs based on age, gender, height, weight, and activity level.",
    metaDescription: "Free calorie calculator. Find out how many calories you need per day to maintain, lose, or gain weight.",
    keywords: ["calorie calculator", "daily calorie intake", "tdee calculator", "how many calories should i eat"],
    icon: "🔥",
    color: "red",
    featured: false,
    faqs: [
      { q: "How many calories should I eat per day?", a: "Most adults need 1,600–3,000 calories daily depending on age, sex, height, weight, and activity level. This calculator uses the Mifflin-St Jeor equation for accuracy." },
    ]
  },
  {
    slug: "simple-interest-calculator",
    category: "finance",
    title: "Simple Interest Calculator",
    shortTitle: "Simple Interest",
    description: "Calculate simple interest on loans or investments using principal, rate, and time.",
    metaDescription: "Free simple interest calculator. Calculate interest earned or owed using principal amount, interest rate, and time period.",
    keywords: ["simple interest calculator", "interest calculator", "si formula calculator"],
    icon: "💵",
    color: "teal",
    featured: false,
    faqs: [
      { q: "What is simple interest?", a: "Simple interest is calculated only on the principal amount. Formula: SI = (P × R × T) / 100, where P = Principal, R = Rate per year, T = Time in years." },
    ]
  },
  {
    slug: "days-between-dates",
    category: "time",
    title: "Days Between Dates Calculator",
    shortTitle: "Days Between",
    description: "Calculate the exact number of days between two dates, including or excluding weekends.",
    metaDescription: "Free days between dates calculator. Find the exact number of days, weeks, and months between any two dates.",
    keywords: ["days between dates", "date difference calculator", "how many days between", "days calculator"],
    icon: "📅",
    color: "indigo",
    featured: false,
    faqs: [
      { q: "How do I calculate days between two dates?", a: "Subtract the earlier date from the later date. This calculator handles all the complexity including leap years for you." },
    ]
  },
];

// ─── CATEGORY CONFIG ─────────────────────────────────────────
export const categories = {
  math:    { label: "Mathematics", icon: "📐", color: "blue",   description: "Algebra, geometry, fractions, percentages, and more" },
  finance: { label: "Finance",     icon: "💰", color: "emerald", description: "Loans, interest, investments, and personal finance" },
  health:  { label: "Health",      icon: "❤️", color: "red",    description: "BMI, calories, fitness, and wellness calculators" },
  time:    { label: "Time & Date", icon: "⏱️", color: "purple", description: "Age, date differences, time zones, and scheduling" },
};

// Helper: get all calculators in a category
export function getByCategory(cat) {
  return calculators.filter(c => c.category === cat);
}

// Helper: get a calculator by slug
export function getBySlug(slug) {
  return calculators.find(c => c.slug === slug);
}

// Helper: get related calculators (same category, different slug)
export function getRelated(slug, limit = 3) {
  const current = getBySlug(slug);
  if (!current) return [];
  return calculators.filter(c => c.category === current.category && c.slug !== slug).slice(0, limit);
}

export const colorMap = {
  blue:    { bg: 'bg-blue-50',    text: 'text-blue-600',    border: 'border-blue-200',    badge: 'bg-blue-100 text-blue-700' },
  green:   { bg: 'bg-green-50',   text: 'text-green-600',   border: 'border-green-200',   badge: 'bg-green-100 text-green-700' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' },
  purple:  { bg: 'bg-purple-50',  text: 'text-purple-600',  border: 'border-purple-200',  badge: 'bg-purple-100 text-purple-700' },
  orange:  { bg: 'bg-orange-50',  text: 'text-orange-600',  border: 'border-orange-200',  badge: 'bg-orange-100 text-orange-700' },
  red:     { bg: 'bg-red-50',     text: 'text-red-600',     border: 'border-red-200',     badge: 'bg-red-100 text-red-700' },
  teal:    { bg: 'bg-teal-50',    text: 'text-teal-600',    border: 'border-teal-200',    badge: 'bg-teal-100 text-teal-700' },
  indigo:  { bg: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-200',  badge: 'bg-indigo-100 text-indigo-700' },
};
