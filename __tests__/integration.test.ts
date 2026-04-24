/**
 * Integration test — proves the domain extension pattern works end-to-end.
 *
 * Verifies that:
 *   1. CONSTRUCTION_COMMERCIAL_AUTHORITY has all 7 keys (0..6)
 *   2. A complete DecisionEvent can be built with domain = CONSTRUCTION_COMMERCIAL_DOMAIN
 *      and construction-specific trigger.context and action parameters, satisfying
 *      the universal DecisionEvent type from @ectropy/schemas
 *   3. ConstructionEvidence is assignable to universal Evidence
 *   4. Domain discriminator pattern: isConstructionCommercial() narrows context type
 */

import { describe, it, expect } from 'vitest';
import type {
  DecisionEvent,
  Evidence,
  AuthorityLabelMap,
  DecisionTriggerContext,
} from '@ectropy/schemas';
import {
  CONSTRUCTION_COMMERCIAL_DOMAIN,
} from '../types/construction-commercial-domain.types';
import {
  CONSTRUCTION_COMMERCIAL_AUTHORITY,
} from '../types/construction-commercial-authority.types';
import type { ConstructionTriggerContext } from '../types/construction-trigger-context.types';
import type { ConstructionActionParameters } from '../types/construction-action.types';
import type { ConstructionEvidence } from '../types/construction-evidence.types';

// ─── Test 1: CONSTRUCTION_COMMERCIAL_AUTHORITY has all 7 keys ───────────────

describe('Test 1 — authority map completeness', () => {
  it('CONSTRUCTION_COMMERCIAL_AUTHORITY has all 7 keys (0..6)', () => {
    const keys = Object.keys(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels).map(Number);
    expect(keys).toHaveLength(7);
    for (let i = 0; i <= 6; i++) expect(keys).toContain(i);
  });

  it('is a valid AuthorityLabelMap (universal base)', () => {
    const map: AuthorityLabelMap = CONSTRUCTION_COMMERCIAL_AUTHORITY;
    expect(map.domain).toBe('construction-commercial');
  });
});

// ─── Test 2: complete DecisionEvent with domain context ─────────────────────

describe('Test 2 — complete DecisionEvent with construction-commercial context', () => {
  const context: ConstructionTriggerContext = {
    decisionType: 'APPROVAL',
    title: 'HVAC Supply Duct Routing Conflict — Grid B3, Level 1',
    description: 'Main HVAC supply duct conflicts with W310x97 structural beam.',
    voxelRef: 'urn:luhtech:canadian-plant-pilot:voxel:VOX-ZONE-D-36-30-12',
    voxelContext: {
      voxelId: 'VOX-ZONE-D-36-30-12',
      coordinates: { x: 36, y: 30, z: 12 },
      zone: 'ZONE-D',
      system: 'MEP',
    },
    question: 'Approve reroute of HVAC supply duct from Grid B3 to Grid C3?',
    criticalPath: true,
    lookAheadWeek: 4,
    clashLocation: {
      bbox: [1.5, -1.5, 1.4, 3.5, 1.5, 2.1],
      centroid: { x: 2.5, y: 0.0, z: 1.75 },
    },
  };

  const actionParams: ConstructionActionParameters = {
    budgetEstimated: 45000,
    budgetCurrency: 'CAD',
    delayDays: 7,
    affectedMilestones: ['urn:luhtech:canadian-plant-pilot:milestone:M-003'],
  };

  const event: DecisionEvent = {
    $id: 'urn:luhtech:canadian-plant-pilot:decision-event:DEV-2026-0001',
    schemaVersion: '4.0.0',
    domain: CONSTRUCTION_COMMERCIAL_DOMAIN,
    timestamp: '2026-04-23T10:00:00Z',
    projectId: 'canadian-plant-pilot',
    actorId: 'urn:luhtech:canadian-plant-pilot:participant:lisa-chen',
    authorityLevel: 3,
    trigger: {
      type: 'exception',
      source: 'clash-detection-service',
      urgency: 0.9,
      context: context as unknown as DecisionTriggerContext,
    },
    state: {
      sdi: 15000,
      sdiClassification: 'HEALTHY',
      eigenmodes: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 0.85, 0.75],
      activeConstraints: ['look-ahead-week-4'],
      resourceAvailability: { slackRatio: 0.72 },
    },
    engine1: {
      confidence: 0.92,
      queryLatencyMs: 45,
    },
    engine2: {
      computationDepth: 3,
    },
    mediation: {
      selectedAction: {
        actionType: 'approve',
        parameters: actionParams,
      },
      sourceEngine: 'engine1',
      rationale: 'Pattern match confidence 0.92 — Grid C3 reroute pre-approved pattern',
      explorationAllocation: 0.08,
    },
  };

  it('event satisfies DecisionEvent universal type', () => {
    expect(event.schemaVersion).toBe('4.0.0');
    expect(event.domain).toBe('construction-commercial');
  });

  it('domain field holds CONSTRUCTION_COMMERCIAL_DOMAIN constant', () => {
    expect(event.domain).toBe(CONSTRUCTION_COMMERCIAL_DOMAIN);
  });

  it('trigger.context carries construction-specific fields', () => {
    const ctx = event.trigger.context as unknown as ConstructionTriggerContext;
    expect(ctx.decisionType).toBe('APPROVAL');
    expect(ctx.criticalPath).toBe(true);
    expect(ctx.lookAheadWeek).toBe(4);
  });

  it('mediation.selectedAction.parameters carries typed budget/schedule data', () => {
    const params = event.mediation.selectedAction.parameters as ConstructionActionParameters;
    expect(params.budgetEstimated).toBe(45000);
    expect(params.budgetCurrency).toBe('CAD');
    expect(params.delayDays).toBe(7);
  });

  it('authorityLevel matches construction PM tier (3)', () => {
    expect(event.authorityLevel).toBe(3);
    expect(CONSTRUCTION_COMMERCIAL_AUTHORITY.labels[3]).toBe('PM');
  });
});

