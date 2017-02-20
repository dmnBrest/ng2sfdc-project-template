import { NgModule, ErrorHandler, Injector, Injectable, OpaqueToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DemoComponent }  from './demo.component';
import { HomeComponent }  from './components/home/home.component';
import { AccountsComponent }  from './components/accounts/accounts.component';
import { TestObjectComponent }  from './components/full-object/full-object.component';

import { APP_CONFIG, CONFIG } from './demo.config';

import { SfdcService } from './../../services/sfdc.service';
// import { SldsSpinnerComponent } from './../../slds/spinner/slds-spinner.component';
// import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
// import { SldsNotificationComponent } from './../../slds/notification/slds-notification.component';
import { SldsNotificationService } from './../../slds/notification/slds-notification.service';
// import { SldsDatatableComponent } from './../../slds/datatable/slds-datatable.component';

import { SldsModule } from './../../slds/slds.module';

const ROUTES: Routes = [
	{ path: 'home', component: HomeComponent },
	{ path: 'accounts', component: AccountsComponent },	
	{ path: 'full', component: TestObjectComponent },	
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@Injectable()
class MyErrorHandler implements ErrorHandler {

	constructor(
		private sldsNotificationService: SldsNotificationService
	) {

	}

	handleError(error:any) {
		let errorMessage = 'error';
		if (error instanceof Error) {
			console.log('1');
			errorMessage = (<Error>error).message;
		} else {
			console.log('2');
			errorMessage = error;
		}
		// error filtering hook
		errorMessage = errorMessage.replace(/^Uncaught \(in promise\):/	, '');

		this.sldsNotificationService.showError(errorMessage);
		console.error(error);
	}
}	

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(ROUTES, { useHash: true }),
		FormsModule,
		SldsModule
	],
	declarations: [
		DemoComponent,
		AccountsComponent,
		HomeComponent,
		TestObjectComponent
	],
	providers: [
		SfdcService,
		{provide: ErrorHandler, useClass: MyErrorHandler},
		{provide: APP_CONFIG, useValue: CONFIG }
	],
	bootstrap: [
		DemoComponent
	]
})
export class DemoModule { }
