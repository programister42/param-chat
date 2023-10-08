import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'param-auth',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	imports: [CommonModule, RouterModule, NgOptimizedImage],
	templateUrl: './auth.component.html',
	styleUrls: ['./auth.component.scss'],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthComponent {}
