import { createActionGroup } from '@ngrx/store';

export const userActions = createActionGroup({
	source: 'User',
	events: {
		login: (name: string) => ({ name }),
	},
});
