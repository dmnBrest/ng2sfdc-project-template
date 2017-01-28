import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DemoComponent }  from './demo.component';
import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerComponent } from './../../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SldsDatatableComponent } from './../../slds/datatable/slds-datatable.component';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		DemoComponent,
		SldsSpinnerComponent,
		SldsDatatableComponent
	],
	providers: [
		SfdcService,
		SldsSpinnerService
	],
	bootstrap: [
		DemoComponent
	]
})

export class DemoModule { }
