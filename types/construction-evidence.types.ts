import type { Evidence } from '@ectropy/schemas';

export type ConstructionEvidenceType =
  | 'photo'
  | 'document'
  | 'voice-note'
  | 'video'
  | 'measurement'
  | 'sms'
  | 'email'
  | 'meeting-transcript';

/** Construction-commercial evidence subtype with constrained type enum. */
export interface ConstructionEvidence extends Evidence {
  readonly type: ConstructionEvidenceType;
}
