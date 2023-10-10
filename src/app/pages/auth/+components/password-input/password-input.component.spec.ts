import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordInputComponent } from './password-input.component';

describe('PasswordWithConfirmationInputComponent', () => {
	let component: PasswordInputComponent;
	let fixture: ComponentFixture<PasswordInputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PasswordInputComponent],
		});
		fixture = TestBed.createComponent(PasswordInputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
