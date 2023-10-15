import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { AuthFacadeService } from 'src/app/+state/auth/services/auth.facade.service';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'param-home',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, RouterModule, NgOptimizedImage],
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	private userFacadeService = inject(AuthFacadeService);

	user$ = this.userFacadeService.user$;
	isLoading$ = this.userFacadeService.isLoading$;

	onSignOutButtonClick() {
		this.userFacadeService.signOut();
	}
}
