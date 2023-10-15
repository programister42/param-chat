import { inject } from '@angular/core';

import { catchError, defer, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { authActions } from './auth.actions';
import { AuthApiService } from './services/auth.api.service';

export const initAuthEffect = createEffect(
	() => {
		return defer(() => of(authActions.getUser()));
	},
	{ functional: true },
);

export const getUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.getUser),
			exhaustMap(() =>
				userApiService.session$.pipe(
					map(({ data, error }) =>
						error === null
							? authActions.getUserSuccess({ user: data.session?.user ?? null })
							: authActions.getUserFailure({ error }),
					),
					catchError((error: unknown) => of(authActions.getUserFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signUpEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.signUp),
			exhaustMap((credentials) =>
				userApiService.signUp(credentials).pipe(
					map(({ data, error }) =>
						error === null
							? authActions.signUpSuccess(data)
							: authActions.signUpFailure({ error }),
					),
					catchError((error: unknown) => of(authActions.signUpFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signInEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.signIn),
			exhaustMap((credentials) =>
				userApiService.signIn(credentials).pipe(
					map(({ data, error }) =>
						error === null
							? authActions.signInSuccess(data)
							: authActions.signInFailure({ error }),
					),
					catchError((error: unknown) => of(authActions.signInFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signOutUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.signOut),
			exhaustMap(() =>
				userApiService.signOut().pipe(
					map(({ error }) =>
						error === null
							? authActions.signOutSuccess()
							: authActions.signOutFailure({ error }),
					),
					catchError((error: unknown) => of(authActions.signOutFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const resetPasswordEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.resetPassword),
			exhaustMap(({ email }) =>
				userApiService.resetPassword(email).pipe(
					map(({ error }) =>
						error === null
							? authActions.resetPasswordSuccess()
							: authActions.resetPasswordFailure({ error }),
					),
					catchError((error: unknown) => of(authActions.resetPasswordFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const changePasswordEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(AuthApiService)) => {
		return actions$.pipe(
			ofType(authActions.changePassword),
			exhaustMap(({ newPassword }) =>
				userApiService.changePassword(newPassword).pipe(
					map(({ data, error }) =>
						error === null
							? authActions.changePasswordSuccess(data)
							: authActions.changePasswordFailure({ error }),
					),
					catchError((error: unknown) =>
						of(authActions.changePasswordFailure({ error })),
					),
				),
			),
		);
	},
	{ functional: true },
);
