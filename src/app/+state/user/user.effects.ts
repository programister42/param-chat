import { inject } from '@angular/core';

import { catchError, defer, exhaustMap, map, of } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { userActions } from './user.actions';
import { UserApiService } from './services/user.api.service';

export const initUserEffect = createEffect(
	() => {
		return defer(() => of(userActions.getUser()));
	},
	{ functional: true },
);

export const getUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.getUser),
			exhaustMap(() =>
				userApiService.session$.pipe(
					map(({ data, error }) =>
						error === null
							? userActions.getUserSuccess({ user: data.session?.user ?? null })
							: userActions.getUserFailure({ error }),
					),
					catchError((error: unknown) => of(userActions.getUserFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);
// 	(
// 		actions$ = inject(Actions),
// 		userApiService = inject(UserApiService),
// 		appNavigationService = inject(AppNavigationService),
// 	) => {
// 		return actions$.pipe(
// 			ofType(userActions.getUser),
// 			exhaustMap(() =>
// 				userApiService.authChanges$.pipe(
// 					tap(({ event }) => {
// 						console.log('event', event);
// 						switch (event) {
// 							case 'PASSWORD_RECOVERY':
// 								appNavigationService.navigateToChangePasswordPage();
// 								break;
// 							case 'SIGNED_IN':
// 								appNavigationService.navigateToHomePage();
// 								break;
// 							case 'SIGNED_OUT':
// 								appNavigationService.navigateToAuthPage();
// 								break;
// 						}
// 					}),
// 					map(({ session }) =>
// 						userActions.getUserSuccess({ user: session?.user ?? null }),
// 					),
// 					catchError((error: unknown) => of(userActions.getUserFailure({ error }))),
// 				),
// 			),
// 		);
// 	},
// 	{ functional: true },
// );

export const signUpUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signUp),
			exhaustMap((credentials) =>
				userApiService.signUp(credentials).pipe(
					map(({ data, error }) =>
						error === null
							? userActions.signUpSuccess(data)
							: userActions.signUpFailure({ error }),
					),
					catchError((error: unknown) => of(userActions.signUpFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signInUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signIn),
			exhaustMap((credentials) =>
				userApiService.signIn(credentials).pipe(
					map(({ data, error }) =>
						error === null
							? userActions.signInSuccess(data)
							: userActions.signInFailure({ error }),
					),
					catchError((error: unknown) => of(userActions.signInFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signOutUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signOut),
			exhaustMap(() =>
				userApiService.signOut().pipe(
					map(({ error }) =>
						error === null
							? userActions.signOutSuccess()
							: userActions.signOutFailure({ error }),
					),
					catchError((error: unknown) => of(userActions.signOutFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const resetPasswordEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.resetPassword),
			exhaustMap(({ email }) =>
				userApiService.resetPassword(email).pipe(
					map(({ error }) =>
						error === null
							? userActions.resetPasswordSuccess()
							: userActions.resetPasswordFailure({ error }),
					),
					catchError((error: unknown) => of(userActions.resetPasswordFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const changePasswordEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.changePassword),
			exhaustMap(({ newPassword }) =>
				userApiService.changePassword(newPassword).pipe(
					map(({ data, error }) =>
						error === null
							? userActions.changePasswordSuccess(data)
							: userActions.changePasswordFailure({ error }),
					),
					catchError((error: unknown) =>
						of(userActions.changePasswordFailure({ error })),
					),
				),
			),
		);
	},
	{ functional: true },
);
