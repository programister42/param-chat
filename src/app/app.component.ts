import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';

@Component({
	selector: 'param-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [CommonModule, RouterOutlet],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppComponent implements OnInit {
	ngOnInit(): void {
		initFlowbite();
	}
}
