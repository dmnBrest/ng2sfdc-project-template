import { Component, OnInit } from '@angular/core';
import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';


@Component({
selector: 'ng2-app',
	templateUrl: './demo.component.html' 
})

export class DemoComponent implements OnInit {

	constructor(
		private sfdcService: SfdcService
	) {}

	ngOnInit(): void {
		//this.sfdcService.initObjectsMetadata(['Account', 'Contact']);
	}

}