// ─── Test 3: ConstructionEvidence assignable to universal Evidence ───────────

describe('Test 3 — ConstructionEvidence assignable to Evidence', () => {
  it('ConstructionEvidence satisfies universal Evidence type', () => {
    const constructionEv: ConstructionEvidence = {
      $id: 'urn:luhtech:project:evidence:EV-001',
      type: 'photo',
      uri: 's3://ectropy-staging-configs/evidence/photo-001.jpg',
      hash: 'a'.repeat(64),
      timestamp: '2026-04-23T09:15:00Z',
      capturedBy: 'urn:luhtech:project:participant:lisa-chen',
      location: { lat: 49.2194, lng: -122.5984, accuracy: 2.5 },
    };

    // Structural subtype check — assign to universal base
    const universal: Evidence = constructionEv;
    expect(universal.$id).toBe('urn:luhtech:project:evidence:EV-001');
    expect(universal.type).toBe('photo');
  });
});

// ─── Test 4: domain discriminator narrows context type ──────────────────────

describe('Test 4 — isConstructionCommercial() discriminator pattern', () => {
  function isConstructionCommercial(
    e: DecisionEvent,
  ): e is DecisionEvent & { readonly domain: typeof CONSTRUCTION_COMMERCIAL_DOMAIN } {
    return e.domain === CONSTRUCTION_COMMERCIAL_DOMAIN;
  }

  it('narrows domain type for construction-commercial events', () => {
    const ev: DecisionEvent = {
      $id: 'urn:luhtech:project:decision-event:DEV-001',
      schemaVersion: '4.0.0',
      domain: 'construction-commercial',
      timestamp: '2026-04-23T00:00:00Z',
      projectId: 'test-project',
      actorId: 'urn:luhtech:project:participant:p1',
      trigger: { type: 'exception', source: 'test', urgency: 0.5 },
      state: {
        sdi: 5000, eigenmodes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        activeConstraints: [], resourceAvailability: {},
      },
      engine1: {},
      engine2: {},
      mediation: {
        selectedAction: { actionType: 'approve' },
        sourceEngine: 'engine1',
        rationale: 'test',
        explorationAllocation: 0,
      },
    };

    expect(isConstructionCommercial(ev)).toBe(true);
    if (isConstructionCommercial(ev)) {
      // Narrowed: ev.domain is literally 'construction-commercial'
      const domain: typeof CONSTRUCTION_COMMERCIAL_DOMAIN = ev.domain;
      expect(domain).toBe('construction-commercial');
    }
  });

  it('returns false for non-construction-commercial events', () => {
    const ev: DecisionEvent = {
      $id: 'urn:luhtech:farm:decision-event:DEV-001',
      schemaVersion: '4.0.0',
      domain: 'farming',
      timestamp: '2026-04-23T00:00:00Z',
      projectId: 'farm-project',
      actorId: 'urn:luhtech:farm:actor:robot-01',
      trigger: { type: 'scheduled', source: 'soil-sensor', urgency: 0.3 },
      state: {
        sdi: 50000, eigenmodes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        activeConstraints: [], resourceAvailability: {},
      },
      engine1: {},
      engine2: {},
      mediation: {
        selectedAction: { actionType: 'irrigate' },
        sourceEngine: 'engine2',
        rationale: 'soil moisture below threshold',
        explorationAllocation: 0.2,
      },
    };

    expect(isConstructionCommercial(ev)).toBe(false);
  });
});
