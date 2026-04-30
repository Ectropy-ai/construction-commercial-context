import type { QtyUnit } from './bpc-enums.types';

/**
 * Row type for bpc.product_price (table).
 * Product-anchored pricing row. Sparse by design — coverage grows as
 * manufacturer scrapes and customer-loaded prices populate the table.
 * Source: cis_intelligence, migration 201.
 */
export interface BpcProductPrice {
  readonly id: string;
  readonly productId: string;
  readonly basePrice: number;
  readonly priceUnit: QtyUnit;
  /** ISO 4217, 3-character currency code. Defaults to 'USD'. */
  readonly currency: string;
  /** Optional metro area qualifier. null = national price. */
  readonly region: string | null;
  /** ISO-8601 YYYY-MM-DD */
  readonly effectiveDate: string;
  /** ISO-8601 YYYY-MM-DD. null = remains current until superseded. */
  readonly expiresDate: string | null;
  readonly sourceId: string;
  readonly notes: string | null;
  /** ISO-8601 datetime */
  readonly createdAt: string;
}
