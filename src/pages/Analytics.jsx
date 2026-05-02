import { BarCategoryChart, DonutChart } from '../components/ChartCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import TagCloud from '../components/TagCloud.jsx';
import { useData } from '../data/DataContext';
import { CHART_GROUPS, WORD_FIELDS } from '../data/schema';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Analytics() {
  usePageTitle('Analytics');
  const { filteredRows } = useData();

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Research anatomy"
        title="Where, how, and with whom trials were conducted"
        copy="These cards preserve the Streamlit grouped tabs as scannable, route-level analysis panels."
      />

      <div className="chart-grid">
        {CHART_GROUPS.research.map(([column, title]) =>
          column === 'SettingsCategory' ? (
            <DonutChart key={column} rows={filteredRows} column={column} title={title} />
          ) : (
            <BarCategoryChart key={column} rows={filteredRows} column={column} title={title} />
          ),
        )}
      </div>

      <SectionHeader eyebrow="Solutions tested" title="Conditions, products, and vaccine types" />
      <div className="chart-grid">
        {CHART_GROUPS.solutions.map(([column, title]) => (
          <BarCategoryChart key={column} rows={filteredRows} column={column} title={title} />
        ))}
      </div>

      <SectionHeader eyebrow="Outcomes" title="Results and limitations" />
      <div className="chart-grid">
        <BarCategoryChart rows={filteredRows} column="VaccineOutcomesCategory" title="Vaccine Outcomes" />
        <DonutChart rows={filteredRows} column="SignificanceCategory" title="Results Significance" />
        <DonutChart rows={filteredRows} column="MainLimitationsCategory" title="Main Limitations" />
      </div>

      <SectionHeader eyebrow="Organizations" title="Who made the research possible" />
      <div className="cloud-grid">
        {WORD_FIELDS.map(([column, title]) => (
          <TagCloud key={column} rows={filteredRows} column={column} title={title} />
        ))}
      </div>
      <div className="chart-grid chart-grid--two">
        {CHART_GROUPS.organizations.slice(0, 2).map(([column, title]) => (
          <BarCategoryChart key={column} rows={filteredRows} column={column} title={title} />
        ))}
      </div>
    </PageTransition>
  );
}
