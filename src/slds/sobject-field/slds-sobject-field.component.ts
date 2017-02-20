import { Component, OnInit, OnDestroy, Input, Output, Inject, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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
	templateUrl: './slds-sobject-field.component.html',
	providers: [
		{ 
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SldsSobjectFieldComponent),
			multi: true
		}
	]	
})
export class SldsSobjectFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

	value: any;
	@Input() sObjectField: string;
	@Input() sObjectType: string;
	@Input() editable: boolean
	fieldMetadata: any
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		@Inject(SLDS_CONFIG) private sldsConfig: ISldsConfig
	) {}

	writeValue(value: any) : void {
		this.value = value;
	}

	propagateChange = (_: any) => {};

	registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}

	registerOnTouched(fn: any): void {

	}

	onValueChange(newValue:any) {
		this.value = newValue;
		this.propagateChange(this.value);
	}

	ngOnInit(): void {
		if (this.sObjectType) {
			this.sldsSpinnerService.showSpinner();
			this.sfdcService.getObjectMetadata(this.sObjectType)
			.then((meta) => {
				this.sldsSpinnerService.hideSpinner();
				this.fieldMetadata = meta.fields[this.sObjectField.toLowerCase()];
				console.log('fieldMetadata');
				console.log(this.fieldMetadata);

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
