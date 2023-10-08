import { Routes } from '@angular/router';

import { isUserAuthenticatedGuard, isUserNotAuthenticatedGuard } from 'src/app/shared/guards/auth';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

export default [
	{
		path: '',
		component: AuthComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'login',
			},
			{
				path: 'login',
				component: LoginComponent,
				canActivate: [isUserNotAuthenticatedGuard],
			},
			{
				path: 'register',
				component: RegisterComponent,
				canActivate: [isUserNotAuthenticatedGuard],
			},
			{
				path: 'reset-password',
				component: ResetPasswordComponent,
				canActivate: [isUserNotAuthenticatedGuard],
			},
			{
				path: 'change-password',
				component: ChangePasswordComponent,
				canActivate: [isUserAuthenticatedGuard],
			},
		],
	},
] as Routes;
