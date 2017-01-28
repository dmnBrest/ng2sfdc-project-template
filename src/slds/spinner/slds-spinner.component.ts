import { Component, OnInit, OnDestroy } from '@angular/core';
import { SldsSpinnerService } from './slds-spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'slds-spinner',
	templateUrl: './slds-spinner.component.html'
	//styleUrls: ['./heroes-list.component.css']
})
export class SldsSpinnerComponent implements OnInit, OnDestroy {

	show: boolean = false;
	private showChangeSubscription: Subscription

	constructor(
		private sldsSpinnerService: SldsSpinnerService
	) {
		this.showChangeSubscription = sldsSpinnerService.getShow().subscribe(
			(showValue) => {
				console.log('Spinner: ', showValue);
				this.show = showValue;
			}
		);
	}

	ngOnInit(): void {
		
	}

	ngOnDestroy() {
		this.showChangeSubscription.unsubscribe();
	}


}
