/**
 * Domain identifier for commercial construction decisions.
 * Use as the value of DecisionEvent.domain.
 */
export const CONSTRUCTION_COMMERCIAL_DOMAIN = 'construction-commercial' as const;
export type ConstructionCommercialDomain = typeof CONSTRUCTION_COMMERCIAL_DOMAIN;
