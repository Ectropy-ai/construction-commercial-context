import type { Urn } from '@ectropy/schemas';

/**
 * Multi-party participant tracking for construction-commercial decisions.
 * Carried in graph metadata or as ancillary participant-event records.
 */
export interface ConstructionParticipants {
  readonly requestedBy?: Urn;
  readonly approvedBy?: Urn;
  readonly rejectedBy?: Urn;
  readonly escalatedTo?: Urn;
  readonly escalatedBy?: Urn;
  readonly notified?: readonly Urn[];
}
