import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthFacadeService } from 'src/app/+state/auth/services/auth.facade.service';
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
	loginForm = this.formBuilder.nonNullable.group({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		email: ['', [Validators.required, Validators.email]],
		password: [''],
	});
	private userFacadeService = inject(AuthFacadeService);
	isLoading$ = this.userFacadeService.isLoading$;

	onSubmit(): void {
		this.userFacadeService.signIn({
			email: this.loginForm.controls.email.value,
			password: this.loginForm.controls.password.value,
		});
	}
}
