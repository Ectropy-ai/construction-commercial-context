import type { Urn } from '@ectropy/schemas';

export type VoxelAttachmentType = 'PRIMARY' | 'AFFECTED' | 'ADJACENT' | 'DOWNSTREAM';
export type VoxelAttachmentSource = 'SYSTEM' | 'USER' | 'AI';

export interface VoxelCoordinates {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface VoxelContext {
  readonly voxelId: string;      // VOX-...
  readonly coordinates: VoxelCoordinates;
  readonly building?: string;
  readonly level?: string;
  readonly zone?: string;
  readonly system?: string;
  readonly gridReference?: string;
}

export interface VoxelAttachment {
  readonly voxelRef: Urn;
  readonly attachmentType: VoxelAttachmentType;
  readonly label?: string;
  readonly attachedAt?: string;
  readonly attachedBy?: VoxelAttachmentSource;
}
