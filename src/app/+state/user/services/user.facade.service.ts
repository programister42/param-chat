import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, filter, map } from 'rxjs';
import { User } from '@supabase/supabase-js';

import { selectIsLoading, selectUser, selectUserState } from '../user.reducer';
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

	signUp(credentials: { email: string; password: string }): void {
		this.store.dispatch(userActions.signUp(credentials));
	}

	signIn(credentials: { email: string; password: string }): void {
		this.store.dispatch(userActions.signIn(credentials));
	}

	signOut(): void {
		this.store.dispatch(userActions.signOut());
	}

	resetPassword(email: string): void {
		this.store.dispatch(userActions.resetPassword({ email }));
	}

	changePassword(newPassword: string): void {
		this.store.dispatch(userActions.changePassword({ newPassword }));
	}
}
