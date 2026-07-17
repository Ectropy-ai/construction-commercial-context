# @ectropy/construction-commercial-context

[![License: Apache-2.0](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)

Public TypeScript type contracts for the **construction-commercial** domain, published for use with `@ectropy/schemas`' universal decision log. This package ships types only — no runtime code, no JSON Schema files — as `.ts` source consumed directly by peers of `@ectropy/schemas`.

## What's here

All types are exported from a single entrypoint, `types/index.ts`, grouped below by what they model:

**Decision domain & authority**
- `construction-commercial-domain.types.ts` — the `construction-commercial` domain identifier
- `construction-commercial-authority.types.ts` — 7-tier authority cascade (FIELD → REGULATORY) per AIA / IPD / GMP / Design-Build conventions
- `construction-decision-type.types.ts` — semantic decision classification (APPROVAL, REJECTION, DEFERRAL, ESCALATION, PROPOSAL, CONSEQUENCE)

**Decision event context**
- `voxel-attachment.types.ts` — spatial/BIM voxel references attachable to a decision event
- `construction-trigger-context.types.ts`, `construction-action.types.ts`, `construction-evidence.types.ts`, `construction-participants.types.ts`, `construction-outcome-context.types.ts` — the trigger/action/evidence/participants/outcome shapes that compose a construction-commercial decision event

**BPC (Building Product Catalog) intelligence**
- `bpc-enums.types.ts` — enums mirrored from the `bpc` Postgres schema in `cis_intelligence` (quantity units, assembly categories, etc.)
- `bpc-assembly-bom.types.ts`, `bpc-labor-schedule.types.ts`, `bpc-product-price.types.ts` — bill-of-materials, labor, and pricing shapes
- `bpc-cost-composite.types.ts`, `bpc-cost-grounded.types.ts` — dual-channel assembly cost types (PPI-composite vs. product-grounded)

**Cost Intelligence Service** (mirrors the service on port 5009)
- `cost-response.types.ts` — consumer-facing response shapes for the cost routes, including the combined `DualChannelPricingResponse`
- `cost-ppi.types.ts`, `cost-regional.types.ts`, `cost-material-signal.types.ts`, `cost-data-provenance.types.ts` — PPI, regional-factor, material-signal, and provenance shapes feeding those responses

**Carbon Intelligence Service** (mirrors `cis-carbon`)
- `carbon-response.types.ts`, `carbon-epd.types.ts` — Environmental Product Declaration (EPD) response shapes, e.g. `ProductEpdResponse`

## Install

```sh
pnpm add @ectropy/construction-commercial-context
```

Requires `@ectropy/schemas` as a peer dependency (`^0.4.0`) — several types (e.g. `AuthorityLabelMap`, `Urn`) are imported from it.

## Development

```sh
pnpm install
pnpm typecheck   # tsc --noEmit
pnpm test        # vitest run, against __tests__/
```

There is no build step: the package is consumed as TypeScript source (`main`/`types` both point at `types/index.ts`).

## Versioning

Current version: `0.3.0`. See `git log` for the type-contract history (cost types landed in v0.2.0, carbon types in v0.3.0).

## License

Apache-2.0 — see [LICENSE](./LICENSE).
