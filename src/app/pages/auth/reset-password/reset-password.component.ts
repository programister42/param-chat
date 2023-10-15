import {
	ChangeDetectionStrategy,
	Component,
	OnDestroy,
	afterNextRender,
	inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Modal, ModalInterface, ModalOptions } from 'flowbite';

import { AuthFacadeService } from 'src/app/+state/auth/services/auth.facade.service';
import { PasswordInputComponent } from '../+components/password-input/password-input.component';
import { InvalidPopoverDirective } from '../+directives/invalid-popover.directive';

@Component({
	selector: 'param-reset-password',
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
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnDestroy {
	private formBuilder = inject(FormBuilder);
	resetPasswordForm = this.formBuilder.nonNullable.group({
		email: [
			'',
			[
				// eslint-disable-next-line @typescript-eslint/unbound-method
				Validators.required,
				// eslint-disable-next-line @typescript-eslint/unbound-method
				Validators.email,
			],
		],
	});
	private userFacadeService = inject(AuthFacadeService);
	isLoading$ = this.userFacadeService.isLoading$;

	private confirmationEmailModal: ModalInterface | undefined;

	constructor() {
		afterNextRender(() => {
			this.buildEmailConfirmationModal();
		});
	}

	ngOnDestroy(): void {
		this.confirmationEmailModal?.hide();
	}

	onSubmit(): void {
		this.userFacadeService.resetPassword(this.resetPasswordForm.controls.email.value);
		this.confirmationEmailModal?.show();
	}

	private buildEmailConfirmationModal(): void {
		const confirmationEmailModalElement = document.querySelector('#confirmationEmailModal');
		const confirmationEmailModalOptions: ModalOptions = {
			placement: 'top-center',
			backdrop: 'static',
			closable: false,
		};
		this.confirmationEmailModal = new Modal(
			confirmationEmailModalElement as HTMLElement,
			confirmationEmailModalOptions,
		);
	}
}
