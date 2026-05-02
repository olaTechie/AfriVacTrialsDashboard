import { Search } from 'lucide-react';
import { useData } from '../data/DataContext';

function MultiSelect({ label, options, value, onChange }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select
        multiple
        value={value}
        onChange={(event) =>
          onChange(Array.from(event.target.selectedOptions, (option) => option.value))
        }
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export default function FilterPanel() {
  const { filters, setFilters, metadata } = useData();
  const [minYear, maxYear] = metadata.yearRange;

  const update = (patch) => setFilters((current) => ({ ...current, ...patch }));

  return (
    <aside className="filter-panel">
      <div className="filter-panel__header">
        <span>Filters</span>
        <button
          type="button"
          className="text-button"
          onClick={() =>
            update({
              query: '',
              yearRange: metadata.yearRange,
              phases: metadata.phaseOptions,
              vaccineTypes: metadata.vaccineTypeOptions,
              manufacturers: metadata.manufacturerOptions,
            })
          }
        >
          Reset
        </button>
      </div>

      <label className="field search-field">
        <span>Country search</span>
        <div>
          <Search size={16} aria-hidden="true" />
          <input
            value={filters.query}
            placeholder="Search country"
            onChange={(event) => update({ query: event.target.value })}
          />
        </div>
      </label>

      <div className="field">
        <span>Publication years</span>
        <div className="range-grid">
          <input
            type="number"
            min={minYear}
            max={filters.yearRange[1]}
            value={filters.yearRange[0]}
            onChange={(event) =>
              update({ yearRange: [Number(event.target.value), filters.yearRange[1]] })
            }
          />
          <input
            type="number"
            min={filters.yearRange[0]}
            max={maxYear}
            value={filters.yearRange[1]}
            onChange={(event) =>
              update({ yearRange: [filters.yearRange[0], Number(event.target.value)] })
            }
          />
        </div>
      </div>

      <MultiSelect
        label="Phase category"
        options={metadata.phaseOptions}
        value={filters.phases}
        onChange={(phases) => update({ phases })}
      />
      <MultiSelect
        label="Vaccine type"
        options={metadata.vaccineTypeOptions}
        value={filters.vaccineTypes}
        onChange={(vaccineTypes) => update({ vaccineTypes })}
      />
      <MultiSelect
        label="Manufacturer"
        options={metadata.manufacturerOptions}
        value={filters.manufacturers}
        onChange={(manufacturers) => update({ manufacturers })}
      />
    </aside>
  );
}
