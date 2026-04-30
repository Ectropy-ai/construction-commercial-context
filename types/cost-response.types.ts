import type { BpcAssemblyCostComposite } from './bpc-cost-composite.types';
import type { BpcAssemblyCostGrounded } from './bpc-cost-grounded.types';
import type { AssemblyCategory } from './bpc-enums.types';

/**
 * Response types for the Cost Intelligence Service (port 5009).
 * These are the consumer-facing shapes returned by the 9 cost routes.
 * Workstream D routes must return shapes assignable to these types.
 */

/** Single material pricing entry in a compare or current-pricing response. */
export interface MaterialPricingEntry {
  readonly materialCode: string;
  readonly assemblyName: string | null;
  readonly assemblyCategory: AssemblyCategory | null;
  readonly compositePpi: number | null;
  readonly ppiDate: string | null;
  readonly basePricePerSf: number | null;
  readonly regionalFactor: number;
  readonly adjustedPricePerSf: number | null;
  readonly metroArea: string;
  readonly supplier: string | null;
  readonly signalCount: number | null;
  readonly dataStatus: 'live_ppi_composite' | 'mock' | 'not_found';
  readonly confidence: number | null;
}

/**
 * Combined dual-channel pricing response.
 * Merges PPI signal channel (composite_ppi) and product-anchored channel
 * (grounded_cost_per_sf) for a single assembly.
 */
export interface DualChannelPricingResponse {
  readonly assemblyCode: string;
  readonly assemblyName: string | null;
  readonly metroArea: string;
  readonly regionalFactor: number;
  readonly ppiChannel: Pick<
    BpcAssemblyCostComposite,
    'compositePpi' | 'asOfDate' | 'signalCount' | 'weightBreakdown' | 'includesPreliminary'
  >;
  readonly groundedChannel: Pick<
    BpcAssemblyCostGrounded,
    'groundedCostPerSf' | 'coveragePct' | 'pricedLayerCount' | 'totalLayerCount' | 'asOfDate'
  >;
  readonly dataStatus: 'live_ppi_composite' | 'partial' | 'grounded_only' | 'ppi_only' | 'no_data';
}

/** One historical PPI index data point with momentum fields. */
export interface PpiHistoryPoint {
  readonly period: string;
  readonly value: number;
  readonly preliminary: boolean | null;
  readonly momChangePct: number | null;
  readonly yoyChangePct: number | null;
}

/** Response shape for /price-history/{material_code}. */
export interface PriceHistoryResponse {
  readonly materialCode: string;
  readonly category: string;
  readonly seriesId: string;
  readonly history: readonly PpiHistoryPoint[];
  readonly currentValue: number | null;
  readonly currentPeriod: string | null;
  readonly dataStatus: 'live' | 'cached' | 'mock';
}

/** Response shape for /ppi-index. */
export interface PpiIndexResponse {
  readonly seriesId: string;
  readonly category: string;
  readonly description: string;
  readonly currentValue: number | null;
  readonly currentPeriod: string | null;
  readonly previousValue: number | null;
  readonly momChangePct: number | null;
  readonly yoyChangePct: number | null;
  readonly dataStatus: 'live' | 'cached' | 'mock';
}

/** Response shape for /cost-index/{metro_area}. */
export interface CostIndexResponse {
  readonly metroArea: string;
  readonly cbsaCode: string | null;
  readonly adjustmentFactor: number;
  readonly effectiveDate: string;
  readonly categories: readonly {
    readonly category: string;
    readonly adjustmentFactor: number;
  }[];
  readonly dataStatus: 'live' | 'mock';
}

/** Single-category trend analysis data point. */
export interface TrendDataPoint {
  readonly period: string;
  readonly value: number;
  readonly trendDirection: 'up' | 'down' | 'flat';
  readonly percentile: number | null;
}

/** Response shape for /trend-analysis. */
export interface TrendAnalysisResponse {
  readonly category: string;
  readonly seriesId: string;
  readonly trendPeriodMonths: number;
  readonly overallDirection: 'up' | 'down' | 'flat' | 'volatile';
  readonly currentIndex: number | null;
  readonly peakIndex: number | null;
  readonly troughIndex: number | null;
  readonly momAvgChangePct: number | null;
  readonly yoyChangePct: number | null;
  readonly dataPoints: readonly TrendDataPoint[];
  readonly dataStatus: 'live' | 'cached' | 'mock';
}

/** Differential between two materials in a compare response. */
export interface CostDifferential {
  readonly from: string;
  readonly to: string;
  readonly deltaPerSf: number;
  readonly deltaPct: number | null;
  readonly savingsAtQuantity: number;
  readonly quantitySf: number;
  readonly recommendation: string;
}

/** Response shape for /compare. */
export interface CompareResponse {
  readonly comparisonDate: string;
  readonly metroArea: string;
  readonly regionalFactor: number;
  readonly quantitySf: number;
  readonly comparisons: readonly MaterialPricingEntry[];
  readonly differentials: readonly CostDifferential[];
  readonly dataStatus: 'live_ppi_composite' | 'partial' | 'mock';
}

/** One market signal data point. */
export interface MarketSignalItem {
  readonly indicator: string;
  readonly value: number | null;
  readonly period: string | null;
  readonly trend: 'rising' | 'falling' | 'stable' | 'unknown';
  readonly source: string;
}

/** Response shape for /market-signals. */
export interface MarketSignalsResponse {
  readonly asOf: string;
  readonly signals: readonly MarketSignalItem[];
  readonly dataStatus: 'live' | 'mock';
}

/** Response shape for /assembly-pricing. */
export interface AssemblyPricingResponse {
  readonly assemblyCode: string;
  readonly assemblyName: string | null;
  readonly assemblyCategory: AssemblyCategory | null;
  readonly quantitySf: number;
  readonly metroArea: string;
  readonly regionalFactor: number;
  readonly pricing: {
    readonly compositePpi: number | null;
    readonly ppiDate: string | null;
    readonly basePricePerSf: number | null;
    readonly adjustedPricePerSf: number | null;
    readonly totalMaterialCost: number | null;
  };
  readonly weightBreakdown: Readonly<Record<string, string>>;
  readonly layerCount: number;
  readonly dataStatus: 'live_ppi_composite' | 'mock';
}
