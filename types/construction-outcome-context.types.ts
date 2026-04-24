/**
 * Construction-specific outcome data. Either populated in
 * DecisionOutcome.downstreamEffects[].metadata, or carried as
 * a follow-up DecisionEvent with type='consequence'.
 */
export type VoxelInstallationStatus =
  | 'planned'
  | 'design_approved'
  | 'procurement'
  | 'in_progress'
  | 'completed'
  | 'on_hold'
  | 'rejected';

export interface ConstructionOutcomeContext {
  readonly budgetActual?: number;
  readonly budgetVariance?: number;
  readonly scheduleActualDelayDays?: number;
  readonly scheduleActualDelayHours?: number;
  readonly voxelStatus?: VoxelInstallationStatus;
  readonly inspectionResults?: readonly string[];
}
