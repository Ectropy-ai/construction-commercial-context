/**
 * Site jurisdiction resolution from cis-jurisdiction (port 5011).
 * Mirrors services/jurisdiction/src/routes/resolve.py:JurisdictionResolutionResponse.
 *
 * Wire shape returned by GET /api/v1/jurisdiction/resolve?lat={lat}&lon={lon}.
 * cis-jurisdiction uses alias_generator=to_camel so fields are camelCase on the wire.
 *
 * Field names match the jurisdiction block of the canonical project-site
 * record (schemas.luh.tech/ectropy/site/project-site.schema.json v1.2.0), so a
 * consumer copies non-null fields across without renaming.
 */

/**
 * Data quality signal accompanying every resolution.
 *
 * - "live"     — a country resolver matched and every boundary layer it
 *                queries answered. Time zone is always resolved (offline).
 * - "partial"  — a country resolver matched but one or more of its layers
 *                failed (named in missingLayers). Returned fields are real;
 *                absent ones are unknown, not empty.
 * - "no_data"  — no area covers the point (open water). Only timeZone is set.
 */
export type JurisdictionDataStatus = 'live' | 'partial' | 'no_data';

/**
 * Which resolver answered: 'overture' is the global baseline (any country);
 * the others are national resolvers selected by the baseline's country.
 */
export type JurisdictionResolverId = 'overture' | 'us-census' | 'ca-statcan';

/** Which Census layer a CBSA came from. */
export type CbsaType = 'metropolitan' | 'micropolitan';

/** StatCan CMATYPE as published: B is a census metropolitan area; D and K are census agglomeration types. */
export type CensusMetropolitanAreaType = 'B' | 'D' | 'K';

/** One external dataset behind the resolution, and which fields it supplied. */
export interface JurisdictionSource {
  /** e.g. "US Census Bureau Geocoder", "Statistics Canada", "timezone-boundary-builder". */
  readonly provider: string;
  /** Benchmark/vintage or release, e.g. "Public_AR_Current/Current_Current", "2021 cartographic boundary files", "2026d". */
  readonly dataset: string;
  readonly licence: string | null;
  /** Response field names this source supplied. */
  readonly fields: readonly string[];
}

/** Country-agnostic role of an area (a US state and a Canadian province are both 'subdivision'). */
export type JurisdictionAreaLevel =
  | 'country'
  | 'subdivision'
  | 'county'
  | 'locality'
  | 'sublocality'
  | 'statistical'
  | 'market'
  | 'labor-market'
  | 'time-zone';

/**
 * One jurisdiction.areas[] entry (project-site 1.3.0). scheme ids come from
 * schemas.luh.tech/ectropy/site/jurisdiction-schemes.json, e.g.
 * 'iso3166-2', 'us-census-county-fips', 'ca-statcan-er-2021',
 * 'overture-division-locality'.
 */
export interface JurisdictionArea {
  readonly scheme: string;
  readonly level: JurisdictionAreaLevel;
  readonly code: string;
  readonly name?: string | null;
  readonly parentCode?: string | null;
  readonly source: {
    readonly provider: string;
    readonly dataset: string;
    readonly method: 'point-in-polygon' | 'national-api' | 'geocoder' | 'authored';
    readonly boundaryVintage?: string | null;
    /** SPDX id where one exists; per boundary for sources whose licence varies. */
    readonly licence?: string | null;
    /** Attribution the licence requires, verbatim. */
    readonly attribution?: string | null;
  };
  readonly resolvedAt?: string | null;
}

export interface JurisdictionResolutionResponse {
  /** Input point, WGS84 decimal degrees. */
  readonly latitude: number;
  readonly longitude: number;
  /** Cache key: the point rounded to 5 decimals (~1 m), "lat,lon". */
  readonly cellKey: string;

  /** Resolver that matched, null when dataStatus is no_data. */
  readonly resolver: JurisdictionResolverId | null;

  /** ISO 3166-1 alpha-2. */
  readonly country: string | null;
  readonly stateOrProvince: string | null;
  /** ISO 3166-2 subdivision code without the country prefix ("MA", "BC"). */
  readonly stateOrProvinceCode: string | null;
  /** County (US) or census division (CA) name. */
  readonly county: string | null;
  /** US state+county FIPS (5 digits) — the labor service's wage-area key. */
  readonly countyFips: string | null;
  /** StatCan census division UID (4 digits). */
  readonly censusDivisionCode: string | null;
  /** Incorporated place (US) or census subdivision (CA) name; null outside any. */
  readonly municipality: string | null;
  /** US place GEOID or StatCan CSDUID (7 digits). */
  readonly municipalityCode: string | null;
  /** US CBSA code (5 digits); null outside any CBSA. */
  readonly cbsaCode: string | null;
  readonly cbsaName: string | null;
  readonly cbsaType: CbsaType | null;
  /** StatCan CMAUID (3 digits); null outside any CMA/CA. */
  readonly censusMetropolitanArea: string | null;
  readonly censusMetropolitanAreaName: string | null;
  readonly censusMetropolitanAreaType: CensusMetropolitanAreaType | null;
  /** StatCan economic region UID (4 digits) — Canadian wage-data key. */
  readonly economicRegion: string | null;
  readonly economicRegionName: string | null;
  /** IANA time zone. */
  readonly timeZone: string | null;

  readonly sources: readonly JurisdictionSource[];
  /** The canonical, global form: every area the point lies in, one per scheme. */
  readonly areas: readonly JurisdictionArea[];
  /** Layers of the matched resolver that failed; empty unless dataStatus is partial. */
  readonly missingLayers: readonly string[];
  readonly dataStatus: JurisdictionDataStatus;
  /** ISO 8601 timestamp of the upstream resolution (not of this response). */
  readonly resolvedAt: string;
  /** True when served from cis-jurisdiction's resolution store rather than resolved upstream on this call. */
  readonly cached: boolean;
}

/** How a postal address became a point (POST /api/v1/jurisdiction/resolve-address). */
export interface JurisdictionGeocode {
  /** e.g. "US Census Bureau Geocoder", "OpenStreetMap Nominatim". */
  readonly provider: string;
  readonly dataset: string;
  readonly licence: string | null;
  readonly attribution: string | null;
  readonly matchedAddress: string;
  readonly latitude: number;
  readonly longitude: number;
  /** ISO 3166-1 alpha-2. */
  readonly country: string | null;
}

/**
 * Wire shape of POST /api/v1/jurisdiction/resolve-address. geocode and
 * resolution are null when no geocoder matched; failedGeocoders names
 * geocoders that were unreachable (null with failures is unknown, not
 * "no such address").
 */
export interface AddressResolutionResponse {
  readonly address: string;
  readonly geocode: JurisdictionGeocode | null;
  readonly failedGeocoders: readonly string[];
  readonly resolution: JurisdictionResolutionResponse | null;
}
