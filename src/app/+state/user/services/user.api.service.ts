import { Injectable, inject } from '@angular/core';

import { from } from 'rxjs';
import {
	AuthChangeEvent,
	SignInWithPasswordCredentials,
	SupabaseClient,
} from '@supabase/supabase-js';

import { AppNavigationService } from 'src/app/shared/services/app-navigation.service';

@Injectable({
	providedIn: 'root',
})
export class UserApiService {
	private supabase = inject(SupabaseClient);
	private appNavigationService = inject(AppNavigationService);

	// TODO: Remove this constructor
	constructor() {
		this.supabase.auth.onAuthStateChange((event: AuthChangeEvent) => {
			switch (event) {
				case 'PASSWORD_RECOVERY':
					this.appNavigationService.navigateToChangePasswordPage();
					break;
				case 'SIGNED_IN':
					this.appNavigationService.navigateToHomePage();
					break;
				case 'SIGNED_OUT':
					this.appNavigationService.navigateToAuthPage();
					break;
			}
		});
	}

	get session$() {
		return from(this.supabase.auth.getSession());
	}

	signUp(credentials: { email: string; password: string }) {
		return from(
			this.supabase.auth.signUp({
				...credentials,
				options: {
					emailRedirectTo: this.appNavigationService.currentAppOriginUrl,
				},
			}),
		);
	}

	signIn(credentials: SignInWithPasswordCredentials) {
		return from(this.supabase.auth.signInWithPassword(credentials));
	}

	signOut() {
		return from(this.supabase.auth.signOut());
	}

	resetPassword(email: string) {
		return from(
			this.supabase.auth.resetPasswordForEmail(email, {
				redirectTo: this.appNavigationService.currentAppOriginUrl,
			}),
		);
	}

	changePassword(password: string) {
		return from(this.supabase.auth.updateUser({ password }));
	}

	// getProfile(user: User) {
	// 	return from(
	// 		this.supabase
	// 			.from('profiles')
	// 			.select(`username, website, avatar_url`)
	// 			.eq('id', user.id)
	// 			.single<UserProfile>(),
	// 	).pipe(map(getResponseData));
	// }

	// updateProfile(userProfile: UserProfile) {
	// 	const update = {
	// 		...userProfile,
	// 		id: userProfile.id,
	// 		updated_at: new Date(),
	// 	};

	// 	return from(this.supabase.from('profiles').upsert(update)).pipe(map(getResponseData));
	// }

	// downLoadImage(path: string) {
	// 	return from(this.supabase.storage.from('avatars').download(path));
	// }

	// uploadAvatar(filePath: string, file: File) {
	// 	return from(this.supabase.storage.from('avatars').upload(filePath, file));
	// }
}
