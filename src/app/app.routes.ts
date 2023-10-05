import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { map } from 'rxjs';

import { UserFacadeService } from './+state/user/services/user.facade.service';
import { AppNavigationService } from './services/app-navigation.service';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () => import('./pages/home/home.routes'),
		canActivate: [
			() => {
				const userFacadeService = inject(UserFacadeService);
				const appNavigationService = inject(AppNavigationService);
				return userFacadeService.isAuthenticated$.pipe(
					map(
						(isAuthenticated) =>
							isAuthenticated || appNavigationService.authPageUrlTree,
					),
				);
			},
		],
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.routes'),
		canActivate: [
			() => {
				const userFacadeService = inject(UserFacadeService);
				const appNavigationService = inject(AppNavigationService);
				return userFacadeService.isAuthenticated$.pipe(
					map(
						(isAuthenticated) =>
							!isAuthenticated || appNavigationService.homePageUrlTree,
					),
				);
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];
