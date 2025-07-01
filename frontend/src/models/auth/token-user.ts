export interface TokenUser {
  name: string;
  provider: TokenUserProvider
  provider_id: string;
  sub: string;
}

export type TokenUserProvider = 'discord'
