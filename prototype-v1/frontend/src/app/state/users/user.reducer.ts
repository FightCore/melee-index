import { createFeature, createReducer, on } from '@ngrx/store';
import { clearUser, setUser } from './user.actions';
import { TokenUser } from '@/models/auth/token-user';

export interface UserState {
  user: TokenUser | null;
}

export const initialState: UserState = { user: null };

export const userFeature = createFeature({
  name: 'user',
  reducer: createReducer(
    initialState,
    on(setUser, (state, { user }) => ({ ...state, user })),
    on(clearUser, state => ({ ...state, user: null }))
  )
});

export const {
  name,
  reducer,
  selectUserState,
  selectUser
} = userFeature;
