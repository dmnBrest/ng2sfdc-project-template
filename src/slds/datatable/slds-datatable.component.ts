import { Component, OnInit, OnDestroy, Input, ContentChild, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { SfdcService, ObjectMatadataInterface } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import * as _ from 'lodash';

// @Pipe({ name: 'fieldExistsIn' })
// export class FieldExistsPipe implements PipeTransform {
// 	transform(allFields: string[], fieldsMap: ObjectMatadataInterface) {
// 		return _.filter(allFields, field => _.has(fieldsMap, field.toLowerCase()));
// 	}
// }

export interface IFieldDescription {
	name: string;
	type: string;
}

@Component({
	selector: 'slds-datatable',
	templateUrl: './slds-datatable.component.html'
	//styleUrls: ['./heroes-list.component.css']
})
export class SldsDatatableComponent implements OnInit, OnDestroy {
	@ContentChild('actions') actionsTemplate: TemplateRef<any>;

	@Input() items: any[];
	@Input() fields: string[] | IFieldDescription[] 
	@Input() sObjectType: string;
	@Input() sObjectFields: string[];
	sObjectFieldsMeta: any[];
	sObjectMetadata: ObjectMatadataInterface
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService
	) {}

	ngOnInit(): void {
		console.log('Datatable init');
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

	ngOnDestroy() {
		
	}

}
