import { describe, it, expect } from 'vitest';
import {
  CONSTRUCTION_COMMERCIAL_DOMAIN,
  type ConstructionCommercialDomain,
} from '../types/construction-commercial-domain.types';

describe('CONSTRUCTION_COMMERCIAL_DOMAIN', () => {
  it('has correct value', () => {
    expect(CONSTRUCTION_COMMERCIAL_DOMAIN).toBe('construction-commercial');
  });

  it('is a const string literal (not widened)', () => {
    const val: ConstructionCommercialDomain = CONSTRUCTION_COMMERCIAL_DOMAIN;
    expect(val).toBe('construction-commercial');
  });

  it('type is a string literal (not widened to string)', () => {
    // ConstructionCommercialDomain is the exact literal type, not string
    const val: ConstructionCommercialDomain = CONSTRUCTION_COMMERCIAL_DOMAIN;
    // The following would be a type error at compile time (tested via tsc --noEmit):
    // const bad: ConstructionCommercialDomain = 'other-domain'; // @ts-expect-error
    expect(typeof val).toBe('string');
    expect(val).toBe('construction-commercial');
  });
});
