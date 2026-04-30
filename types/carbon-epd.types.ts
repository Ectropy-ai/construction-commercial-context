/**
 * Product Environmental Product Declaration (EPD) record from cis-carbon.
 * Mirrors services/carbon/src/routes/product_epd.py:ProductEpdResponse.
 *
 * Wire shape returned by GET /api/v1/carbon/product/{productId}/epd.
 * Returns ProductEpdResponse[] — a product can have multiple active EPDs
 * (across program operators or successive valid windows).
 */

export interface ProductEpdResponse {
  /** Product UUID (BPC product.id). */
  readonly productId: string;

  /** EPD identifier issued by program operator (e.g. "EC3-12345"). Null if pre-publication. */
  readonly epdId: string | null;

  /** EPD program operator (e.g. "UL Environment", "ASTM International"). */
  readonly epdProgramOperator: string | null;

  /** Global Warming Potential, A1–A3 modules, kg CO2e per declaredUnit. Null if unreported. */
  readonly gwpA1a3: number | null;

  /** Declared functional unit (e.g. "1 m2", "1 kg", "1 MSF"). */
  readonly declaredUnit: string | null;

  /** Recycled content fraction [0.0, 1.0]. Null if unreported. */
  readonly recycledContentPct: number | null;

  /**
   * Biogenic carbon, kg CO2e per declaredUnit. Can be negative (carbon sequestered).
   * Null if unreported.
   */
  readonly biogenicCarbon: number | null;

  /** ISO 8601 date string (YYYY-MM-DD) when this EPD becomes invalid. Null if no expiration. */
  readonly validUntil: string | null;

  /** Source URL (typically buildingtransparency.org or program operator site). */
  readonly sourceUrl: string | null;
}
