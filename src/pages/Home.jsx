import { motion as Motion } from 'framer-motion';
import DataTable from '../components/DataTable.jsx';
import MetricCard from '../components/MetricCard.jsx';
import PageTransition from '../components/PageTransition.jsx';
import { AfricaMap, CountryHeatmap } from '../components/PlotlyCharts.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useData } from '../data/DataContext';
import { PHASE_ORDER, TABLE_COLUMNS } from '../data/schema';
import { countBy, countryFrequency } from '../utils/dataUtils';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function Home() {
  usePageTitle('Overview');
  const { filteredRows, referenceRows } = useData();
  const phases = countBy(filteredRows, 'PhaseCategory', { excludeNotReported: false });
  const countries = countryFrequency(filteredRows);
  const status = countBy(filteredRows, 'StudyStatus', { excludeNotReported: false });
  const completed = status.find((item) => item.name === 'Completed  Published')?.value ?? 0;
  const ongoing = filteredRows.length - completed;

  return (
    <PageTransition>
      <section className="hero">
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
        >
          <p className="eyebrow">Mixed scoping review and bibliometric analysis</p>
          <h1>Guiding global health policy for vaccine-preventable diseases in Africa.</h1>
          <p>
            A polished evidence interface for vaccine clinical trials before, during, and after the
            COVID-19 pandemic.
          </p>
        </Motion.div>
        <div className="hero-panel">
          <strong>{countries[0]?.country ?? 'Africa'}</strong>
          <span>Most represented country</span>
          <small>{countries[0]?.frequency ?? 0} trial records under current filters</small>
        </div>
      </section>

      <section className="metric-grid">
        {PHASE_ORDER.map((phase, index) => (
          <MetricCard
            key={phase}
            label={phase}
            value={phases.find((item) => item.name === phase)?.value ?? 0}
            tone={['sage', 'clay', 'gold', 'blue', 'plum'][index]}
          />
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="status-card">
          <SectionHeader eyebrow="Publication status" title="Study progression" />
          <div className="status-metrics">
            <MetricCard label="Completed Published" value={completed} />
            <MetricCard label="Ongoing Trials" value={ongoing} tone="clay" />
            <MetricCard label="References" value={referenceRows.length} tone="gold" />
          </div>
        </article>

        <article className="map-section">
          <SectionHeader eyebrow="Geography" title="Number of trials by country" />
          <AfricaMap countries={countries} />
        </article>
      </section>

      <SectionHeader
        eyebrow="Temporal distribution"
        title="Country by publication year"
        copy="The heatmap preserves the Streamlit country-year frequency view with a responsive Plotly implementation."
      />
      <CountryHeatmap rows={filteredRows} />

      <SectionHeader
        eyebrow="Dataset"
        title="Filtered trial records"
        copy="A fast, paginated table replaces the Streamlit dataframe expander."
      />
      <DataTable rows={filteredRows} columns={TABLE_COLUMNS} />
    </PageTransition>
  );
}
