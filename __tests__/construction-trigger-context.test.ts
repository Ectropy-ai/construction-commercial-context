import { describe, it, expect } from 'vitest';
import type { ConstructionTriggerContext } from '../types/construction-trigger-context.types';

describe('ConstructionTriggerContext', () => {
  it('constructs minimal valid object', () => {
    const ctx: ConstructionTriggerContext = {
      decisionType: 'APPROVAL',
      title: 'HVAC Supply Duct Routing Conflict',
    };
    expect(ctx.decisionType).toBe('APPROVAL');
    expect(ctx.title).toBe('HVAC Supply Duct Routing Conflict');
  });

  it('constructs maximal valid object with every optional field', () => {
    const ctx: ConstructionTriggerContext = {
      decisionType: 'PROPOSAL',
      title: 'Column Base Plate Tolerance Deviation',
      description: 'Steel column base plate at Grid A2 is 12mm off design centerline.',
      voxelRef: 'urn:luhtech:project:voxel:VOX-ZONE-A-10-20-05',
      voxelAttachments: [{
        voxelRef: 'urn:luhtech:project:voxel:VOX-ZONE-A-10-20-05',
        attachmentType: 'PRIMARY',
        attachedBy: 'SYSTEM',
      }],
      voxelContext: {
        voxelId: 'VOX-ZONE-A-10-20-05',
        coordinates: { x: 10, y: 20, z: 5 },
        zone: 'ZONE-A',
        system: 'STRUCT',
      },
      question: 'Approve 12mm tolerance deviation at Grid A2?',
      rationale: 'Within structural performance tolerance; cosmetic impact only.',
      ifcElementGuids: ['2HvX7A1kPERBR9wM3EjlwN'],
      clashLocation: {
        bbox: [1.5, -1.5, 1.4, 3.5, 1.5, 2.1],
        centroid: { x: 2.5, y: 0.0, z: 1.75 },
      },
      criticalPath: false,
      lookAheadWeek: 3,
    };
    expect(ctx.ifcElementGuids).toHaveLength(1);
    expect(ctx.clashLocation?.centroid.x).toBe(2.5);
    expect(ctx.criticalPath).toBe(false);
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    const ctx: ConstructionTriggerContext = { decisionType: 'APPROVAL', title: 'Test' };
    // @ts-expect-error — title is readonly
    ctx.title = 'mutated';
  });
});
