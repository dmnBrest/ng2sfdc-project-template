import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SfdcService, ObjectMatadataInterface } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import * as _ from 'lodash';

export interface IFieldDescription {
	name: string;
	type: string;
}

@Component({
	selector: 'slds-sobject-field',
	templateUrl: './slds-sobject-field.component.html'
})
export class SldsSobjectFieldComponent implements OnInit, OnDestroy {

	@Input() field: any;
	@Input() fieldName: string;
	@Input() sObjectType: string;
	fieldMetadata: any
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService
	) {}

	ngOnInit(): void {
		console.log('SObject Field init: '+this.sObjectType+'.'+this.fieldName);
		console.log(this.field);
		if (this.sObjectType) {
			this.sldsSpinnerService.showSpinner();
			this.sfdcService.getObjectMetadata(this.sObjectType)
			.then((meta) => {
				this.sldsSpinnerService.hideSpinner();
				this.fieldMetadata = meta.fields[this.fieldName.toLowerCase()];
				console.log('fieldMetadata:', this.fieldMetadata);
			})
			.catch((err) => {
				this.sldsSpinnerService.hideSpinner();
				throw err;
			});;
		}		
	}

	ngOnDestroy() {
		
	}

}
