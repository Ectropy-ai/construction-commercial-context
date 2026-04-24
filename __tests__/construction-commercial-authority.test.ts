import { describe, it, expect } from 'vitest';
import { CONSTRUCTION_COMMERCIAL_AUTHORITY } from '../types/construction-commercial-authority.types';
import type { AuthorityLabelMap } from '@ectropy/schemas';

describe('CONSTRUCTION_COMMERCIAL_AUTHORITY', () => {
  it('has all 7 keys (0..6)', () => {
    const keys = Object.keys(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels).map(Number);
    expect(keys).toHaveLength(7);
    for (let i = 0; i <= 6; i++) expect(keys).toContain(i);
  });

  it('domain is construction-commercial', () => {
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.domain).toBe('construction-commercial');
  });

  it('labels match construction cascade', () => {
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[0]).toBe('FIELD');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[1]).toBe('FOREMAN');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[2]).toBe('SUPERINTENDENT');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[3]).toBe('PM');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[4]).toBe('ARCHITECT');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[5]).toBe('OWNER');
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[6]).toBe('REGULATORY');
  });

  it('is assignable to AuthorityLabelMap (universal base)', () => {
    const base: AuthorityLabelMap = CONSTRUCTION_COMMERCIAL_AUTHORITY;
    expect(base.domain).toBe('construction-commercial');
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    // @ts-expect-error — domain is readonly
    CONSTRUCTION_COMMERCIAL_AUTHORITY.domain = 'other';
  });
});
