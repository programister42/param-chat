import {
	afterNextRender,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { Drawer, DrawerInterface } from 'flowbite';

@Component({
	selector: 'param-update-auth-profile-drawer',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	templateUrl: './update-user-profile-drawer.component.html',
	styleUrls: ['./update-user-profile-drawer.component.scss'],
})
export class UpdateUserProfileDrawerComponent {
	@ViewChild('updateUserProfileDrawer') updateUserProfileDrawerElementRef:
		| ElementRef<HTMLDivElement>
		| undefined;

	private updateUserProfileDrawer: DrawerInterface | undefined;

	constructor() {
		afterNextRender(() => {
			const updateUserProfileDrawerElement =
				this.updateUserProfileDrawerElementRef?.nativeElement;
			if (updateUserProfileDrawerElement) {
				this.updateUserProfileDrawer = new Drawer(updateUserProfileDrawerElement);
			}
		});
	}

	open() {
		this.updateUserProfileDrawer?.show();
	}

	close() {
		this.updateUserProfileDrawer?.hide();
	}
}
