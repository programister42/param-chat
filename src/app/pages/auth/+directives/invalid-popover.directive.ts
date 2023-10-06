import {
	AfterContentInit,
	Directive,
	ElementRef,
	HostListener,
	Input,
	OnDestroy,
	inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

import { Popover, PopoverInterface } from 'flowbite';

@Directive({
	selector: '[paramInvalidPopover]',
	standalone: true,
})
export class InvalidPopoverDirective implements AfterContentInit, OnDestroy {
	@Input({ required: true }) paramInvalidPopover!: HTMLElement;

	private elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
	private ngControl = inject(NgControl, { self: true });

	private popover: PopoverInterface | undefined;

	ngAfterContentInit(): void {
		this.popover = new Popover(this.paramInvalidPopover, this.elementRef.nativeElement, {
			triggerType: 'none',
		});
	}

	ngOnDestroy(): void {
		this.popover?.hide();
	}

	@HostListener('click')
	@HostListener('mouseover')
	@HostListener('focus')
	private onElementInteraction(): void {
		if (this.ngControl.dirty && this.ngControl.touched && this.ngControl.invalid) {
			this.popover?.show();
		}
	}

	@HostListener('mouseleave')
	@HostListener('blur')
	private onElementleave(): void {
		if (this.ngControl.dirty && this.ngControl.invalid) {
			this.popover?.toggle();
			this.ngControl.control?.markAsTouched();
		}
	}

	@HostListener('keydown')
	private onElementKeydown(): void {
		this.ngControl.control?.markAsUntouched();
		this.popover?.hide();
	}
}
