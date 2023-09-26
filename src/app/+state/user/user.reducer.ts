import { isDevMode } from '@angular/core';

import { createFeature, createReducer, MetaReducer, on } from '@ngrx/store';

import { User } from './user.interface';
import { userActions } from './user.actions';

interface State {
	user: User | null;
}

const initialState: State = {
	user: null,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const userFeature = createFeature({
	name: 'user',
	reducer: createReducer(
		initialState,
		on(userActions.login, (state, user): State => ({ ...state, user })),
	),
});

export const {
	name: userFeatureName,
	reducer: userReducer,
	selectUserState,
	selectUser,
} = userFeature;
