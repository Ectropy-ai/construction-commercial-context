import { describe, it, expect } from 'vitest';
import type { CostPpiSeries, CostPpiValue } from '../types/cost-ppi.types';

describe('CostPpiSeries', () => {
  it('constructs valid series row', () => {
    const series: CostPpiSeries = {
      seriesId: 'PCU3274203274201',
      description: 'PPI Industry Data for Wallboard Manufacturing',
      category: 'wallboard',
      unit: 'index',
      seasonalAdj: false,
      active: true,
      dataSource: 'bls_ppi',
      createdAt: '2026-04-01T00:00:00Z',
    };
    expect(series.seriesId).toBe('PCU3274203274201');
    expect(series.category).toBe('wallboard');
  });

  it('constructs series with nullable fields absent', () => {
    const series: CostPpiSeries = {
      seriesId: 'WPU1073',
      description: 'Steel framing PPI',
      category: 'steel_framing',
      unit: null,
      seasonalAdj: null,
      active: null,
      dataSource: null,
      createdAt: null,
    };
    expect(series.unit).toBeNull();
  });
});

describe('CostPpiValue', () => {
  it('constructs valid PPI value row', () => {
    const val: CostPpiValue = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      seriesId: 'PCU3274203274201',
      period: '2026-03-01',
      value: 318.42,
      preliminary: false,
      revisionDate: null,
      createdAt: '2026-04-15T12:00:00Z',
    };
    expect(val.value).toBe(318.42);
    expect(val.preliminary).toBe(false);
  });
});
