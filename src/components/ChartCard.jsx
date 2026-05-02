import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { countBy, groupOverTime } from '../utils/dataUtils';

const palette = ['#315c55', '#b36a5e', '#d4a947', '#667ca0', '#8f6b94', '#6f8f72', '#c7833d'];

export function ChartCard({ title, children, className = '' }) {
  return (
    <article className={`chart-card ${className}`}>
      <h3>{title}</h3>
      {children}
    </article>
  );
}

export function BarCategoryChart({ rows, column, title, limit = 10 }) {
  const data = countBy(rows, column, { limit });

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical" margin={{ left: 18, right: 18 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e6ded2" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={118} tick={{ fontSize: 11 }} />
          <Tooltip cursor={{ fill: '#f5efe6' }} />
          <Bar dataKey="value" radius={[0, 7, 7, 0]} animationDuration={900}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={palette[index % palette.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function DonutChart({ rows, column, title }) {
  const data = countBy(rows, column, { limit: 7 });
  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={64}
            outerRadius={102}
            paddingAngle={2}
            animationDuration={900}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={palette[index % palette.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="legend-list">
        {data.slice(0, 5).map((item, index) => (
          <span key={item.name}>
            <i style={{ background: palette[index % palette.length] }} /> {item.name}
          </span>
        ))}
      </div>
    </ChartCard>
  );
}

export function TimelineChart({ rows, column, title }) {
  const grouped = groupOverTime(rows, 'PublicationYear', column);
  const categories = Array.from(new Set(grouped.map((row) => row.category))).slice(0, 6);
  const years = Array.from(new Set(grouped.map((row) => row.year))).sort();
  const data = years.map((year) => {
    const point = { year };
    categories.forEach((category) => {
      point[category] =
        grouped.find((row) => row.year === year && row.category === category)?.count ?? 0;
    });
    return point;
  });

  return (
    <ChartCard title={title}>
      <ResponsiveContainer width="100%" height={310}>
        <LineChart data={data} margin={{ top: 18, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e6ded2" />
          <XAxis dataKey="year" tick={{ fontSize: 11 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          {categories.map((category, index) => (
            <Line
              key={category}
              type="monotone"
              dataKey={category}
              stroke={palette[index % palette.length]}
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={900}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
