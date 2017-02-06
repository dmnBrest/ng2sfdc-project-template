import { Component, OnInit, OnDestroy, Input, Output, Inject, EventEmitter } from '@angular/core';
import { SfdcService, ObjectMatadataInterface } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SLDS_CONFIG, ISldsConfig } from './../slds.config';

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

	@Input() value: any;
	@Input() sObjectField: string;
	@Input() sObjectType: string;
	@Input() editable: boolean
	@Output() valueChange = new EventEmitter<any>();
	fieldMetadata: any
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		@Inject(SLDS_CONFIG) private sldsConfig: ISldsConfig
	) {}

	ngOnInit(): void {
		console.log('SObject Field init: '+this.sObjectType+'.'+this.sObjectField);
		console.log(this.value);
		if (this.sObjectType) {
			this.sldsSpinnerService.showSpinner();
			this.sfdcService.getObjectMetadata(this.sObjectType)
			.then((meta) => {
				this.sldsSpinnerService.hideSpinner();
				this.fieldMetadata = meta.fields[this.sObjectField.toLowerCase()];
			})
			.catch((err) => {
				this.sldsSpinnerService.hideSpinner();
				throw err;
			});;
		}		
	}

	onValueChange(newValue:any) {
		this.value = newValue;
		this.valueChange.emit(this.value);
	}

	ngOnDestroy() {
		
	}

}
