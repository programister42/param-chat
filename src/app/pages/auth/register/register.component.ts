import {
	Component,
	ChangeDetectionStrategy,
	inject,
	afterNextRender,
	OnDestroy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserFacadeService } from 'src/app/+state/user/services/user.facade.service';
import { PasswordInputComponent } from '../+components/password-input/password-input.component';
import { InvalidPopoverDirective } from '../+directives/invalid-popover.directive';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';

@Component({
	selector: 'param-register',
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
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnDestroy {
	private formBuilder = inject(FormBuilder);
	private userFacadeService = inject(UserFacadeService);

	registerForm = this.formBuilder.nonNullable.group({
		// eslint-disable-next-line @typescript-eslint/unbound-method
		email: ['', [Validators.required, Validators.email]],
		password: [''],
		// eslint-disable-next-line @typescript-eslint/unbound-method
		terms: [false, [Validators.requiredTrue]],
	});

	isLoading$ = this.userFacadeService.isLoading$;

	private termsModal: ModalInterface | undefined;

	constructor() {
		afterNextRender(() => {
			this.buildTermsModal();
		});
	}

	ngOnDestroy(): void {
		this.termsModal?.hide();
		this.emailConfirmationModal?.hide();
	}

	onClickTermsLink(): void {
		this.termsModal?.show();
	}

	onClickAcceptTermsButton(): void {
		this.registerForm.controls.terms.setValue(true);
		this.termsModal?.hide();
	}

	onClickCloseTermsButton(): void {
		this.termsModal?.hide();
	}

	onSubmit(): void {
		this.userFacadeService.signUp({
			email: this.registerForm.controls.email.value,
			password: this.registerForm.controls.password.value,
		});
	}

	private buildTermsModal(): void {
		const termsModalElement = document.querySelector('#termsModal');
		this.termsModal = new Modal(termsModalElement as HTMLElement);
	}
	}
}
