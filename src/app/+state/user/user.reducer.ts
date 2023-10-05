import { isDevMode } from '@angular/core';

// import { User } from '@angular/fire/auth';

import { createFeature, createReducer, MetaReducer, on } from '@ngrx/store';

import { userActions } from './user.actions';
import { UserProfile } from './types/user-profile.interface';
import { User } from '@supabase/supabase-js';

export interface State {
	user: User | null;
	userProfile: UserProfile | null;
	isLoading: boolean;
}

const initialState: State = {
	user: null,
	userProfile: null,
	isLoading: false,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];

export const userFeature = createFeature({
	name: 'user',
	reducer: createReducer(
		initialState,
		on(
			userActions.signUp,
			userActions.signIn,
			userActions.signOut,
			userActions.getUser,
			userActions.getUserProfile,
			userActions.updateUserProfile,
			(state: State): State => ({ ...state, isLoading: true }),
		),
		on(
			userActions.getUserFailure,
			userActions.getUserProfileFailure,
			userActions.updateUserProfileFailure,
			(state: State): State => ({ ...state, isLoading: false }),
		),
		on(
			userActions.getUserSuccess,
			(state, { user }): State => ({ ...state, user, isLoading: false }),
		),
		on(
			userActions.getUserProfileSuccess,
			userActions.updateUserProfileSuccess,
			(state, { userProfile }): State => ({ ...state, userProfile }),
		),
	),
});

export const {
	name: userFeatureName,
	reducer: userReducer,
	selectUserState,
	selectUser,
	selectIsLoading,
	selectUserProfile,
} = userFeature;
