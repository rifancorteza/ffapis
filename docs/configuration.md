# Configuration

## `config/settings.yaml`

Core constants. **Update the OB version when Free Fire updates.**

```yaml
AE_MAIN_KEY: "Yg&tc%DEuh6%Zc^8"
AE_MAIN_IV: "6oyZDr22E3ychjM%"

HEADERS_COMMON_RELEASE_VERSION: "OB54"  # <-- UPDATE THIS ON OB CHANGE

URL_GARENA_TOKEN: "https://ffmconnect.live.gop.garenanow.com/oauth/guest/token/grant"
URL_GUEST_REGISTER: "https://ffmconnect.live.gop.garenanow.com/oauth/guest/register"
URL_MAJOR_LOGIN: "https://loginbp.ggblueshark.com/MajorLogin"
URL_MAJOR_REGISTER: "https://loginbp.ggblueshark.com/MajorRegister"

GARENA_CLIENT_ID: "100067"
GARENA_CLIENT_SECRET: "..."
```

## OB Override (No Library Update Needed)

If the game moved to a new OB but `settings.yaml` still has the old one, override it directly:

```ts
// Per request (highest priority)
await api.searchAccount('nick', 'OB55');

// Per instance (applies to all requests from it)
const api = new FreeFireAPI(null, { obVersion: 'OB55' });

// Via env (no code changes)
 // FF_OB_VERSION=OB55 npm test
 // FFAPIS_OB_VERSION / FFAPIS_OB also supported
```

Auto-normalized: `"55"` → `"OB55"`, `"ob55"` → `"OB55"`.
Priority: request > instance > env > `settings.yaml`.

Exported helpers:

```ts
import { DEFAULT_OB_VERSION, normalizeObVersion, resolveObVersion, getCommonHeaders } from 'ffapis';
```

## Credentials

File: `config/credentials/{region}.yaml`

```yaml
- UID: "123456789"
  PASSWORD: "abc123"
- UID: "987654321"
  PASSWORD: "xyz789"
```

A random credential is picked per API call. Used credentials are tracked per target to prevent reuse.

## Regions

Supported: `IND`, `SG`, `BR`, `US`, `RU`, `TH`, `VN`, `TW`, `ME`, `CIS`, `BD`

**Note:** ID and PK do NOT support guest registration.

## Custom Credentials (Optional)

```ts
await api.login('uid', 'password');
```
