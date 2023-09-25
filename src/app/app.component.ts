import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
	afterNextRender,
	inject,
	ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite, Carousel, CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';

@Component({
	selector: 'param-root',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [CommonModule, RouterOutlet, NgOptimizedImage],
})
export class AppComponent implements OnInit {
	title = 'param-chat';

	images = [
		'assets/images/img-1.jpg',
		'assets/images/img-2.jpg',
		'assets/images/img-3.jpg',
		'assets/images/img-4.jpg',
	];

	@ViewChild('carouselItem1') carouselItem1!: ElementRef;
	@ViewChild('carouselItem2') carouselItem2!: ElementRef;
	@ViewChild('carouselItem3') carouselItem3!: ElementRef;
	@ViewChild('carouselItem4') carouselItem4!: ElementRef;

	@ViewChild('carouselIndicator1') carouselIndicator1!: ElementRef;
	@ViewChild('carouselIndicator2') carouselIndicator2!: ElementRef;
	@ViewChild('carouselIndicator3') carouselIndicator3!: ElementRef;
	@ViewChild('carouselIndicator4') carouselIndicator4!: ElementRef;

	@ViewChild('dataCarouselPrev') dataCarouselPrev!: ElementRef;
	@ViewChild('dataCarouselNext') dataCarouselNext!: ElementRef;

	private renderer = inject(Renderer2);

	constructor() {
		afterNextRender(() => {
			const items: CarouselItem[] = [
				{
					position: 0,
					el: this.carouselItem1.nativeElement as HTMLElement,
				},
				{
					position: 1,
					el: this.carouselItem2.nativeElement as HTMLElement,
				},
				{
					position: 2,
					el: this.carouselItem3.nativeElement as HTMLElement,
				},
				{
					position: 3,
					el: this.carouselItem4.nativeElement as HTMLElement,
				},
			];

			const options: CarouselOptions = {
				defaultPosition: 1,
				interval: 3000,

				indicators: {
					activeClasses: 'bg-white dark:bg-gray-800',
					inactiveClasses:
						'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
					items: [
						{
							position: 0,
							el: this.carouselIndicator1.nativeElement as HTMLElement,
						},
						{
							position: 1,
							el: this.carouselIndicator2.nativeElement as HTMLElement,
						},
						{
							position: 2,
							el: this.carouselIndicator3.nativeElement as HTMLElement,
						},
						{
							position: 3,
							el: this.carouselIndicator4.nativeElement as HTMLElement,
						},
					],
				},

				// callback functions
				onNext: () => {
					console.log('next slider item is shown');
				},
				onPrev: () => {
					console.log('previous slider item is shown');
				},
				onChange: () => {
					console.log('new slider item has been shown');
				},
			};

			const carousel: CarouselInterface = new Carousel(items, options);

			carousel.cycle();

			this.renderer.listen(this.dataCarouselPrev.nativeElement, 'click', () => {
				carousel.prev();
			});

			this.renderer.listen(this.dataCarouselNext.nativeElement, 'click', () => {
				carousel.next();
			});
		});
	}

	ngOnInit() {
		initFlowbite();
	}
}
