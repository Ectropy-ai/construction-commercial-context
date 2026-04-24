import { describe, it, expect } from 'vitest';
import type {
  ConstructionOutcomeContext,
  VoxelInstallationStatus,
} from '../types/construction-outcome-context.types';

describe('VoxelInstallationStatus', () => {
  it('accepts all 7 valid values', () => {
    const statuses: VoxelInstallationStatus[] = [
      'planned', 'design_approved', 'procurement',
      'in_progress', 'completed', 'on_hold', 'rejected',
    ];
    expect(statuses).toHaveLength(7);
  });

  it('invalid status rejected — @ts-expect-error', () => {
    // @ts-expect-error — 'archived' is not a valid VoxelInstallationStatus
    const bad: VoxelInstallationStatus = 'archived';
    void bad;
  });
});

describe('ConstructionOutcomeContext', () => {
  it('constructs minimal valid object (all optional)', () => {
    const ctx: ConstructionOutcomeContext = {};
    expect(ctx).toBeDefined();
  });

  it('constructs maximal valid object with every field', () => {
    const ctx: ConstructionOutcomeContext = {
      budgetActual: 43500,
      budgetVariance: -1500,
      scheduleActualDelayDays: 5,
      scheduleActualDelayHours: 120,
      voxelStatus: 'in_progress',
      inspectionResults: ['ROUGH_IN: PASSED', 'FINAL: PENDING'],
    };
    expect(ctx.budgetVariance).toBe(-1500);
    expect(ctx.voxelStatus).toBe('in_progress');
    expect(ctx.inspectionResults).toHaveLength(2);
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    const ctx: ConstructionOutcomeContext = { budgetActual: 45000 };
    // @ts-expect-error — budgetActual is readonly
    ctx.budgetActual = 99999;
  });
});
