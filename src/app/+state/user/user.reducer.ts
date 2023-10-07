import { isDevMode } from '@angular/core';

import { createFeature, createReducer, MetaReducer, on } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

import { userActions } from './user.actions';

export interface State {
	user: User | null;
	isLoading: boolean;
}

const initialState: State = {
	user: null,
	isLoading: false,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const userFeature = createFeature({
	name: 'user',
	reducer: createReducer(
		initialState,
		on(
			userActions.getUser,
			userActions.signUp,
			userActions.signIn,
			userActions.signOut,
			userActions.resetPassword,
			userActions.changePassword,
			(state: State): State => ({ ...state, isLoading: true }),
		),
		on(
			userActions.getUserFailure,
			userActions.signUpFailure,
			userActions.signInFailure,
			userActions.signOutFailure,
			userActions.resetPasswordSuccess,
			userActions.resetPasswordFailure,
			userActions.changePasswordFailure,
			(state: State): State => ({ ...state, isLoading: false }),
		),
		on(
			userActions.getUserSuccess,
			userActions.signUpSuccess,
			userActions.signInSuccess,
			userActions.changePasswordSuccess,
			(state, { user }): State => ({ ...state, user, isLoading: false }),
		),
		on(
			userActions.signOutSuccess,
			(state): State => ({ ...state, user: null, isLoading: false }),
		),
	),
});

export const {
	name: userFeatureName,
	reducer: userReducer,
	selectUserState,
	selectUser,
	selectIsLoading,
} = userFeature;
