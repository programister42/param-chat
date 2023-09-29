import { ActivatedRouteSnapshot, Routes, createUrlTreeFromSnapshot } from '@angular/router';

export enum AppRoutes {
	BASE = '',
	AUTH = 'auth',
}

export const routes: Routes = [
	{
		path: AppRoutes.BASE,
		pathMatch: 'full',
		loadChildren: () => import('./pages/home/home.routes'),
		canActivate: [
			(route: ActivatedRouteSnapshot) => createUrlTreeFromSnapshot(route, ['auth']),
		],
	},
	{
		path: AppRoutes.AUTH,
		loadChildren: () => import('./pages/auth/auth.routes'),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
