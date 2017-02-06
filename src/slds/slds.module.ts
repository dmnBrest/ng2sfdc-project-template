import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SLDS_CONFIG, CONFIG } from './slds.config';
import { SfdcService } from './../services/sfdc.service';
import { SldsSpinnerComponent } from './../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../slds/spinner/slds-spinner.service';
import { SldsNotificationComponent } from './../slds/notification/slds-notification.component';
import { SldsNotificationService } from './../slds/notification/slds-notification.service';
import { SldsDatatableComponent } from './../slds/datatable/slds-datatable.component';
import { SldsSobjectFieldComponent } from './../slds/sobject-field/slds-sobject-field.component';
import { SldsModalComponent } from './../slds/modal/slds-modal.component';
import { SldsFormComponent } from './../slds/form/slds-form.component';

import { MomentPipe } from './../misc/datetime/moment.pipe'


@NgModule({
	imports: [
		BrowserModule,
		FormsModule
	],	
	declarations: [
		SldsSpinnerComponent,
		SldsNotificationComponent,
		SldsDatatableComponent,
		SldsSobjectFieldComponent,
		MomentPipe, 
		SldsModalComponent,
		SldsFormComponent
	],
	exports: [
		SldsSpinnerComponent,
		SldsNotificationComponent,
		SldsDatatableComponent,
		SldsSobjectFieldComponent, 
		MomentPipe, 
		SldsModalComponent,
		SldsFormComponent
	],
	providers: [
		SfdcService,
		SldsSpinnerService,
		SldsNotificationService,
		{provide: SLDS_CONFIG, useValue: CONFIG }
	]
})
export class SldsModule { }
