import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserFacadeService } from 'src/app/+state/user/services/user.facade.service';
import { PasswordInputComponent } from '../+components/password-input/password-input.component';
import { InvalidPopoverDirective } from '../+directives/invalid-popover.directive';

@Component({
	selector: 'param-login',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		NgOptimizedImage,
		ReactiveFormsModule,
		InvalidPopoverDirective,
		PasswordInputComponent,
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	private formBuilder = inject(FormBuilder);
	private userFacadeService = inject(UserFacadeService);

	loginForm = this.formBuilder.nonNullable.group({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		email: ['', [Validators.required, Validators.email]],
		password: [''],
	});

	isLoading$ = this.userFacadeService.isLoading$;

	onSubmit(): void {
		// this.userFacadeService.login({
		// 	email: this.loginForm.controls.email.value,
		// 	password: this.loginForm.controls.password.value,
		// });

		this.userFacadeService.signIn({
			email: this.loginForm.controls.email.value,
			password: this.loginForm.controls.password.value,
		});
	}
}
