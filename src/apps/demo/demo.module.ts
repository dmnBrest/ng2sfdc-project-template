import { NgModule, ErrorHandler, Injector, Injectable, OpaqueToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent }  from './demo.component';
import { HomeComponent }  from './components/home/home.component';
import { AccountsComponent }  from './components/accounts/accounts.component';

import { IAppConfig, APP_CONFIG, CONFIG } from './demo.config';

import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerComponent } from './../../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SldsNotificationComponent } from './../../slds/notification/slds-notification.component';
import { SldsNotificationService } from './../../slds/notification/slds-notification.service';
import { SldsDatatableComponent } from './../../slds/datatable/slds-datatable.component';

const ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'accounts', component: AccountsComponent },	
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

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

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, { useHash: true }) 
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
		{provide: ErrorHandler, useClass: MyErrorHandler},
		{provide: APP_CONFIG, useValue: CONFIG }
	],
	bootstrap: [
		DemoComponent
	]
})
export class DemoModule { }
