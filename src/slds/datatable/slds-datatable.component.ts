import { Component, OnInit, OnDestroy, Input, ContentChild, TemplateRef } from '@angular/core';
import { SfdcService, ObjectMatadataInterface } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SldsNotificationService } from './../../slds/notification/slds-notification.service';

@Component({
	selector: 'slds-datatable',
	templateUrl: './slds-datatable.component.html'
	//styleUrls: ['./heroes-list.component.css']
})
export class SldsDatatableComponent implements OnInit, OnDestroy {
	@ContentChild('actions') actionsTemplate: TemplateRef<any>;

	@Input() items: any[];
	@Input() objectType: string;
	@Input() fields: string[];
	objectMetadata: ObjectMatadataInterface
	
	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		private sldsNotificationService: SldsNotificationService,
	) {
		
	}

	ngOnInit(): void {
		console.log('Datatable init');
		if (this.objectType) {
			this.sldsSpinnerService.showSpinner();
			this.sfdcService.getObjectMetadata(this.objectType).then((meta) => {
				this.sldsSpinnerService.hideSpinner();
				this.objectMetadata = meta;
				console.log('meta:');
				console.log(meta);
			}).catch((err) => {
				console.error(err);
			});
		}
	}

	ngOnDestroy() {
		
	}

}
