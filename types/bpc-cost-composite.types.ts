/**
 * Row type for bpc.assembly_cost_composite (view).
 * PPI signal channel — weighted BLS Producer Price Index per assembly.
 * Source: cis_intelligence, migration 004. All fields nullable (computed view).
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
