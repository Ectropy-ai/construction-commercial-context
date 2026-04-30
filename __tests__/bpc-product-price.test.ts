import { describe, it, expect } from 'vitest';
import type { BpcProductPrice } from '../types/bpc-product-price.types';

describe('BpcProductPrice', () => {
  it('constructs national price row (no region)', () => {
    const price: BpcProductPrice = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      productId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      basePrice: 0.42,
      priceUnit: 'SF',
      currency: 'USD',
      region: null,
      effectiveDate: '2026-04-01',
      expiresDate: null,
      sourceId: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      notes: null,
      createdAt: '2026-04-01T00:00:00Z',
    };
    expect(price.basePrice).toBe(0.42);
    expect(price.priceUnit).toBe('SF');
    expect(price.region).toBeNull();
  });

  it('constructs regional price row', () => {
    const price: BpcProductPrice = {
      id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      productId: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      basePrice: 0.47,
      priceUnit: 'SF',
      currency: 'USD',
      region: 'San Francisco, CA',
      effectiveDate: '2026-04-01',
      expiresDate: '2026-12-31',
      sourceId: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      notes: 'Q2 distributor list price',
      createdAt: '2026-04-01T00:00:00Z',
    };
    expect(price.region).toBe('San Francisco, CA');
    expect(price.priceUnit).toBe('SF');
  });
});
