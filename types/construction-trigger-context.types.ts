import type { Urn } from '@ectropy/schemas';
import type {
  VoxelAttachment,
  VoxelContext,
  VoxelCoordinates,
} from './voxel-attachment.types';
import type { ConstructionDecisionType } from './construction-decision-type.types';

/**
 * Typed payload for DecisionEvent.trigger.context when
 * domain === 'construction-commercial'.
 */
export interface ConstructionTriggerContext {
  readonly decisionType: ConstructionDecisionType;
  readonly title: string;
  readonly description?: string;
  readonly voxelRef?: Urn;
  readonly voxelAttachments?: readonly VoxelAttachment[];
  readonly voxelContext?: VoxelContext;
  readonly question?: string;
  readonly rationale?: string;
  readonly ifcElementGuids?: readonly string[];
  readonly clashLocation?: {
    readonly bbox: readonly [number, number, number, number, number, number];
    readonly centroid: VoxelCoordinates;
  };
  readonly criticalPath?: boolean;
  readonly lookAheadWeek?: number;
}
