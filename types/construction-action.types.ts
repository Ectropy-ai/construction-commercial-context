import type { Urn } from '@ectropy/schemas';

/** Action types for construction-commercial decisions. */
export type ConstructionActionType =
  | 'request_decision'
  | 'approve'
  | 'reject'
  | 'defer'
  | 'escalate'
  | 'create_tolerance_override'
  | 'create_pre_approval'
  | 'modify_schedule'
  | 'request_inspection'
  | 'complete_inspection'
  | 'approve_design_change'
  | 'approve_code_variance'
  | 'substitute_material';

/**
 * Typed parameters for DecisionAction.parameters when
 * domain === 'construction-commercial'.
 */
export interface ConstructionActionParameters {
  readonly budgetEstimated?: number;
  readonly budgetCurrency?: string;
  readonly budgetLine?: string;
  readonly delayDays?: number;
  readonly delayHours?: number;
  readonly affectedMilestones?: readonly Urn[];
  readonly substituteFromUrn?: Urn;
  readonly substituteToUrn?: Urn;
  readonly toleranceValue?: string;
  readonly toleranceUnit?: string;
  readonly inspectionType?: string;
  readonly [key: string]: unknown;
}
