/**
 * Row type for cost.regional_adjustment (table).
 * ENR regional cost adjustment factors applied to baseline PPI prices.
 * Source: cis_intelligence, migration cost/001.
 */
export interface CostRegionalAdjustment {
  readonly id: string;
  readonly metroArea: string;
  readonly cbsaCode: string | null;
  readonly category: string;
  /** Multiplier applied to national baseline price (e.g. 1.12 = 12% above national). */
  readonly adjustmentFactor: number;
  /** ISO-8601 YYYY-MM-DD */
  readonly effectiveDate: string;
  readonly dataSource: string | null;
  /** 0.0–1.0 confidence score for this adjustment factor. */
  readonly confidence: number | null;
  /** ISO-8601 datetime */
  readonly createdAt: string | null;
}
