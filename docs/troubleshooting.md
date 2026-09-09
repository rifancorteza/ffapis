# Troubleshooting

## Common Errors

| Error | Cause | Fix |
|-------|-------|-----|
| `401 Unauthorized` | Session expired / OB version mismatch | Update `HEADERS_COMMON_RELEASE_VERSION` in `config/settings.yaml` (see [`configuration.md`](./configuration.md)) |
| `400 Bad Request` | Protobuf schema changed | Update `.proto` files from game dump |
| `ECONNRESET` | Server rate limit / unstable | Retry after delay, use fresh credential |
| `No credentials available` | Missing credential YAML | Add accounts to `config/credentials/{region}.yaml` |
| `ENOENT: ...items.json` | Missing data file | Ensure `data/items.json` exists |
| `ENOENT: ...proto` | Missing proto files | Ensure `proto/` dir exists with all `.proto` files |

## OB Version Update

When Free Fire updates to a new OB, set `HEADERS_COMMON_RELEASE_VERSION` in `config/settings.yaml` (or pass `obVersion` per request — see [`configuration.md`](./configuration.md)), then:

```bash
npm run build
npm test
```

## Debug

Each script in `src/test/` shows the full API flow.

```bash
npm test                # All tests
npm run test:search     # Search only
npm run test:profile    # Profile only
npm run test:stats      # Stats only
npm run test:items      # Items only
npm run test:register   # Register test
npm run test:like       # Send likes (pass args: uid region count)
npm run test:groq-ai    # AI tool calling test
```
