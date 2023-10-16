import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserProfileDrawerComponent } from './update-user-profile-drawer.component';

describe('UpdateUserProfileDrawerComponent', () => {
	let component: UpdateUserProfileDrawerComponent;
	let fixture: ComponentFixture<UpdateUserProfileDrawerComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [UpdateUserProfileDrawerComponent],
		});
		fixture = TestBed.createComponent(UpdateUserProfileDrawerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
