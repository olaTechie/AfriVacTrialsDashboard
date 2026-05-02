import Plot from 'react-plotly.js';
import { countryYearFrequency } from '../utils/dataUtils';

const plotConfig = {
  responsive: true,
  displayModeBar: false,
};

const baseLayout = {
  margin: { l: 0, r: 0, t: 12, b: 0 },
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor: 'rgba(0,0,0,0)',
  font: { family: 'Inter, system-ui, sans-serif', color: '#2d2926' },
};

export function AfricaMap({ countries }) {
  return (
    <div className="plot-card">
      <Plot
        data={[
          {
            type: 'choropleth',
            locationmode: 'country names',
            locations: countries.map((row) => row.country),
            z: countries.map((row) => row.frequency),
            text: countries.map((row) => row.country),
            colorscale: [
              [0, '#f2dfc7'],
              [0.45, '#c98c54'],
              [1, '#315c55'],
            ],
            marker: { line: { color: '#f7f0e7', width: 0.8 } },
            colorbar: { thickness: 10, title: 'Trials' },
          },
        ]}
        layout={{
          ...baseLayout,
          geo: {
            scope: 'africa',
            showframe: false,
            showcoastlines: false,
            bgcolor: 'rgba(0,0,0,0)',
          },
          height: 440,
        }}
        config={plotConfig}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export function CountryHeatmap({ rows }) {
  const points = countryYearFrequency(rows);
  const countries = Array.from(new Set(points.map((point) => point.country))).sort();
  const years = Array.from(new Set(points.map((point) => point.year))).sort();
  const matrix = years.map((year) =>
    countries.map(
      (country) =>
        points.find((point) => point.year === year && point.country === country)?.frequency ?? 0,
    ),
  );

  return (
    <div className="plot-card plot-card--wide">
      <Plot
        data={[
          {
            type: 'heatmap',
            x: countries,
            y: years,
            z: matrix,
            colorscale: [
              [0, '#fbf7f0'],
              [0.5, '#d4a947'],
              [1, '#315c55'],
            ],
            hovertemplate: '%{x}<br>%{y}: %{z} trials<extra></extra>',
          },
        ]}
        layout={{
          ...baseLayout,
          margin: { l: 52, r: 16, t: 20, b: 86 },
          height: 420,
          xaxis: { tickangle: -45, tickfont: { size: 10 } },
          yaxis: { title: 'Publication year' },
        }}
        config={plotConfig}
        useResizeHandler
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
