import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent }  from './demo.component';
import { HomeComponent }  from './components/home/home.component';
import { AccountsComponent }  from './components/accounts/accounts.component';

import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerComponent } from './../../slds/spinner/slds-spinner.component';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';
import { SldsDatatableComponent } from './../../slds/datatable/slds-datatable.component';

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
		SldsDatatableComponent,
		AccountsComponent,
		HomeComponent
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
