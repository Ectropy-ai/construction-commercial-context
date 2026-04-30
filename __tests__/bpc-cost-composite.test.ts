import { describe, it, expect } from 'vitest';
import type { BpcAssemblyCostComposite } from '../types/bpc-cost-composite.types';

describe('BpcAssemblyCostComposite', () => {
  it('constructs from realistic sparse row (view — all nullable)', () => {
    const row: BpcAssemblyCostComposite = {
      assemblyId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      assemblyName: 'GA 5/8" Type X Wallboard — 3 5/8" Steel Stud',
      assemblyCode: 'GA-WP-3',
      compositePpi: 318.42,
      asOfDate: '2026-03-01',
      includesPreliminary: false,
      signalCount: 3,
      weightBreakdown: 'wallboard=60%, steel_framing=30%, fasteners=10%',
    };
    expect(row.compositePpi).toBe(318.42);
    expect(row.signalCount).toBe(3);
  });

  it('constructs with all null fields (empty view row)', () => {
    const row: BpcAssemblyCostComposite = {
      assemblyId: null,
      assemblyName: null,
      assemblyCode: null,
      compositePpi: null,
      asOfDate: null,
      includesPreliminary: null,
      signalCount: null,
      weightBreakdown: null,
    };
    expect(row.compositePpi).toBeNull();
  });
});
