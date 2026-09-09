# Quick Start

## Install

```bash
npm install ffapis
```

Requires Node.js >= 18.

## First API Call

```ts
import { FreeFireAPI } from 'ffapis';

const api = new FreeFireAPI();

// Search players
const players = await api.searchAccount('FannBot');
console.log(players);

// Get profile
const profile = await api.getPlayerProfile('7512027025');
console.log(profile.basicinfo.nickname, profile.basicinfo.level);

// Get stats
const br = await api.getPlayerStats('7512027025', 'br', 'career');
const cs = await api.getPlayerStats('7512027025', 'cs', 'career');
```

## Auth Flow

Automatic. The first API call:

1. Loads a random credential from `config/credentials/{region}.yaml`
2. Requests a Garena guest token
3. Encodes MajorLogin via Protobuf → POST → decode
4. Caches the session for subsequent calls

To use your own credential:

```ts
await api.login('uid', 'password');
```
