import { describe, it, expect } from 'vitest';
import type { ConstructionDecisionType } from '../types/construction-decision-type.types';

describe('ConstructionDecisionType', () => {
  it('accepts all valid values', () => {
    const types: ConstructionDecisionType[] = [
      'APPROVAL',
      'REJECTION',
      'DEFERRAL',
      'ESCALATION',
      'PROPOSAL',
      'CONSEQUENCE',
    ];
    expect(types).toHaveLength(6);
    expect(types).toContain('APPROVAL');
    expect(types).not.toContain('REGULATORY'); // REGULATORY is an authority level, not a decision type
  });

  it('invalid value rejected by type system — @ts-expect-error', () => {
    // @ts-expect-error — 'INVALID' is not a ConstructionDecisionType
    const bad: ConstructionDecisionType = 'INVALID';
    void bad;
  });
});
