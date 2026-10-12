import type { AssemblyCategory } from './bpc-enums.types';

/**
 * Row type for bpc.assembly_cost_grounded (view).
 * Product-anchored cost channel — per-assembly cost rolled up from
 * bpc.product_price through the layer/zone/assembly hierarchy.
 * All fields are nullable.
 */
export interface BpcAssemblyCostGrounded {
  readonly assemblyId: string | null;
  readonly assemblyName: string | null;
  readonly assemblyCode: string | null;
  readonly category: AssemblyCategory | null;
  /** Total material cost per SF, derived from base_price × qty_per_unit summed across layers. */
  readonly groundedCostPerSf: number | null;
  /** Always 'USD' in current schema. */
  readonly currency: string | null;
  readonly pricedLayerCount: number | null;
  readonly totalLayerCount: number | null;
  /** Percentage of layers with at least one price record (0.0–100.0). */
  readonly coveragePct: number | null;
  readonly asOfDate: string | null;
}
