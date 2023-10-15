import { inject } from '@angular/core';

import { map } from 'rxjs';

import { AuthFacadeService } from 'src/app/+state/auth/services/auth.facade.service';
import { AppNavigationService } from '../services/app-navigation.service';

export const isUserAuthenticatedGuard = () => {
	const userFacadeService = inject(AuthFacadeService);
	const appNavigationService = inject(AppNavigationService);
	return userFacadeService.isAuthenticated$.pipe(
		map((isAuthenticated) => isAuthenticated || appNavigationService.authPageUrlTree),
	);
};

export const isUserNotAuthenticatedGuard = () => {
	const userFacadeService = inject(AuthFacadeService);
	const appNavigationService = inject(AppNavigationService);
	return userFacadeService.isAuthenticated$.pipe(
		map((isAuthenticated) => !isAuthenticated || appNavigationService.homePageUrlTree),
	);
};
