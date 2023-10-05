import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AppNavigationService {
	private router = inject(Router);

	get homePageUrlTree(): UrlTree {
		return this.router.createUrlTree(['/']);
	}

	get authPageUrlTree(): UrlTree {
		return this.router.createUrlTree(['/auth']);
	}

	navigateToHomePage(): void {
		void this.router.navigate(['/']);
	}

	navigateToAuthPage(): void {
		void this.router.navigate(['/auth']);
	}
}
