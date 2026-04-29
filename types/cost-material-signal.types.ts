/**
 * Row type for cost.material_cost_signal (table).
 * Per-material cost signal aggregates combining PPI series with
 * optional regional and supplier data.
 * Source: cis_intelligence, migration cost/001.
 */
export interface CostMaterialCostSignal {
  readonly id: string;
  readonly materialCode: string;
  readonly ppiSeriesId: string | null;
  readonly basePrice: number | null;
  readonly currentPrice: number | null;
  /** ISO-8601 YYYY-MM-DD */
  readonly priceDate: string;
  readonly metroArea: string | null;
  readonly supplier: string | null;
  /** 0.0–1.0 confidence score. */
  readonly confidence: number | null;
  readonly dataSource: string | null;
  /** ISO-8601 datetime */
  readonly createdAt: string | null;
}
