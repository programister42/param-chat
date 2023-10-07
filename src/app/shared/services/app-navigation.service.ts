import { PlatformLocation } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AppNavigationService {
	private router = inject(Router);
	private platformLocation = inject(PlatformLocation);

	appProdUrl = 'param-chat.vercel.app';

	get homePageUrlTree(): UrlTree {
		return this.router.createUrlTree(['/']);
	}

	get authPageUrlTree(): UrlTree {
		return this.router.createUrlTree(['/auth']);
	}

	get currentAppOriginUrl() {
		return window.location.origin;
	}

	get changePasswordPageAbsoluteUrl(): string {
		return `${this.currentAppOriginUrl}/auth/change-password`;
	}

	navigateToHomePage(): void {
		void this.router.navigate(['/']);
	}

	navigateToAuthPage(): void {
		void this.router.navigate(['/auth']);
	}

	navigateToChangePasswordPage(): void {
		void this.router.navigate(['/auth/change-password']);
	}
}
