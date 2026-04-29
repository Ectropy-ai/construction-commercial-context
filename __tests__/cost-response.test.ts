import { describe, it, expect } from 'vitest';
import type {
  DualChannelPricingResponse,
  PriceHistoryResponse,
  CompareResponse,
  AssemblyPricingResponse,
  MarketSignalsResponse,
} from '../types/cost-response.types';

describe('DualChannelPricingResponse', () => {
  it('constructs combined channel response', () => {
    const resp: DualChannelPricingResponse = {
      assemblyCode: 'GA-WP-3',
      assemblyName: 'GA 5/8" Type X Wallboard — 3 5/8" Steel Stud',
      metroArea: 'National Average',
      regionalFactor: 1.0,
      ppiChannel: {
        compositePpi: 318.42,
        asOfDate: '2026-03-01',
        signalCount: 3,
        weightBreakdown: 'wallboard=60%, steel_framing=30%, fasteners=10%',
        includesPreliminary: false,
      },
      groundedChannel: {
        groundedCostPerSf: null,
        coveragePct: 0.0,
        pricedLayerCount: 0,
        totalLayerCount: 7,
        asOfDate: null,
      },
      dataStatus: 'ppi_only',
    };
    expect(resp.ppiChannel.compositePpi).toBe(318.42);
    expect(resp.groundedChannel.groundedCostPerSf).toBeNull();
    expect(resp.dataStatus).toBe('ppi_only');
  });
});

describe('PriceHistoryResponse', () => {
  it('constructs with history array', () => {
    const resp: PriceHistoryResponse = {
      materialCode: 'GA-WP-3',
      category: 'wallboard',
      seriesId: 'PCU3274203274201',
      history: [
        { period: '2026-03-01', value: 318.42, preliminary: false, momChangePct: -0.25, yoyChangePct: 2.1 },
        { period: '2026-02-01', value: 319.21, preliminary: false, momChangePct: 0.12, yoyChangePct: 2.3 },
      ],
      currentValue: 318.42,
      currentPeriod: '2026-03-01',
      dataStatus: 'live',
    };
    expect(resp.history).toHaveLength(2);
    expect(resp.dataStatus).toBe('live');
  });
});

describe('CompareResponse', () => {
  it('constructs multi-material comparison', () => {
    const resp: CompareResponse = {
      comparisonDate: '2026-04-29',
      metroArea: 'San Diego, CA',
      regionalFactor: 1.12,
      quantitySf: 1000,
      comparisons: [
        {
          materialCode: 'GA-WP-3',
          assemblyName: 'GA 5/8" Wallboard',
          assemblyCategory: 'wall_partition',
          compositePpi: 318.42,
          ppiDate: '2026-03-01',
          basePricePerSf: 1.274,
          regionalFactor: 1.12,
          adjustedPricePerSf: 1.427,
          metroArea: 'San Diego, CA',
          supplier: null,
          signalCount: 3,
          dataStatus: 'live_ppi_composite',
          confidence: 0.75,
        },
      ],
      differentials: [],
      dataStatus: 'live_ppi_composite',
    };
    expect(resp.comparisons).toHaveLength(1);
    expect(resp.regionalFactor).toBe(1.12);
  });
});

describe('AssemblyPricingResponse', () => {
  it('constructs assembly-level pricing breakdown', () => {
    const resp: AssemblyPricingResponse = {
      assemblyCode: 'ACT-24',
      assemblyName: 'Armstrong 24"×24" Acoustical Ceiling Tile',
      assemblyCategory: 'ceiling_suspended',
      quantitySf: 500,
      metroArea: 'National Average',
      regionalFactor: 1.0,
      pricing: {
        compositePpi: 310.0,
        ppiDate: '2026-03-01',
        basePricePerSf: 1.24,
        adjustedPricePerSf: 1.24,
        totalMaterialCost: 620.0,
      },
      weightBreakdown: { ceiling_tile: '70%', grid: '30%' },
      layerCount: 3,
      dataStatus: 'live_ppi_composite',
    };
    expect(resp.pricing.totalMaterialCost).toBe(620.0);
    expect(resp.layerCount).toBe(3);
  });
});

describe('MarketSignalsResponse', () => {
  it('constructs market signals response', () => {
    const resp: MarketSignalsResponse = {
      asOf: '2026-04-29T10:00:00Z',
      signals: [
        { indicator: 'steel_framing_ppi', value: 285.1, period: '2026-03-01', trend: 'rising', source: 'bls' },
        { indicator: 'fred_cpi_construction', value: null, period: null, trend: 'unknown', source: 'fred' },
      ],
      dataStatus: 'live',
    };
    expect(resp.signals).toHaveLength(2);
    expect(resp.signals[1]?.value).toBeNull();
  });
});
