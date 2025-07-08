import { createAction } from '@ngrx/store';
import { TokenUser } from '@/models/auth/token-user';

export const setUser = createAction('[User] Set User', (user: TokenUser) => ({ user }));

export const clearUser = createAction('[User] Clear User');
