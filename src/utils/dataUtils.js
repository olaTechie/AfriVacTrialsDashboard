export function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

export function cleanValue(value) {
  return String(value ?? '').trim();
}

export function isReported(value) {
  const cleaned = cleanValue(value);
  return cleaned && cleaned !== 'Not Reported';
}

export function uniqueOptions(rows, column) {
  return Array.from(
    new Set(rows.map((row) => cleanValue(row[column])).filter((value) => value)),
  ).sort((a, b) => a.localeCompare(b));
}

export function countBy(rows, column, { excludeNotReported = true, limit } = {}) {
  const counts = new Map();
  rows.forEach((row) => {
    const value = cleanValue(row[column]);
    if (!value || (excludeNotReported && value === 'Not Reported')) return;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });
  const result = Array.from(counts, ([name, value]) => ({ name, value })).sort(
    (a, b) => b.value - a.value || a.name.localeCompare(b.name),
  );
  return limit ? result.slice(0, limit) : result;
}

export function splitCountries(countryString) {
  if (!countryString || typeof countryString !== 'string') return [];
  return countryString
    .replace(/\s{2,}/g, ';')
    .split(/[;,|]/)
    .map((country) => country.trim())
    .filter(Boolean);
}

export function countryFrequency(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    splitCountries(row.Country).forEach((country) => {
      counts.set(country, (counts.get(country) ?? 0) + 1);
    });
  });
  return Array.from(counts, ([country, frequency]) => ({ country, frequency })).sort(
    (a, b) => b.frequency - a.frequency || a.country.localeCompare(b.country),
  );
}

export function countryYearFrequency(rows) {
  const counts = new Map();
  rows.forEach((row) => {
    const year = toNumber(row.PublicationYear);
    if (!year) return;
    splitCountries(row.Country).forEach((country) => {
      const key = `${year}::${country}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    });
  });
  return Array.from(counts, ([key, frequency]) => {
    const [year, country] = key.split('::');
    return { year, country, frequency };
  });
}

export function groupOverTime(rows, yearColumn, categoryColumn) {
  const counts = new Map();
  rows.forEach((row) => {
    const year = toNumber(row[yearColumn]);
    const category = cleanValue(row[categoryColumn]);
    if (!year || !isReported(category)) return;
    const key = `${year}::${category}`;
    counts.set(key, (counts.get(key) ?? 0) + 1);
  });
  return Array.from(counts, ([key, count]) => {
    const [year, category] = key.split('::');
    return { year, category, count };
  }).sort((a, b) => Number(a.year) - Number(b.year));
}

export function filterRows(rows, filters) {
  const query = cleanValue(filters.query).toLowerCase();
  return rows.filter((row) => {
    const year = toNumber(row.PublicationYear);
    const matchesQuery =
      !query || cleanValue(row.Country).toLowerCase().includes(query);
    const inYearRange =
      !year || (year >= filters.yearRange[0] && year <= filters.yearRange[1]);
    const matchesPhase = filters.phases.includes(cleanValue(row.PhaseCategory));
    const matchesType = filters.vaccineTypes.includes(cleanValue(row.TypesofVaccinesCategory));
    const matchesManufacturer = filters.manufacturers.includes(cleanValue(row.ManufacturerCategory));
    return matchesQuery && inYearRange && matchesPhase && matchesType && matchesManufacturer;
  });
}

export function wordTokens(rows, column, limit = 40) {
  const stopwords = new Set([
    'and',
    'the',
    'of',
    'for',
    'with',
    'in',
    'to',
    'by',
    'not',
    'reported',
    'unknown',
    'a',
    'an',
  ]);
  const counts = new Map();
  rows.forEach((row) => {
    cleanValue(row[column])
      .split(/[^a-zA-Z0-9]+/)
      .map((word) => word.toLowerCase())
      .filter((word) => word.length > 2 && !stopwords.has(word))
      .forEach((word) => counts.set(word, (counts.get(word) ?? 0) + 1));
  });
  return Array.from(counts, ([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}
