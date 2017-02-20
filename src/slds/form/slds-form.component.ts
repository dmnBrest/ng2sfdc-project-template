import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SLDS_CONFIG, ISldsConfig } from './../slds.config';
import { SfdcService, ObjectMatadataInterface } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import * as _ from 'lodash';

@Component({
	selector: 'slds-form',
	templateUrl: './slds-form.component.html'
})
export class SldsFormComponent implements OnInit, OnDestroy {
	
	@Input() sObject: any; 
	@Input() sObjectType: string; 
	@Input() sObjectFields: string[];
	sObjectMetadata: ObjectMatadataInterface
	sObjectFieldsMeta: any[];
	frm: NgForm;
	@Output() onFormInit = new EventEmitter<NgForm>();

	@ViewChildren("frm")
	public formsElements: QueryList<NgForm>	
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		@Inject(SLDS_CONFIG) private sldsConfig: ISldsConfig
	) {}

	ngOnInit(): void {
		console.log('Form init');
		if (this.sObjectType) {
			this.sldsSpinnerService.showSpinner();
			this.sfdcService.getObjectMetadata(this.sObjectType)
			.then((meta) => {
				this.sldsSpinnerService.hideSpinner();
				this.sObjectMetadata = meta;
				this.sObjectFieldsMeta = _.reduce(this.sObjectFields, (results, field) => {
					if (_.has(this.sObjectMetadata.fields, field.toLowerCase())) {
						results.push(this.sObjectMetadata.fields[field.toLowerCase()]);
					}
					return results;
				}, []);
			})
			.catch((err) => {
				this.sldsSpinnerService.hideSpinner();
				throw err;
			});
		}
	}

	ngAfterViewInit(): void {
		this.formsElements.changes.subscribe((comps: QueryList<NgForm>) => {
			this.frm = comps.first;
			console.log(this.frm);
			this.onFormInit.emit(this.frm);
		});
	}

	ngOnDestroy() {
		
	}

}
