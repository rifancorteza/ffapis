# AI Tool Calling

Built-in JSON Schema tools + handler for LLM integration. All tools accept an optional `obVersion`.

## Tool Schemas

```ts
import { freefireTools } from 'ffapis';

// freefireTools = OpenAI-compatible function schemas (6 tools)
```

| Tool | Params |
|------|--------|
| `search_player` | `{ keyword: string }` |
| `get_player_profile` | `{ uid: string }` |
| `get_player_items` | `{ uid: string }` |
| `get_player_stats` | `{ uid: string, mode?: 'br'\|'cs', matchType?: 'career'\|'ranked'\|'normal' }` |
| `send_likes` | `{ targetUid: string, region: string, likeCount?: number }` |
| `register_account` | `{ region: string, nickname?: string }` |

## Execute Tool Calls

```ts
import { FreeFireAIToolHandler } from 'ffapis';

const handler = new FreeFireAIToolHandler();

const result = await handler.execute({
  id: 'call_1',
  type: 'function',
  function: { name: 'search_player', arguments: '{"keyword":"FannBot"}' }
});

// Batch
const results = await handler.executeMany([toolCall1, toolCall2]);
```

## Groq Example

```bash
npm run test:groq-ai
```

See `src/test/groq-ai-tool-calling.ts` for the full streaming implementation. Set your Groq API key in ENV first (get one at https://console.groq.com/playground?model=openai/gpt-oss-120b).
