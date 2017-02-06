import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject } from '@angular/core';
import { SLDS_CONFIG, ISldsConfig } from './../slds.config';

@Component({
	selector: 'slds-modal',
	templateUrl: './slds-modal.component.html'
})
export class SldsModalComponent implements OnInit, OnDestroy {
	
	show: boolean = false;
	@Input() large: boolean; 
	@Input() hideHeader: boolean; 
	@Input() hideFooter: boolean;
	@Output() onClose = new EventEmitter<void>();
	
	constructor(
		@Inject(SLDS_CONFIG) private sldsConfig: ISldsConfig
	) {}

	ngOnInit(): void {
		console.log('Modal init');
		
	}

	openModal(): void {
		this.show = true;
	}

	closeModal(): void {
		this.show = false;
		this.onClose.emit();
	}

	ngOnDestroy() {
		
	}

}
