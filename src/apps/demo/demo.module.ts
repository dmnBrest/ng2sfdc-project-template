import { NgModule, ErrorHandler, Injector, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent }  from './demo.component';
import { HomeComponent }  from './components/home/home.component';
import { AccountsComponent }  from './components/accounts/accounts.component';

import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerComponent } from './../../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SldsNotificationComponent } from './../../slds/notification/slds-notification.component';
import { SldsNotificationService } from './../../slds/notification/slds-notification.service';
import { SldsDatatableComponent } from './../../slds/datatable/slds-datatable.component';

@Injectable()
class MyErrorHandler implements ErrorHandler {

	constructor(
		private sldsNotificationService: SldsNotificationService
	) {

	}

	handleError(error:any) {
		if (error instanceof Error) {
			this.sldsNotificationService.showError(error.message);
		} else {
			this.sldsNotificationService.showError(error);
		}
		console.error(error);
	}
}	

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'accounts', component: AccountsComponent },	
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes, { useHash: true }) 
	],
	declarations: [
		DemoComponent,
		SldsSpinnerComponent,
		SldsNotificationComponent,
		SldsDatatableComponent,
		AccountsComponent,
		HomeComponent
	],
	providers: [
		SfdcService,
		SldsSpinnerService,
		SldsNotificationService,
		{provide: ErrorHandler, useClass: MyErrorHandler}
	],
	bootstrap: [
		DemoComponent
	]
})
export class DemoModule { }
