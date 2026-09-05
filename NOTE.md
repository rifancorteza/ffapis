# Maintenance Notes

## OB Version Update

When Free Fire updates to a new Operation Bundle (OB), update `HEADERS_COMMON_RELEASE_VERSION` in `config/settings.yaml`.

```yaml
# Before
HEADERS_COMMON_RELEASE_VERSION: "OB54"

# After OB update (example)
HEADERS_COMMON_RELEASE_VERSION: "OB55"
```

> **v1.6.0+:** pengguna tidak wajib menunggu update ini. Mereka bisa override per-request
> (`api.searchAccount('nick', 'OB55')`), per-instance (`new FreeFireAPI(null, { obVersion: 'OB55' })`),
> atau via env (`FF_OB_VERSION=OB55`). Lihat `docs/api-reference.md`.
> Update `settings.yaml` tetap disarankan agar default selalu baru.

No code changes needed unless Garena changes auth flow, protobuf schemas, or API endpoints.

## Pull Request Checklist

- [ ] Update `config/settings.yaml` `HEADERS_COMMON_RELEASE_VERSION` to latest OB
- [ ] Run `npm run test:all` — all 6 tests must pass
- [ ] Verify `config/credentials/` YAML files are valid and have accounts
- [ ] Check `data/items.json` is present (27989+ items expected)
- [ ] Ensure `proto/` directory contains all `.proto` files

## Common Failures After OB Update

| Symptom | Cause | Fix |
|---|---|---|
| `401 Unauthorized` | Session expired / OB mismatch | Update OB version, rebuild, retry |
| `400 Bad Request` | Protobuf schema changed | Update `.proto` files from game dump |
| `ECONNRESET` | Server rate limit / unstable | Retry after delay, use fresh credential |
| `No credentials available` | Missing credential YAML | Add guest accounts to `config/credentials/{region}.yaml` |
| `ENOENT: ...items.json` | Path resolution issue | Ensure `data/items.json` exists at project root |

## Quick Rebuild

```bash
npm run build
npm run test:all
```
