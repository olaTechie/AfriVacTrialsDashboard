import { TimelineChart } from '../components/ChartCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useData } from '../data/DataContext';
import { CHART_GROUPS } from '../data/schema';
import { usePageTitle } from '../hooks/usePageTitle.js';

const efficacyGroups = [
  ['SettingsCategory', 'Efficacy by Setting'],
  ['PhaseCategory', 'Efficacy by Phase'],
  ['PopulationCategory', 'Efficacy by Population'],
  ['ConditionCategory', 'Efficacy by Condition'],
  ['VaccineNameCategory', 'Efficacy by Vaccine'],
  ['TypesofVaccinesCategory', 'Efficacy by Type'],
];

export default function Trends() {
  usePageTitle('Trends');
  const { filteredRows } = useData();
  const efficacyRows = filteredRows.filter((row) => row.VaccineOutcomesCategory === 'Efficacy');

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Vaccine trial panorama"
        title="Publication trends over time"
        copy="Stacked Streamlit time charts are represented here as focused animated line charts for readability."
      />
      <div className="chart-grid">
        {[...CHART_GROUPS.research, ...CHART_GROUPS.solutions, ...CHART_GROUPS.results].map(
          ([column, title]) => (
            <TimelineChart key={column} rows={filteredRows} column={column} title={title} />
          ),
        )}
      </div>

      <SectionHeader eyebrow="Efficacy in focus" title="Efficacy patterns across trial dimensions" />
      <div className="chart-grid">
        {efficacyGroups.map(([column, title]) => (
          <TimelineChart key={column} rows={efficacyRows} column={column} title={title} />
        ))}
      </div>

      <SectionHeader eyebrow="Behind the scenes" title="Manufacturers and funding over time" />
      <div className="chart-grid chart-grid--two">
        <TimelineChart rows={filteredRows} column="ManufacturerCategory" title="Manufacturer Category" />
        <TimelineChart rows={filteredRows} column="FundingCategory" title="Funding Category" />
      </div>
    </PageTransition>
  );
}
