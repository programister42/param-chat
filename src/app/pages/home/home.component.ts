import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserFacadeService } from 'src/app/+state/user/services/user.facade.service';

@Component({
	selector: 'param-home',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	private userFacadeService = inject(UserFacadeService);

	user$ = this.userFacadeService.user$;
	isLoading$ = this.userFacadeService.isLoading$;

	onSignOutButtonClick() {
		this.userFacadeService.signOut();
	}
}
