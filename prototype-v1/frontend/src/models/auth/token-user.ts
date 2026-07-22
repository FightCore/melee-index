export interface TokenUser {
  name: string;
  provider: TokenUserProvider
  provider_id: string;
  sub: string;
  admin: boolean;
}

export type TokenUserProvider = 'discord'
