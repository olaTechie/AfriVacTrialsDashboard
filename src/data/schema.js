export const FILTER_COLUMNS = {
  phase: 'PhaseCategory',
  vaccineType: 'TypesofVaccinesCategory',
  manufacturer: 'ManufacturerCategory',
};

export const CHART_GROUPS = {
  research: [
    ['SettingsCategory', 'Setting Category'],
    ['PhaseCategory', 'Phase Category'],
    ['PopulationCategory', 'Population Category'],
  ],
  solutions: [
    ['ConditionCategory', 'Condition Studied'],
    ['VaccineNameCategory', 'Vaccine Name'],
    ['TypesofVaccinesCategory', 'Types of Vaccines'],
  ],
  results: [
    ['VaccineOutcomesCategory', 'Vaccine Outcomes'],
    ['SignificanceCategory', 'Results Significance'],
    ['MainLimitationsCategory', 'Main Limitations'],
  ],
  organizations: [
    ['ManufacturerCategory', 'Manufacturer Category'],
    ['FundingCategory', 'Funding Category'],
    ['SponsorCategory', 'Sponsor Category'],
    ['CollaboratorCategory', 'Collaborator Category'],
  ],
};

export const WORD_FIELDS = [
  ['CleanedManufacturerType', 'Manufacturers'],
  ['CleanedFundingSource', 'Funding Sources'],
  ['Sponsor', 'Sponsors'],
  ['Collaborators', 'Collaborators'],
];

export const PHASE_ORDER = [
  'Early Phase Trials',
  'Mid-Phase Trials',
  'Late Phase Trials',
  'Post-Marketing Trials',
  'Multiple Phases',
];

export const TABLE_COLUMNS = [
  'StudyTitle',
  'FirstAuthor',
  'PublicationYear',
  'Country',
  'PhaseCategory',
  'PopulationCategory',
  'ConditionCategory',
  'VaccineNameCategory',
  'TypesofVaccinesCategory',
  'VaccineOutcomesCategory',
  'SignificanceCategory',
  'ManufacturerCategory',
  'FundingCategory',
  'StudyStatus',
];
