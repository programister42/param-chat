import { Component, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UserFacadeService } from 'src/app/+state/user/services/user.facade.service';
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
	private destroyRef = inject(DestroyRef);
	private userFacadeService = inject(UserFacadeService);
	private appNavigationService = inject(AppNavigationService);

	changePasswordForm = this.formBuilder.nonNullable.group({
		password: [''],
	});

	isLoading$ = this.userFacadeService.isLoading$;

	onSubmit(): void {
		this.userFacadeService.changePassword(this.changePasswordForm.controls.password.value);
		this.isLoading$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((isLoading) => {
			if (!isLoading) {
				this.appNavigationService.navigateToHomePage();
			}
		});
	}
}
