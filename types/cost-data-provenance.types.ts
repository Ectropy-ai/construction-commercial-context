/**
 * Row type for cost.data_provenance (table).
 * Lineage record linking cost data rows to their source systems.
 * Source: cis_intelligence, migration cost/001.
 */
export interface CostDataProvenance {
  readonly id: string;
  readonly tableName: string;
  readonly recordId: string;
  readonly fieldName: string;
  readonly sourceSystem: string;
  readonly sourceUrl: string | null;
  /** ISO-8601 datetime of data extraction */
  readonly extractedAt: string;
  /** 0.0–1.0 confidence score. */
  readonly confidence: number;
  readonly notes: string | null;
  /** ISO-8601 datetime */
  readonly createdAt: string | null;
}
