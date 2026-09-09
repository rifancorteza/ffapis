# API Reference — `v3.0.1`

> Every method below accepts an optional `obVersion` (`'OB55'`, `'55'`, or `{ obVersion: 'OB55' }`).
> Priority: request > instance > env (`FF_OB_VERSION`) > `config/settings.yaml`.
> See [`configuration.md`](./configuration.md) for details.

## FreeFireAPI

### `new FreeFireAPI(region?, options?)`

```ts
const api = new FreeFireAPI(); // default OB from settings.yaml
const api55 = new FreeFireAPI(null, { obVersion: 'OB55' });
api55.setObVersion('OB55');
api55.getObVersion(); // "OB55"
```

### `searchAccount(keyword: string, obVersion?): Promise<SearchResult[]>`

Search players by nickname.

```ts
const results = await api.searchAccount('FannBot');
// [{ accountid, nickname, level }, ...]
```

### `getPlayerProfile(uid: string | number, obVersion?): Promise<PlayerProfile>`

Player details: basic info, clan, pet, equipped skills.

```ts
const profile = await api.getPlayerProfile('7512027025');
// { basicinfo, claninfo, petinfo, profileinfo }
```

### `getPlayerItems(uid: string | number, obVersion?): Promise<ProcessedPlayerItems | null>`

Equipped items with metadata from `data/items.json`.

```ts
const items = await api.getPlayerItems('7512027025');
// { outfit, weapons, skills, pet, basic_info }
```

### `getPlayerStats(uid, mode, matchType, obVersion?): Promise<PlayerStats>`

| Param | Type | Description |
|-------|------|-------------|
| `mode` | `'br' \| 'cs'` | Battle Royale or Clash Squad |
| `matchType` | `'career' \| 'ranked' \| 'normal'` | Match type |

```ts
const br = await api.getPlayerStats('uid', 'br', 'career');
const cs = await api.getPlayerStats('uid', 'cs', 'ranked');
```

### `register(region: string, nickname?: string | null, obVersion?): Promise<RegisterResult>`

Create a guest account.

```ts
const acc = await api.register('IND');
// { uid, password, passwordHash, region, nickname }
```

### `login(uid, password, obVersion?): Promise<Session>`

```ts
await api.login('uid', 'password');
```

## LikeAPI

### `new LikeAPI(options?)`

```ts
import { LikeAPI } from 'ffapis';
const like = new LikeAPI();
const like55 = new LikeAPI({ obVersion: 'OB55' });
```

### `sendLikes(targetUid, region, likeCount?, obVersion?): Promise<LikeResult>`

Send profile likes using guest accounts. Max 100/day per target.

```ts
import { LikeAPI } from 'ffapis';
const like = new LikeAPI();
await like.sendLikes('target_uid', 'IND', 100);
await like.sendLikes('target_uid', 'IND', { likeCount: 10, obVersion: 'OB55' });
```
