import type { AssemblyCategory, ZoneType, FaceDesignation, QtyUnit } from './bpc-enums.types';

/**
 * Row type for bpc.assembly_bom (view).
 * Flat bill-of-materials: one row per product layer within an assembly.
 * Source: cis_intelligence, migration 001. All fields nullable (computed view).
 */
export interface BpcAssemblyBomRow {
  readonly assemblyId: string | null;
  readonly assemblyName: string | null;
  readonly assemblyCode: string | null;
  readonly category: AssemblyCategory | null;
  readonly zoneType: ZoneType | null;
  readonly face: FaceDesignation | null;
  readonly zoneOrder: number | null;
  readonly zoneDepthIn: number | null;
  readonly layerPosition: number | null;
  readonly productName: string | null;
  readonly manufacturerName: string | null;
  readonly qtyPerUnit: number | null;
  readonly qtyUnit: QtyUnit | null;
  readonly isStructural: boolean | null;
  readonly isCavityFill: boolean | null;
  readonly spacingIn: number | null;
  readonly substitutable: boolean | null;
  readonly substitutionClass: string | null;
}
