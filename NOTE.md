# Maintenance Notes

## OB Version Update

When Free Fire updates to a new Operation Bundle (OB), update `HEADERS_COMMON_RELEASE_VERSION` in `config/settings.yaml`.

```yaml
# Before
HEADERS_COMMON_RELEASE_VERSION: "OB54"

# After OB update (example)
HEADERS_COMMON_RELEASE_VERSION: "OB55"
```

> Users don't have to wait for this update. They can override per request
> (`api.searchAccount('nick', 'OB55')`), per instance (`new FreeFireAPI(null, { obVersion: 'OB55' })`),
> or via env (`FF_OB_VERSION=OB55`). See `docs/configuration.md`.
> Updating `settings.yaml` is still recommended so the default stays current.

No code changes needed unless Garena changes the auth flow, protobuf schemas, or API endpoints.

## Pull Request Checklist

- [ ] Update `config/settings.yaml` `HEADERS_COMMON_RELEASE_VERSION` to latest OB
- [ ] Run `npm test` — all 6 tests must pass
- [ ] Verify `config/credentials/` YAML files are valid and have accounts
- [ ] Check `data/items.json` is present (27989+ items expected)
- [ ] Ensure `proto/` directory contains all `.proto` files

## Common Failures After OB Update

See [`docs/troubleshooting.md`](./docs/troubleshooting.md) (single source of truth for the error table).

## Quick Rebuild

```bash
npm run build
npm test
```
