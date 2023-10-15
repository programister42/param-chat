import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AuthFacadeService } from 'src/app/+state/auth/services/auth.facade.service';
import { AppNavigationService } from 'src/app/shared/services/app-navigation.service';
import { PasswordInputComponent } from '../+components/password-input/password-input.component';

@Component({
	selector: 'param-change-password',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		NgOptimizedImage,
		ReactiveFormsModule,
		PasswordInputComponent,
	],
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
	private formBuilder = inject(FormBuilder);
	changePasswordForm = this.formBuilder.nonNullable.group({
		password: [''],
	});
	private destroyRef = inject(DestroyRef);
	private userFacadeService = inject(AuthFacadeService);
	isLoading$ = this.userFacadeService.isLoading$;
	private appNavigationService = inject(AppNavigationService);

	onSubmit(): void {
		this.userFacadeService.changePassword(this.changePasswordForm.controls.password.value);
		this.isLoading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoading) => {
			if (!isLoading) {
				this.appNavigationService.navigateToHomePage();
			}
		});
	}
}
