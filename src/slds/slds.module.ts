import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SfdcService } from './../services/sfdc.service';
import { SldsSpinnerComponent } from './../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../slds/spinner/slds-spinner.service';
import { SldsNotificationComponent } from './../slds/notification/slds-notification.component';
import { SldsNotificationService } from './../slds/notification/slds-notification.service';
import { SldsDatatableComponent } from './../slds/datatable/slds-datatable.component';
import { SldsSobjectFieldComponent } from './../slds/sobject-field/slds-sobject-field.component';

@NgModule({
	imports: [
		BrowserModule
	],	
	declarations: [
		SldsSpinnerComponent,
		SldsNotificationComponent,
		SldsDatatableComponent,
		SldsSobjectFieldComponent
	],
	exports: [
		SldsSpinnerComponent,
		SldsNotificationComponent,
		SldsDatatableComponent,
		SldsSobjectFieldComponent
	],
	providers: [
		SfdcService,
		SldsSpinnerService,
		SldsNotificationService
	]
})
export class SldsModule { }
