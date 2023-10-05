import { inject } from '@angular/core';

import { catchError, defer, exhaustMap, map, of, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { userActions } from './user.actions';
import { UserApiService } from './services/user.api.service';
import { UserFacadeService } from './services/user.facade.service';
import { AppNavigationService } from 'src/app/services/app-navigation.service';

export const initUserEffect = createEffect(
	() => {
		return defer(() => of(userActions.getUser()));
	},
	{ functional: true },
);

export const getUserEffect = createEffect(
	(
		actions$ = inject(Actions),
		userApiService = inject(UserApiService),
		userFacadeService = inject(UserFacadeService),
		appNavigationService = inject(AppNavigationService),
	) => {
		return actions$.pipe(
			ofType(userActions.getUser),
			exhaustMap(() =>
				userApiService.authChanges$.pipe(
					withLatestFrom(userFacadeService.user$),
					map(([user, previousUser]) => {
						if (previousUser === null && user !== null) {
							appNavigationService.navigateToHomePage();
						} else if (previousUser !== null && user === null) {
							appNavigationService.navigateToAuthPage();
						}
						return userActions.getUserSuccess({ user });
					}),
					catchError((error: unknown) => of(userActions.getUserFailure({ error }))),
				),
			),
		);
	},
	{ functional: true },
);

export const signUpUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signUp),
			tap((credentials) => {
				userApiService.signUp(credentials);
			}),
		);
	},
	{ functional: true, dispatch: false },
);

export const signInUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signIn),
			tap((credentials) => {
				userApiService.signIn(credentials);
			}),
		);
	},
	{ functional: true, dispatch: false },
);

export const signOutUserEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.signOut),
			tap(() => {
				userApiService.signOut();
			}),
		);
	},
	{ functional: true, dispatch: false },
);

export const getUserProfileEffect = createEffect(
	(actions$ = inject(Actions), userApiService = inject(UserApiService)) => {
		return actions$.pipe(
			ofType(userActions.getUserProfile),
			exhaustMap(({ user }) =>
				userApiService.getProfile(user).pipe(
					map((userProfile) => userActions.getUserProfileSuccess({ userProfile })),
					catchError((error: unknown) =>
						of(userActions.getUserProfileFailure({ error })),
					),
				),
			),
		);
	},
	{ functional: true },
);
