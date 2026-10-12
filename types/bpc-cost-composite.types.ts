/**
 * Row type for bpc.assembly_cost_composite (view).
 * PPI signal channel — weighted BLS Producer Price Index per assembly.
 * All fields are nullable.
 */
export interface BpcAssemblyCostComposite {
  readonly assemblyId: string | null;
  readonly assemblyName: string | null;
  readonly assemblyCode: string | null;
  /** Weighted composite PPI index value (dimensionless, not currency). */
  readonly compositePpi: number | null;
  readonly asOfDate: string | null;
  readonly includesPreliminary: boolean | null;
  readonly signalCount: number | null;
  /** Comma-separated "role=weight%" pairs, ordered by weight descending. */
  readonly weightBreakdown: string | null;
}
