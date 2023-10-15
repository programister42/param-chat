import { isDevMode } from '@angular/core';

import { createFeature, createReducer, MetaReducer, on } from '@ngrx/store';
import { User } from '@supabase/supabase-js';

import { authActions } from './auth.actions';

export interface State {
	user: User | null;
	isLoading: boolean;
}

const initialState: State = {
	user: null,
	isLoading: false,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const authFeature = createFeature({
	name: 'Auth',
	reducer: createReducer(
		initialState,
		on(
			authActions.getUser,
			authActions.signUp,
			authActions.signIn,
			authActions.signOut,
			authActions.resetPassword,
			authActions.changePassword,
			(state: State): State => ({ ...state, isLoading: true }),
		),
		on(
			authActions.getUserFailure,
			authActions.signUpFailure,
			authActions.signInFailure,
			authActions.signOutFailure,
			authActions.resetPasswordSuccess,
			authActions.resetPasswordFailure,
			authActions.changePasswordFailure,
			(state: State): State => ({ ...state, isLoading: false }),
		),
		on(
			authActions.getUserSuccess,
			authActions.signUpSuccess,
			authActions.signInSuccess,
			authActions.changePasswordSuccess,
			(state, { user }): State => ({ ...state, user, isLoading: false }),
		),
		on(
			authActions.signOutSuccess,
			(state): State => ({ ...state, user: null, isLoading: false }),
		),
	),
});

export const {
	name: userFeatureName,
	reducer: userReducer,
	selectAuthState,
	selectUser,
	selectIsLoading,
} = authFeature;
