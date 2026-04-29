import { describe, it, expect } from 'vitest';
import type { BpcAssemblyCostGrounded } from '../types/bpc-cost-grounded.types';

describe('BpcAssemblyCostGrounded', () => {
  it('constructs with realistic partially-covered row', () => {
    const row: BpcAssemblyCostGrounded = {
      assemblyId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      assemblyName: 'GA 5/8" Type X Wallboard — 3 5/8" Steel Stud',
      assemblyCode: 'GA-WP-3',
      category: 'wall_partition',
      groundedCostPerSf: 3.1425,
      currency: 'USD',
      pricedLayerCount: 5,
      totalLayerCount: 7,
      coveragePct: 71.4,
      asOfDate: '2026-04-29',
    };
    expect(row.groundedCostPerSf).toBe(3.1425);
    expect(row.coveragePct).toBe(71.4);
  });

  it('constructs with zero-coverage row (no prices loaded)', () => {
    const row: BpcAssemblyCostGrounded = {
      assemblyId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
      assemblyName: 'GA-WP-3',
      assemblyCode: 'GA-WP-3',
      category: 'wall_partition',
      groundedCostPerSf: null,
      currency: null,
      pricedLayerCount: 0,
      totalLayerCount: 7,
      coveragePct: 0.0,
      asOfDate: null,
    };
    expect(row.groundedCostPerSf).toBeNull();
    expect(row.coveragePct).toBe(0.0);
  });
});
