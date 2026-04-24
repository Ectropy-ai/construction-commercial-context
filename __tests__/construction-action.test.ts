import { describe, it, expect } from 'vitest';
import type {
  ConstructionActionType,
  ConstructionActionParameters,
} from '../types/construction-action.types';

describe('ConstructionActionType', () => {
  it('accepts all 13 valid action types', () => {
    const types: ConstructionActionType[] = [
      'request_decision', 'approve', 'reject', 'defer', 'escalate',
      'create_tolerance_override', 'create_pre_approval', 'modify_schedule',
      'request_inspection', 'complete_inspection', 'approve_design_change',
      'approve_code_variance', 'substitute_material',
    ];
    expect(types).toHaveLength(13);
  });

  it('invalid value rejected — @ts-expect-error', () => {
    // @ts-expect-error — 'unknown_action' is not valid
    const bad: ConstructionActionType = 'unknown_action';
    void bad;
  });
});

describe('ConstructionActionParameters', () => {
  it('constructs minimal valid object (all optional)', () => {
    const params: ConstructionActionParameters = {};
    expect(params).toBeDefined();
  });

  it('constructs maximal valid object with all fields', () => {
    const params: ConstructionActionParameters = {
      budgetEstimated: 45000,
      budgetCurrency: 'CAD',
      budgetLine: 'MEP-HVAC-L1',
      delayDays: 7,
      delayHours: 168,
      affectedMilestones: ['urn:luhtech:project:milestone:M-003'],
      substituteFromUrn: 'urn:luhtech:project:material:EMT-conduit',
      substituteToUrn: 'urn:luhtech:project:material:rigid-conduit',
      toleranceValue: '12',
      toleranceUnit: 'mm',
      inspectionType: 'ROUGH_IN',
      customField: 'extra data',
    };
    expect(params.budgetEstimated).toBe(45000);
    expect(params.budgetCurrency).toBe('CAD');
    expect(params['customField']).toBe('extra data');
  });
});
