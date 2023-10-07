import {
	Component,
	ChangeDetectionStrategy,
	Input,
	inject,
	OnInit,
	DestroyRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	NG_VALUE_ACCESSOR,
	NG_VALIDATORS,
	ControlValueAccessor,
	Validator,
	FormBuilder,
	ReactiveFormsModule,
	ValidationErrors,
	Validators,
	ValidatorFn,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { InvalidPopoverDirective } from '../../+directives/invalid-popover.directive';

// eslint-disable-next-line @typescript-eslint/ban-types
type UnknownCallback = Function;

@Component({
	selector: 'param-password-input',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: PasswordInputComponent,
		},
		{
			provide: NG_VALIDATORS,
			multi: true,
			useExisting: PasswordInputComponent,
		},
	],
	imports: [CommonModule, ReactiveFormsModule, InvalidPopoverDirective],
	templateUrl: './password-input.component.html',
	styleUrls: ['./password-input.component.scss'],
})
export class PasswordInputComponent implements ControlValueAccessor, Validator, OnInit {
	@Input() password: string | undefined;
	@Input() isConfirmationRequired = false;
	@Input() passwordLabel = 'Password';
	@Input() passwordConfirmationLabel = 'Confirm password';

	private formBuilder = inject(FormBuilder);
	private destroyRef = inject(DestroyRef);

	passwordConfirmationForm = this.formBuilder.nonNullable.group({
		password: [
			'',
			[
				// eslint-disable-next-line @typescript-eslint/unbound-method
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/),
			],
		],
		passwordConfirmation: [''],
	});

	touched = false;

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onChange: UnknownCallback = () => {};
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onTouched: UnknownCallback = () => {};

	ngOnInit() {
		if (this.isConfirmationRequired) {
			this.passwordConfirmationForm
				.get('passwordConfirmation')
				?.setValidators([this.getPasswordsMustMatchValidator()]);
		}
		this.passwordConfirmationForm
			.get('password')
			?.valueChanges.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe((password) => {
				this.onChange(password);
			});
	}

	writeValue(password: string) {
		if (password) {
			this.passwordConfirmationForm.get('password')?.setValue(password);
		}
	}

	registerOnChange(callback: UnknownCallback) {
		this.onChange = callback;
	}

	registerOnTouched(callback: UnknownCallback) {
		this.onTouched = callback;
	}

	setDisabledState(isDisabled: boolean) {
		if (isDisabled) {
			this.passwordConfirmationForm.disable();
		} else {
			this.passwordConfirmationForm.enable();
		}
	}

	getPasswordsMustMatchValidator(): ValidatorFn {
		return (): ValidationErrors | null => {
			const password = this.passwordConfirmationForm.get('password')?.value;
			const passwordConfirmation =
				this.passwordConfirmationForm.get('passwordConfirmation')?.value;
			if (password !== passwordConfirmation) {
				return { mustMatch: true };
			}
			return null;
		};
	}

	validate(): ValidationErrors | null {
		return this.passwordConfirmationForm.valid
			? null
			: {
					...this.passwordConfirmationForm.get('password')?.errors,
					...this.passwordConfirmationForm.get('passwordConfirmation')?.errors,
			  };
	}
}
