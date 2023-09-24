import {
	Component,
	ElementRef,
	OnInit,
	Renderer2,
	ViewChild,
	afterNextRender,
	inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { initFlowbite, Carousel, CarouselItem, CarouselOptions, CarouselInterface } from 'flowbite';

@Component({
	selector: 'param-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'param-chat';

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
					el: this.carouselItem1.nativeElement,
				},
				{
					position: 1,
					el: this.carouselItem2.nativeElement,
				},
				{
					position: 2,
					el: this.carouselItem3.nativeElement,
				},
				{
					position: 3,
					el: this.carouselItem4.nativeElement,
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
							el: this.carouselIndicator1.nativeElement,
						},
						{
							position: 1,
							el: this.carouselIndicator2.nativeElement,
						},
						{
							position: 2,
							el: this.carouselIndicator3.nativeElement,
						},
						{
							position: 3,
							el: this.carouselIndicator4.nativeElement,
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
