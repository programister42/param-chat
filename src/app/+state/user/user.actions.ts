import { createActionGroup, emptyProps, props } from '@ngrx/store';

import {
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
	User,
} from '@supabase/supabase-js';
import { UserProfile } from './types/user-profile.interface';

export const userActions = createActionGroup({
	source: 'User',
	events: {
		getUser: emptyProps(),
		getUserSuccess: props<{ user: User | null }>(),
		getUserFailure: props<{ error: unknown }>(),

		signUp: props<SignUpWithPasswordCredentials>(),
		signIn: props<SignInWithPasswordCredentials>(),
		signOut: emptyProps(),

		getUserProfile: props<{ user: User }>(),
		getUserProfileSuccess: props<{ userProfile: UserProfile }>(),
		getUserProfileFailure: props<{ error: unknown }>(),

		updateUserProfile: props<{ userProfile: Partial<UserProfile> }>(),
		updateUserProfileSuccess: props<{ userProfile: UserProfile }>(),
		updateUserProfileFailure: props<{ error: unknown }>(),
	},
});
