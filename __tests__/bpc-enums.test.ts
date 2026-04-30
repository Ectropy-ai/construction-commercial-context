import { describe, it, expect } from 'vitest';
import type { QtyUnit, AssemblyCategory, ZoneType, FaceDesignation, LaborPhase } from '../types/bpc-enums.types';

describe('QtyUnit', () => {
  it('accepts all 10 DB enum values', () => {
    const values: QtyUnit[] = ['SF', 'LF', 'EA', 'CY', 'TON', 'GAL', 'BAG', 'ROLL', 'SHEET', 'STICK'];
    expect(values).toHaveLength(10);
  });

  it('rejects unknown value — @ts-expect-error', () => {
    // @ts-expect-error — 'MSF' is not a valid QtyUnit
    const bad: QtyUnit = 'MSF';
    void bad;
  });
});

describe('AssemblyCategory', () => {
  it('accepts all 22 DB enum values', () => {
    const values: AssemblyCategory[] = [
      'wall_partition', 'wall_loadbearing', 'wall_exterior', 'wall_shaft',
      'wall_fire_barrier', 'wall_demising', 'wall_curtain', 'wall_furring',
      'floor_on_grade', 'floor_elevated', 'floor_raised_access',
      'ceiling_suspended', 'ceiling_direct', 'ceiling_specialty',
      'roof_low_slope', 'roof_steep_slope', 'roof_green',
      'soffit', 'column_wrap', 'beam_wrap', 'bulkhead', 'canopy',
    ];
    expect(values).toHaveLength(22);
  });

  it('rejects unknown value — @ts-expect-error', () => {
    // @ts-expect-error — 'wall_generic' is not a valid AssemblyCategory
    const bad: AssemblyCategory = 'wall_generic';
    void bad;
  });
});

describe('ZoneType', () => {
  it('accepts all 9 DB enum values', () => {
    const values: ZoneType[] = [
      'finish', 'core', 'substrate', 'barrier', 'sheathing',
      'insulation_continuous', 'cladding', 'membrane', 'ballast',
    ];
    expect(values).toHaveLength(9);
  });
});

describe('FaceDesignation', () => {
  it('accepts all 3 DB enum values', () => {
    const values: FaceDesignation[] = ['face_a', 'face_b', 'internal'];
    expect(values).toHaveLength(3);
  });
});

describe('LaborPhase', () => {
  it('accepts all 5 DB enum values', () => {
    const values: LaborPhase[] = ['rough', 'insulate', 'close', 'finish', 'final'];
    expect(values).toHaveLength(5);
  });
});
