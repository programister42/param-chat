import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { User } from '@supabase/supabase-js';

import { selectIsLoading, selectUser, selectAuthState } from '../auth.reducer';
import { authActions } from '../auth.actions';

@Injectable({
	providedIn: 'root',
})
export class AuthFacadeService {
	private store = inject(Store);

	get user$(): Observable<User | null> {
		return this.store.select(selectUser);
	}

	get isAuthenticated$(): Observable<boolean> {
		return this.store.select(selectAuthState).pipe(
			filter(({ isLoading }) => !isLoading),
			// eslint-disable-next-line @ngrx/avoid-mapping-selectors
			map(({ user }) => user !== null),
		);
	}

	get isLoading$(): Observable<boolean> {
		return this.store.select(selectIsLoading);
	}

	signUp(credentials: { email: string; password: string }): void {
		this.store.dispatch(authActions.signUp(credentials));
	}

	signIn(credentials: { email: string; password: string }): void {
		this.store.dispatch(authActions.signIn(credentials));
	}

	signOut(): void {
		this.store.dispatch(authActions.signOut());
	}

	resetPassword(email: string): void {
		this.store.dispatch(authActions.resetPassword({ email }));
	}

	changePassword(newPassword: string): void {
		this.store.dispatch(authActions.changePassword({ newPassword }));
	}
}
