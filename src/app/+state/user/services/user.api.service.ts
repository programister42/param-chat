import { Injectable, inject } from '@angular/core';

import { Subject, from, map } from 'rxjs';
import {
	AuthChangeEvent,
	PostgrestSingleResponse,
	Session,
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
	SupabaseClient,
	User,
} from '@supabase/supabase-js';

import { UserProfile } from '../types/user-profile.interface';
import { UserFacadeService } from './user.facade.service';

const getResponseData = <T>(response: PostgrestSingleResponse<T>) => {
	if (response.error) {
		throw new Error(response.error.message);
	}
	if (response.data === null) {
		throw new Error('Failed to fetch data');
	}
	return response.data;
};

@Injectable({
	providedIn: 'root',
})
export class UserApiService {
	private supabase = inject(SupabaseClient);
	private userFacadeService = inject(UserFacadeService);

	get user$() {
		return from(this.supabase.auth.getUser());
	}

	get session$() {
		return from(this.supabase.auth.getSession());
	}

	get authChanges$() {
		const isLoggedIn$ = new Subject<User | null>();
		this.supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: Session | null) => {
			isLoggedIn$.next(session?.user ?? null);
		});
		return isLoggedIn$;
	}

	signUp(credentials: SignUpWithPasswordCredentials) {
		return from(this.supabase.auth.signUp(credentials));
	}

	signIn(credentials: SignInWithPasswordCredentials) {
		return from(this.supabase.auth.signInWithPassword(credentials));
	}

	signOut() {
		return from(this.supabase.auth.signOut());
	}

	getProfile(user: User) {
		return from(
			this.supabase
				.from('profiles')
				.select(`username, website, avatar_url`)
				.eq('id', user.id)
				.single<UserProfile>(),
		).pipe(map(getResponseData));
	}

	updateProfile(userProfile: UserProfile) {
		const update = {
			...userProfile,
			id: userProfile.id,
			updated_at: new Date(),
		};

		return from(this.supabase.from('profiles').upsert(update)).pipe(map(getResponseData));
	}

	downLoadImage(path: string) {
		return from(this.supabase.storage.from('avatars').download(path));
	}

	uploadAvatar(filePath: string, file: File) {
		return from(this.supabase.storage.from('avatars').upload(filePath, file));
	}
}
