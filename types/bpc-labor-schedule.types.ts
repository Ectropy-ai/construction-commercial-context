import type { LaborPhase, QtyUnit, ZoneType } from './bpc-enums.types';

/**
 * Row type for bpc.assembly_labor_schedule (view).
 * Labor operations per assembly, ordered by sequence.
 * Source: cis_intelligence, migration 003. All fields nullable (computed view).
 */
export interface BpcLaborScheduleRow {
  readonly assemblyId: string | null;
  readonly assemblyName: string | null;
  readonly phase: LaborPhase | null;
  readonly sequenceOrder: number | null;
  readonly operationName: string | null;
  readonly tradeName: string | null;
  readonly hoursPerUnit: number | null;
  /** Unit of measure for hours_per_unit (e.g. SF, LF). */
  readonly rateUnit: QtyUnit | null;
  readonly crewSize: number | null;
  readonly crewComposition: string | null;
  readonly hasFabComponent: boolean | null;
  readonly viivaRouting: boolean | null;
  readonly fabComplexity: string | null;
  readonly zoneType: ZoneType | null;
  readonly zoneLabel: string | null;
}
