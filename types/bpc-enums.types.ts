/**
 * Enum types mirroring PostgreSQL enum types defined in the bpc schema
 * of cis_intelligence. Values match DB enum labels exactly.
 * Source of truth: cis-services-1, migration 001–201.
 */

/** bpc.qty_unit — bill-of-materials quantity units */
export type QtyUnit =
  | 'SF'
  | 'LF'
  | 'EA'
  | 'CY'
  | 'TON'
  | 'GAL'
  | 'BAG'
  | 'ROLL'
  | 'SHEET'
  | 'STICK';

/** bpc.assembly_category — structural role of the assembly */
export type AssemblyCategory =
  | 'wall_partition'
  | 'wall_loadbearing'
  | 'wall_exterior'
  | 'wall_shaft'
  | 'wall_fire_barrier'
  | 'wall_demising'
  | 'wall_curtain'
  | 'wall_furring'
  | 'floor_on_grade'
  | 'floor_elevated'
  | 'floor_raised_access'
  | 'ceiling_suspended'
  | 'ceiling_direct'
  | 'ceiling_specialty'
  | 'roof_low_slope'
  | 'roof_steep_slope'
  | 'roof_green'
  | 'soffit'
  | 'column_wrap'
  | 'beam_wrap'
  | 'bulkhead'
  | 'canopy';

/** bpc.zone_type — layer zone role within an assembly cross-section */
export type ZoneType =
  | 'finish'
  | 'core'
  | 'substrate'
  | 'barrier'
  | 'sheathing'
  | 'insulation_continuous'
  | 'cladding'
  | 'membrane'
  | 'ballast';

/** bpc.face_designation — which face of an assembly a zone applies to */
export type FaceDesignation = 'face_a' | 'face_b' | 'internal';

/** bpc.labor_phase — construction sequence phase for a labor operation */
export type LaborPhase = 'rough' | 'insulate' | 'close' | 'finish' | 'final';
