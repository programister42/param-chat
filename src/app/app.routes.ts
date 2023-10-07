import { Routes } from '@angular/router';

import { isUserAuthenticatedGuard } from './shared/guards/auth';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () => import('./pages/home/home.routes'),
		canActivate: [isUserAuthenticatedGuard],
	},
	{
		path: 'auth',
		loadChildren: () => import('./pages/auth/auth.routes'),
	},
	{
		path: '**',
		redirectTo: '',
	},
];
