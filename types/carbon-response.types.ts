/**
 * Assembly embodied carbon response from cis-carbon (port 5010).
 * Mirrors services/carbon/src/routes/assembly_carbon.py:AssemblyCarbonResponse.
 *
 * Wire shape returned by GET /api/v1/carbon/assembly/{code}.
 * cis-carbon uses alias_generator=to_camel so fields are camelCase on the wire.
 */

/**
 * Data quality signal accompanying every assembly carbon response.
 *
 * - "live"     — assembly is fully covered by current EPDs (fully_normalized,
 *                no unnormalized layers). GWP estimate is high-confidence.
 * - "partial"  — assembly has some EPD coverage but not all product layers
 *                are normalized. GWP estimate exists but coverage_pct < 1.0.
 *                Downstream agents should reflect partial confidence.
 * - "no_data"  — no EPDs available for this assembly's products, or assembly
 *                code not found. gwpTotalPerSf is null.
 */
export type CarbonDataStatus = 'live' | 'partial' | 'no_data';

export interface AssemblyCarbonResponse {
  /** Assembly code (uppercase, e.g. "GA-WP-3"). */
  readonly assemblyCode: string;

  /** Human-readable assembly name. Null if assembly not found. */
  readonly assemblyName: string | null;

  /** Total embodied carbon per square foot, kg CO2e/SF. Null if no_data. */
  readonly gwpTotalPerSf: number | null;

  /** Comma-separated list of declared units present in source EPDs (e.g. "m2,kg"). */
  readonly sourceDeclaredUnits: string | null;

  /** Total count of EPDs touching this assembly's products. */
  readonly epdCount: number;

  /** Count of product layers whose EPDs were unit-normalized to per-SF basis. */
  readonly normalizedCount: number;

  /** Count of product layers whose EPDs could not be normalized (mixed/unsupported units). */
  readonly unnormalizedCount: number;

  /** True iff every product layer's EPD was successfully normalized to per-SF basis. */
  readonly fullyNormalized: boolean;

  /**
   * Coverage ratio: normalizedCount / (normalizedCount + unnormalizedCount).
   * Null if there are no layers (denominator zero, no_data path).
   * Range [0.0, 1.0]. coveragePct === 1.0 iff fullyNormalized === true.
   */
  readonly coveragePct: number | null;

  /** See CarbonDataStatus for semantics. */
  readonly dataStatus: CarbonDataStatus;
}
