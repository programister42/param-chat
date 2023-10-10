import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { User } from '@supabase/supabase-js';

export const userActions = createActionGroup({
	source: 'User',
	events: {
		getUser: emptyProps(),
		getUserSuccess: props<{ user: User | null }>(),
		getUserFailure: props<{ error: unknown }>(),

		signUp: props<{ email: string; password: string }>(),
		signUpSuccess: props<{ user: User | null }>(),
		signUpFailure: props<{ error: unknown }>(),

		signIn: props<{ email: string; password: string }>(),
		signInSuccess: props<{ user: User }>(),
		signInFailure: props<{ error: unknown }>(),

		signOut: emptyProps(),
		signOutSuccess: emptyProps(),
		signOutFailure: props<{ error: unknown }>(),

		resetPassword: props<{ email: string }>(),
		resetPasswordSuccess: emptyProps(),
		resetPasswordFailure: props<{ error: unknown }>(),

		changePassword: props<{ newPassword: string }>(),
		changePasswordSuccess: props<{ user: User | null }>(),
		changePasswordFailure: props<{ error: unknown }>(),
	},
});
