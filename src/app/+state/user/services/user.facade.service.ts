import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import {
	SignInWithPasswordCredentials,
	SignUpWithPasswordCredentials,
	User,
} from '@supabase/supabase-js';

import { UserProfile } from '../types/user-profile.interface';
import { selectIsLoading, selectUser, selectUserProfile, selectUserState } from '../user.reducer';
import { userActions } from '../user.actions';

@Injectable({
	providedIn: 'root',
})
export class UserFacadeService {
	private store = inject(Store);

	get user$(): Observable<User | null> {
		return this.store.select(selectUser);
	}

	get isAuthenticated$(): Observable<boolean> {
		return this.store.select(selectUserState).pipe(
			filter(({ isLoading }) => !isLoading),
			// eslint-disable-next-line @ngrx/avoid-mapping-selectors
			map(({ user }) => user !== null),
		);
	}

	get isLoading$(): Observable<boolean> {
		return this.store.select(selectIsLoading);
	}

	get userProfile$() {
		return this.store.select(selectUserProfile);
	}

	signUp(credentials: SignUpWithPasswordCredentials): void {
		this.store.dispatch(userActions.signUp(credentials));
	}

	signIn(credentials: SignInWithPasswordCredentials): void {
		this.store.dispatch(userActions.signIn(credentials));
	}

	signOut(): void {
		this.store.dispatch(userActions.signOut());
	}

	updateUserProfile(userProfile: Partial<UserProfile>): void {
		this.store.dispatch(userActions.updateUserProfile({ userProfile }));
	}
}
