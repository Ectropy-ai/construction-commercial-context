import { describe, it, expect } from 'vitest';
import type {
  VoxelAttachment,
  VoxelContext,
  VoxelCoordinates,
} from '../types/voxel-attachment.types';

describe('VoxelCoordinates', () => {
  it('constructs minimal valid object', () => {
    const c: VoxelCoordinates = { x: 36, y: 30, z: 12 };
    expect(c.x).toBe(36);
  });

  it('readonly enforcement — @ts-expect-error on mutation', () => {
    const c: VoxelCoordinates = { x: 1, y: 2, z: 3 };
    // @ts-expect-error — x is readonly
    c.x = 99;
  });
});

describe('VoxelContext', () => {
  it('constructs minimal valid object', () => {
    const ctx: VoxelContext = {
      voxelId: 'VOX-ZONE-D-36-30-12',
      coordinates: { x: 36, y: 30, z: 12 },
    };
    expect(ctx.voxelId).toBe('VOX-ZONE-D-36-30-12');
  });

  it('constructs maximal valid object with every optional field', () => {
    const ctx: VoxelContext = {
      voxelId: 'VOX-ZONE-D-36-30-12',
      coordinates: { x: 36, y: 30, z: 12 },
      building: 'Building A',
      level: 'Level 1',
      zone: 'ZONE-D',
      system: 'MEP',
      gridReference: 'B3',
    };
    expect(ctx.zone).toBe('ZONE-D');
    expect(ctx.gridReference).toBe('B3');
  });
});

describe('VoxelAttachment', () => {
  it('constructs minimal valid object', () => {
    const att: VoxelAttachment = {
      voxelRef: 'urn:luhtech:project:voxel:VOX-001',
      attachmentType: 'PRIMARY',
    };
    expect(att.attachmentType).toBe('PRIMARY');
  });

  it('constructs maximal valid object with every optional field', () => {
    const att: VoxelAttachment = {
      voxelRef: 'urn:luhtech:project:voxel:VOX-001',
      attachmentType: 'AFFECTED',
      label: 'HVAC adjacent voxel',
      attachedAt: '2026-04-23T10:00:00Z',
      attachedBy: 'AI',
    };
    expect(att.label).toBe('HVAC adjacent voxel');
    expect(att.attachedBy).toBe('AI');
  });
});
