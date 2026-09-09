<div align="center">
  <img src="https://res.cloudinary.com/b6ymaclw/image/upload/v1788971217/banner.png" width="100%" alt="ffapis" />
</div>

# FF Apis `v3.0.1`

Integrate Free Fire player data into your apps, bots, or AI agents. Search players, fetch profiles/stats/items, send likes, and register accounts — with auto-managed guest authentication and built-in AI tool calling for LLMs.

```bash
npm install ffapis
```

```ts
import { FreeFireAPI } from 'ffapis';
const api = new FreeFireAPI();
const players = await api.searchAccount('nickname');
```

## OB Version Override

If the game has moved to a newer OB than the library default, pass it directly — no library update needed:

```ts
await api.searchAccount('FannBot', 'OB55');

const api55 = new FreeFireAPI(null, { obVersion: 'OB55' });

// Without code changes:
 // FF_OB_VERSION=OB55 node app.js
```

Priority: **request > instance > env > `config/settings.yaml`**. Details: [`./docs/configuration.md`](./docs/configuration.md).

## Docs

| Doc | What |
|-----|------|
| [`./docs/quickstart.md`](./docs/quickstart.md) | Install, first API call, auth flow |
| [`./docs/api-reference.md`](./docs/api-reference.md) | All methods: search, profile, stats, items, register, like |
| [`./docs/ai-tool-calling.md`](./docs/ai-tool-calling.md) | LLM integration (Groq, OpenAI, Claude) |
| [`./docs/configuration.md`](./docs/configuration.md) | OB override, `settings.yaml`, credentials, regions |
| [`./docs/troubleshooting.md`](./docs/troubleshooting.md) | Common errors, OB updates, debug tips |
| [`./docs/full_testing.md`](./docs/full_testing.md) | Full test logs with raw output |
| [`./llms.txt`](./llms.txt) | Full context dump for LLM vibecoding |

Test status: [`./docs/full_testing.md`](./docs/full_testing.md) (last verified 5 September 2026).

## License

GPL-3.0
