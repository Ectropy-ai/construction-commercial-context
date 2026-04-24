import { describe, it, expect } from 'vitest';
import type { ConstructionEvidence, ConstructionEvidenceType } from '../types/construction-evidence.types';
import type { Evidence } from '@ectropy/schemas';

describe('ConstructionEvidenceType', () => {
  it('accepts all 8 valid evidence types', () => {
    const types: ConstructionEvidenceType[] = [
      'photo', 'document', 'voice-note', 'video',
      'measurement', 'sms', 'email', 'meeting-transcript',
    ];
    expect(types).toHaveLength(8);
  });

  it('invalid type rejected — @ts-expect-error', () => {
    // @ts-expect-error — 'spreadsheet' is not a valid ConstructionEvidenceType
    const bad: ConstructionEvidenceType = 'spreadsheet';
    void bad;
  });
});

describe('ConstructionEvidence', () => {
  it('constructs minimal valid object', () => {
    const ev: ConstructionEvidence = {
      $id: 'urn:luhtech:project:evidence:EV-001',
      type: 'photo',
      uri: 's3://ectropy-staging-configs/evidence/EV-001.jpg',
      hash: 'a'.repeat(64),
      timestamp: '2026-04-23T09:15:00Z',
      capturedBy: 'urn:luhtech:project:participant:lisa-chen',
    };
    expect(ev.type).toBe('photo');
  });

  it('is assignable to universal Evidence base type', () => {
    const ev: ConstructionEvidence = {
      $id: 'urn:luhtech:project:evidence:EV-002',
      type: 'measurement',
      uri: 'https://ectropy.ai/evidence/EV-002.json',
      hash: 'b'.repeat(64),
      timestamp: '2026-04-23T10:00:00Z',
      capturedBy: 'urn:luhtech:project:participant:james-okafor',
    };
    const base: Evidence = ev;
    expect(base.$id).toBe('urn:luhtech:project:evidence:EV-002');
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    const ev: ConstructionEvidence = {
      $id: 'urn:luhtech:x:evidence:E',
      type: 'photo',
      uri: 's3://x/y',
      hash: 'c'.repeat(64),
      timestamp: '2026-01-01T00:00:00Z',
      capturedBy: 'urn:luhtech:x:participant:p',
    };
    // @ts-expect-error — type is readonly
    ev.type = 'video';
  });
});
