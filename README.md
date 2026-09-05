<div align="center">
  <img src="https://z1.storage.malvo.app/bucket/repo/ffapis.png" width="100%" alt="ffapis" />
</div>

# FF Apis `v1.6.0`

Integrate Free Fire player data into your apps, bots, or AI agents. Search players, fetch profiles/stats/items, send likes, and register accounts — with auto-managed guest authentication and built-in AI tool calling for LLMs.

```bash
npm install ffapis
```

```ts
import { FreeFireAPI } from 'ffapis';
const api = new FreeFireAPI();
const players = await api.searchAccount('nickname');
```

## OB Spesifik Per-Request (Baru di v1.6.0)

Kalau library usang (misal default masih `OB54` tapi game sudah `OB55`), Anda **tidak perlu tunggu update library** — override OB langsung per-request, per-instance, atau via env:

```ts
import { FreeFireAPI, LikeAPI } from 'ffapis';

// 1. Per-request (prioritas tertinggi)
await api.searchAccount('FannBot', 'OB55');
await api.getPlayerProfile('7512027025', 'OB55');
await api.getPlayerStats('uid', 'br', 'career', 'OB55');
await api.getPlayerItems('uid', 'OB55');
await api.register('IND', null, 'OB55');
await like.sendLikes('uid', 'IND', 100, 'OB55');

// Bentuk "55" / "ob55" otomatis dinormalisasi jadi "OB55"
await api.searchAccount('FannBot', '55');

// 2. Per-instance (berlaku untuk semua request dari instance itu)
const api55 = new FreeFireAPI(null, { obVersion: 'OB55' });
api55.setObVersion('OB55'); // ganti kapan saja
console.log(api55.getObVersion()); // "OB55"

// 3. Via environment (tanpa ubah kode)
 // FF_OB_VERSION=OB55 node app.js
 // didukung juga: FFAPIS_OB_VERSION, FFAPIS_OB
```

Prioritas: **request > instance > env > `config/settings.yaml`**.

AI tools (`search_player`, `get_player_profile`, `get_player_items`, `get_player_stats`, `send_likes`, `register_account`) juga menerima `obVersion` opsional.

## Docs

| Doc | What |
|-----|------|
| [`./docs/quickstart.md`](./docs/quickstart.md) | Install, first API call, auth flow |
| [`./docs/api-reference.md`](./docs/api-reference.md) | All methods: search, profile, stats, items, register, like |
| [`./docs/ai-tool-calling.md`](./docs/ai-tool-calling.md) | LLM integration (Groq, OpenAI, Claude) |
| [`./docs/configuration.md`](./docs/configuration.md) | `settings.yaml`, credentials, regions |
| [`./docs/troubleshooting.md`](./docs/troubleshooting.md) | Common errors, OB updates, debug tips |
| [`./docs/full_testing.md`](./docs/full_testing.md) | Full test logs with raw output |
| [`./llms.txt`](./llms.txt) | Full context dump for LLM vibecoding |
| [`./NOTE.md`](./NOTE.md) | OB update checklist & PR notes |

## Test Results

Last verified: **5 September 2026**

| Test | Status |
|------|--------|
| Non-AI API (Login/Search/Profile/Stats/Items/Like) | 6/6 pass |
| OB override unit test (`npm run test:ob`) | 32/32 pass |
| OB override live test (`npm run test:ob:live`, OB54) | pass, search `folaa` → 10 players |
| All AI Tools | 5/5 pass* |
| Groq AI Tool Calling | AI chained tools & responded in Indonesian |

`*` `get_player_profile` untuk UID `7512027025` kadang `400` transient (retry otomatis); `get_player_items` untuk UID yang sama pass pada verifikasi 5 Sep 2026.

Full report: [`./docs/full_testing.md`](./docs/full_testing.md)

## License

GPL-3.0
