import type { AuthorityLabelMap } from '@ectropy/schemas';

/**
 * 7-tier construction authority cascade per AIA / IPD / GMP /
 * Design-Build conventions. Maps to the canonical AuthorityLevel
 * 0..6 numeric scale defined in @ectropy/schemas.
 */
export const CONSTRUCTION_COMMERCIAL_AUTHORITY: AuthorityLabelMap = {
  domain: 'construction-commercial',
  labels: {
    0: 'FIELD',
    1: 'FOREMAN',
    2: 'SUPERINTENDENT',
    3: 'PM',
    4: 'ARCHITECT',
    5: 'OWNER',
    6: 'REGULATORY',
  },
  description: 'Commercial construction authority cascade — AIA / IPD / GMP / Design-Build conventions',
};
