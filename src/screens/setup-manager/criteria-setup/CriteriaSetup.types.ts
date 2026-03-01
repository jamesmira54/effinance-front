export type DataSource = 'CUSTOM_INPUT' | 'COMPUTED' | 'COLUMN';
export type Preference = 'MAX' | 'MIN';
export type FormulaType = 'SUM' | 'AVG' | null;

export interface RequiredColumn {
  table: string;
  column: string;
}

export interface Criterion {
  name: string;
  label: string;
  dataSource: DataSource;
  formulaType: FormulaType;
  preference: Preference;
  requiredColumns: RequiredColumn[] | null;
}

export interface Pairwise {
  criteriaNameA: string;
  criteriaNameB: string;
  value: number;
}

export interface CriteriaPayload {
  criterionCategoryId: string;
  criteria: Criterion[];
  pairwise: Pairwise[];
}

export interface CriteriaFormValues {
  criterionCategoryId: string;
  criteria: Criterion[];
  pairwiseValues: Record<string, number>;
}

export interface CriterionCategory {
  id: string;
  name: string;
  criterions: CriterionCategory[];
}