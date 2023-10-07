import { Component, ChangeDetectionStrategy, OnInit, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { initFlowbite } from 'flowbite';
import { inject } from '@vercel/analytics';

@Component({
	selector: 'param-root',
	changeDetection: ChangeDetectionStrategy.OnPush,
	standalone: true,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [CommonModule, RouterOutlet],
})
export class AppComponent implements OnInit {
	constructor() {
		afterNextRender(() => {
			window.name = `param-chat-app`;
		});
	}

	ngOnInit(): void {
		initFlowbite();
		inject();
	}
}
