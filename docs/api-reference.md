# API Reference — `v1.6.0`

> **OB override (baru):** semua method di bawah menerima `obVersion` opsional (`'OB55'` / `'55'` / `{ obVersion: 'OB55' }`).
> Prioritas: request > instance (`new FreeFireAPI(region, { obVersion })` / `setObVersion`) > env (`FF_OB_VERSION`) > `config/settings.yaml`.

## FreeFireAPI

### `new FreeFireAPI(region?, options?)`

```ts
const api = new FreeFireAPI(); // default OB dari settings.yaml
const api55 = new FreeFireAPI(null, { obVersion: 'OB55' });
const api55b = new FreeFireAPI('IND', 'OB55');
api55.setObVersion('OB55');
api55.getObVersion(); // "OB55"
```

### `searchAccount(keyword: string, obVersion?): Promise<SearchResult[]>`
Search players by nickname.

```ts
const results = await api.searchAccount('FannBot');
// [{ accountid, nickname, level }, ...]

// Library masih OB54 tapi game sudah OB55:
const results55 = await api.searchAccount('FannBot', 'OB55');
```

### `getPlayerProfile(uid: string | number, obVersion?): Promise<PlayerProfile>`
Get player details: basic info, clan, pet, equipped skills.

```ts
const profile = await api.getPlayerProfile('7512027025');
// { basicinfo, claninfo, petinfo, profileinfo }

const profile55 = await api.getPlayerProfile('7512027025', 'OB55');
```

### `getPlayerItems(uid: string | number, obVersion?): Promise<ProcessedPlayerItems | null>`
Get equipped items with metadata from `data/items.json`.

```ts
const items = await api.getPlayerItems('7512027025');
// { outfit, weapons, skills, pet, basic_info }

const items55 = await api.getPlayerItems('7512027025', 'OB55');
```

### `getPlayerStats(uid, mode, matchType, obVersion?): Promise<PlayerStats>`

| Param | Type | Description |
|-------|------|-------------|
| `mode` | `'br' \| 'cs'` | Battle Royale or Clash Squad |
| `matchType` | `'career' \| 'ranked' \| 'normal'` | Match type |
| `obVersion` | `string` (opsional) | e.g. `'OB55'` |

```ts
const br = await api.getPlayerStats('uid', 'br', 'career');
const cs = await api.getPlayerStats('uid', 'cs', 'ranked');
const br55 = await api.getPlayerStats('uid', 'br', 'career', 'OB55');
```

### `register(region: string, nickname?: string | null, obVersion?): Promise<RegisterResult>`
Create guest account.

```ts
const acc = await api.register('IND');
// { uid, password, passwordHash, region, nickname }

const acc55 = await api.register('IND', null, 'OB55');
```

### `login(uid, password, obVersion?): Promise<Session>`

```ts
await api.login('uid', 'password', 'OB55');
```

## LikeAPI

### `new LikeAPI(options?)`

```ts
import { LikeAPI } from 'ffapis';
const like = new LikeAPI();
const like55 = new LikeAPI({ obVersion: 'OB55' });
like55.setObVersion('OB55');
```

### `sendLikes(targetUid, region, likeCount?, obVersion?): Promise<LikeResult>`
Send profile likes using guest accounts. Max 100/day per target.

```ts
import { LikeAPI } from 'ffapis';
const like = new LikeAPI();
await like.sendLikes('target_uid', 'IND', 100);
await like.sendLikes('target_uid', 'IND', 100, 'OB55');
await like.sendLikes('target_uid', 'IND', { likeCount: 10, obVersion: 'OB55' });
```
