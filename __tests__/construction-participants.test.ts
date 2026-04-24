import { describe, it, expect } from 'vitest';
import type { ConstructionParticipants } from '../types/construction-participants.types';

describe('ConstructionParticipants', () => {
  it('constructs minimal valid object (all optional)', () => {
    const p: ConstructionParticipants = {};
    expect(p).toBeDefined();
  });

  it('constructs maximal valid object with every field', () => {
    const p: ConstructionParticipants = {
      requestedBy: 'urn:luhtech:project:participant:field-worker-01',
      approvedBy: 'urn:luhtech:project:participant:lisa-chen',
      escalatedTo: 'urn:luhtech:project:participant:james-okafor',
      escalatedBy: 'urn:luhtech:project:participant:field-worker-01',
      notified: [
        'urn:luhtech:project:participant:priya-sharma',
        'urn:luhtech:project:participant:david-marchetti',
      ],
    };
    expect(p.approvedBy).toBe('urn:luhtech:project:participant:lisa-chen');
    expect(p.notified).toHaveLength(2);
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    const p: ConstructionParticipants = {
      requestedBy: 'urn:luhtech:project:participant:worker-01',
    };
    // @ts-expect-error — requestedBy is readonly
    p.requestedBy = 'urn:luhtech:project:participant:other';
  });
});
