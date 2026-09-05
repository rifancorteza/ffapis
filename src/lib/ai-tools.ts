export interface AIToolParameterProperty {
  type: string;
  description: string;
  enum?: string[];
  minimum?: number;
  maximum?: number;
  minLength?: number;
}

export interface AIToolParameters {
  type: 'object';
  properties: Record<string, AIToolParameterProperty>;
  required: string[];
}

export interface AITool {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: AIToolParameters;
  };
}

export const freefireTools: AITool[] = [
  {
    type: 'function',
    function: {
      name: 'search_player',
      description: 'Search Free Fire players by nickname. Returns matching players with their account ID, nickname, and level. Optional obVersion (e.g. OB55) overrides the bundled OB for this call.',
      parameters: {
        type: 'object',
        properties: {
          keyword: {
            type: 'string',
            description: 'Player nickname to search. Minimum 3 characters.',
            minLength: 3
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55". Use when library default is outdated. Accepts "55" or "OB55".'
          }
        },
        required: ['keyword']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_player_profile',
      description: 'Get detailed profile information for a Free Fire player including basic info, clan, pet, and equipment.',
      parameters: {
        type: 'object',
        properties: {
          uid: {
            type: 'string',
            description: 'Target player UID (account ID).'
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55".'
          }
        },
        required: ['uid']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_player_items',
      description: 'Get a player\'s equipped items including outfit, weapons skins, skills, and pet details with metadata from the items database.',
      parameters: {
        type: 'object',
        properties: {
          uid: {
            type: 'string',
            description: 'Target player UID (account ID).'
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55".'
          }
        },
        required: ['uid']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'get_player_stats',
      description: 'Retrieve match statistics for a player. Supports Battle Royale (BR) and Clash Squad (CS) modes.',
      parameters: {
        type: 'object',
        properties: {
          uid: {
            type: 'string',
            description: 'Target player UID (account ID).'
          },
          mode: {
            type: 'string',
            description: 'Game mode: br (Battle Royale) or cs (Clash Squad). Defaults to br.',
            enum: ['br', 'cs']
          },
          matchType: {
            type: 'string',
            description: 'Match type: career, ranked, or normal. Defaults to career.',
            enum: ['career', 'ranked', 'normal']
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55".'
          }
        },
        required: ['uid']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'send_likes',
      description: 'Send profile likes to a target player using available guest accounts. Maximum 100 likes per day per target.',
      parameters: {
        type: 'object',
        properties: {
          targetUid: {
            type: 'string',
            description: 'UID of the player to receive likes.'
          },
          region: {
            type: 'string',
            description: 'Region code (e.g., IND, BR, US).'
          },
          likeCount: {
            type: 'number',
            description: 'Number of likes to send. Defaults to 100, max 100.',
            minimum: 1,
            maximum: 100
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55".'
          }
        },
        required: ['targetUid', 'region']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'register_account',
      description: 'Register a new guest Free Fire account in the specified region.',
      parameters: {
        type: 'object',
        properties: {
          region: {
            type: 'string',
            description: 'Target region code (e.g., IND, BR).'
          },
          nickname: {
            type: 'string',
            description: 'Optional nickname. A random one is generated if omitted.'
          },
          obVersion: {
            type: 'string',
            description: 'Optional OB override, e.g. "OB55".'
          }
        },
        required: ['region']
      }
    }
  }
];

export function getToolByName(name: string): AITool | undefined {
  return freefireTools.find(t => t.function.name === name);
}

export function getToolNames(): string[] {
  return freefireTools.map(t => t.function.name);
}
