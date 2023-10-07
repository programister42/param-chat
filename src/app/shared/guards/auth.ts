import { inject } from '@angular/core';

import { map } from 'rxjs';

import { UserFacadeService } from 'src/app/+state/user/services/user.facade.service';
import { AppNavigationService } from '../services/app-navigation.service';

export const isUserAuthenticatedGuard = () => {
	const userFacadeService = inject(UserFacadeService);
	const appNavigationService = inject(AppNavigationService);
	return userFacadeService.isAuthenticated$.pipe(
		map((isAuthenticated) => isAuthenticated || appNavigationService.authPageUrlTree),
	);
};

export const isUserNotAuthenticatedGuard = () => {
	const userFacadeService = inject(UserFacadeService);
	const appNavigationService = inject(AppNavigationService);
	return userFacadeService.isAuthenticated$.pipe(
		map((isAuthenticated) => !isAuthenticated || appNavigationService.homePageUrlTree),
	);
};
