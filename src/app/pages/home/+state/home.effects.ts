import { inject } from '@angular/core';

import { filter, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigationAction } from '@ngrx/router-store';

export const lol = createEffect(
	(actions$ = inject(Actions)) => {
		return actions$.pipe(
			ofType(routerNavigationAction),
			filter((action) => action.payload.routerState.url === '/'),
			tap((lol) => {
				console.log(lol);
			}),
		);
	},
	{ functional: true, dispatch: false },
);
