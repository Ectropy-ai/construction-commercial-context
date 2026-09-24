import { describe, it, expect } from 'vitest';
import type {
  AddressResolutionResponse,
  JurisdictionResolutionResponse,
  JurisdictionSource,
} from '../types/jurisdiction-response.types';

const tz: JurisdictionSource = {
  provider: 'timezone-boundary-builder',
  dataset: '2026d',
  licence: 'ODbL-1.0',
  fields: ['timeZone'],
};

describe('JurisdictionResolutionResponse', () => {
  it('constructs a live US resolution', () => {
    const resp: JurisdictionResolutionResponse = {
      latitude: 42.3601,
      longitude: -71.0589,
      cellKey: '42.36010,-71.05890',
      resolver: 'us-census',
      country: 'US',
      stateOrProvince: 'Massachusetts',
      stateOrProvinceCode: 'MA',
      county: 'Suffolk County',
      countyFips: '25025',
      censusDivisionCode: null,
      municipality: 'Boston city',
      municipalityCode: '2507000',
      cbsaCode: '14460',
      cbsaName: 'Boston-Cambridge-Newton, MA-NH Metro Area',
      cbsaType: 'metropolitan',
      censusMetropolitanArea: null,
      censusMetropolitanAreaName: null,
      censusMetropolitanAreaType: null,
      economicRegion: null,
      economicRegionName: null,
      timeZone: 'America/New_York',
      sources: [
        {
          provider: 'US Census Bureau Geocoder',
          dataset: 'Public_AR_Current/Current_Current',
          licence: null,
          fields: ['stateOrProvince', 'countyFips', 'cbsaCode'],
        },
        tz,
      ],
      areas: [
        {
          scheme: 'us-census-county-fips',
          level: 'county',
          code: '25025',
          name: 'Suffolk County',
          source: { provider: 'US Census Bureau Geocoder', dataset: 'Public_AR_Current/Current_Current', method: 'national-api' },
        },
      ],
      missingLayers: [],
      dataStatus: 'live',
      resolvedAt: '2026-09-24T12:00:00Z',
      cached: false,
    };
    expect(resp.countyFips).toBe('25025');
    expect(resp.censusDivisionCode).toBeNull();
    expect(resp.dataStatus).toBe('live');
  });

  it('constructs a partial Canadian resolution', () => {
    const resp: JurisdictionResolutionResponse = {
      latitude: 49.2338,
      longitude: -122.8621,
      cellKey: '49.23380,-122.86210',
      resolver: 'ca-statcan',
      country: 'CA',
      stateOrProvince: 'British Columbia',
      stateOrProvinceCode: 'BC',
      county: 'Greater Vancouver',
      countyFips: null,
      censusDivisionCode: '5915',
      municipality: 'Coquitlam',
      municipalityCode: '5915034',
      cbsaCode: null,
      cbsaName: null,
      cbsaType: null,
      censusMetropolitanArea: '933',
      censusMetropolitanAreaName: 'Vancouver',
      censusMetropolitanAreaType: 'B',
      economicRegion: null,
      economicRegionName: null,
      timeZone: 'America/Vancouver',
      sources: [tz],
      areas: [
        {
          scheme: 'ca-statcan-cma-2021',
          level: 'market',
          code: '933',
          name: 'Vancouver',
          source: { provider: 'Statistics Canada', dataset: '2021 cartographic boundary files', method: 'national-api', licence: 'OGL-Canada-2.0', boundaryVintage: '2021' },
        },
      ],
      missingLayers: ['economic_region'],
      dataStatus: 'partial',
      resolvedAt: '2026-09-24T12:00:00Z',
      cached: true,
    };
    expect(resp.missingLayers).toContain('economic_region');
    expect(resp.economicRegion).toBeNull();
  });

  it('constructs a no_data resolution with only a time zone', () => {
    const resp: JurisdictionResolutionResponse = {
      latitude: 51.5074,
      longitude: -0.1278,
      cellKey: '51.50740,-0.12780',
      resolver: null,
      country: null,
      stateOrProvince: null,
      stateOrProvinceCode: null,
      county: null,
      countyFips: null,
      censusDivisionCode: null,
      municipality: null,
      municipalityCode: null,
      cbsaCode: null,
      cbsaName: null,
      cbsaType: null,
      censusMetropolitanArea: null,
      censusMetropolitanAreaName: null,
      censusMetropolitanAreaType: null,
      economicRegion: null,
      economicRegionName: null,
      timeZone: 'Europe/London',
      sources: [tz],
      areas: [],
      missingLayers: [],
      dataStatus: 'no_data',
      resolvedAt: '2026-09-24T12:00:00Z',
      cached: false,
    };
    expect(resp.resolver).toBeNull();
    expect(resp.timeZone).toBe('Europe/London');
  });
});

describe('AddressResolutionResponse', () => {
  it('carries the geocode and the resolution, or nulls with failures', () => {
    const miss: AddressResolutionResponse = {
      address: 'nowhere',
      geocode: null,
      failedGeocoders: ['nominatim'],
      resolution: null,
    };
    expect(miss.failedGeocoders).toContain('nominatim');
    const hit: AddressResolutionResponse = {
      address: '10 Downing Street, London',
      geocode: {
        provider: 'OpenStreetMap Nominatim',
        dataset: 'Nominatim public API',
        licence: 'ODbL-1.0',
        attribution: 'Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright',
        matchedAddress: '10 Downing Street, Westminster, London, SW1A 2AA, United Kingdom',
        latitude: 51.5034878,
        longitude: -0.1276965,
        country: 'GB',
      },
      failedGeocoders: [],
      resolution: null,
    };
    expect(hit.geocode?.country).toBe('GB');
  });
});
