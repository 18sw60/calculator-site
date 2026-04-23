import CalculatorLayout from '../../components/CalculatorLayout';
import { calculators, categories } from '../../data/calculators';

// Import all calculator components
import PercentageCalculator from '../../components/calculators/PercentageCalculator';
import BMICalculator from '../../components/calculators/BMICalculator';
import CompoundInterestCalculator from '../../components/calculators/CompoundInterestCalculator';
import AgeCalculator from '../../components/calculators/AgeCalculator';
import LoanEMICalculator from '../../components/calculators/LoanEMICalculator';
import CalorieCalculator from '../../components/calculators/CalorieCalculator';
import SimpleInterestCalculator from '../../components/calculators/SimpleInterestCalculator';
import DaysBetweenDates from '../../components/calculators/DaysBetweenDates';

// ─── MAP: slug → component ───────────────────────────────────
// When you add a new calculator, add it here too.
const CALCULATOR_MAP = {
  'percentage-calculator':          PercentageCalculator,
  'bmi-calculator':                 BMICalculator,
  'compound-interest-calculator':   CompoundInterestCalculator,
  'age-calculator':                 AgeCalculator,
  'loan-emi-calculator':            LoanEMICalculator,
  'calorie-calculator':             CalorieCalculator,
  'simple-interest-calculator':     SimpleInterestCalculator,
  'days-between-dates':             DaysBetweenDates,
};

export async function getStaticPaths() {
  const paths = calculators.map(c => ({
    params: { category: c.category, slug: c.slug }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  return { props: { slug: params.slug } };
}

export default function CalculatorPage({ slug }) {
  const calculator = calculators.find(c => c.slug === slug);
  if (!calculator) return null;

  const CalcComponent = CALCULATOR_MAP[slug];

  return (
    <CalculatorLayout calculator={calculator}>
      {CalcComponent
        ? <CalcComponent />
        : (
          <div className="text-center py-12 text-surface-400">
            <p className="text-4xl mb-3">🔧</p>
            <p className="font-display font-600">Calculator coming soon!</p>
            <p className="text-sm mt-1">This calculator is being built.</p>
          </div>
        )
      }
    </CalculatorLayout>
  );
}
