/**
 * Row types for cost.ppi_series and cost.ppi_value (tables).
 * BLS Producer Price Index ingestion layer.
 * Source: cis_intelligence, migration cost/001.
 */

/** Registry of BLS PPI series known to the cost service. */
export interface CostPpiSeries {
  readonly seriesId: string;
  readonly description: string;
  readonly category: string;
  readonly unit: string | null;
  readonly seasonalAdj: boolean | null;
  readonly active: boolean | null;
  readonly dataSource: string | null;
  /** ISO-8601 datetime */
  readonly createdAt: string | null;
}

/** One time-series data point for a BLS PPI series. */
export interface CostPpiValue {
  readonly id: string;
  readonly seriesId: string;
  /** ISO-8601 YYYY-MM-DD — the BLS period start date */
  readonly period: string;
  readonly value: number;
  readonly preliminary: boolean | null;
  /** ISO-8601 datetime of last revision, if any */
  readonly revisionDate: string | null;
  /** ISO-8601 datetime */
  readonly createdAt: string | null;
}
