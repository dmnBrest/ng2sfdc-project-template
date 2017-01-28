import { Component, OnInit } from '@angular/core';
import { SfdcService } from './../../services/sfdc.service';
import { SldsSpinnerService } from './../../slds/spinner/slds-spinner.service';


@Component({
selector: 'ng2-app',
	templateUrl: './demo.component.html' 
})

export class DemoComponent implements OnInit {

	accounts: any[];

	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService
	) {}

	app = {
		name: 'Demo1',
		description: 'NG2-SFDC Package Demo Appication'
	};

	ngOnInit(): void {
		
	}
	
	callRemoteService(): void {
		this.sldsSpinnerService.showSpinner();
		this.sfdcService.remoteAction('NG2DemoService', 'getAccounts', {param1: 'test param1'})
		.then((results) => {
			this.sldsSpinnerService.hideSpinner();
			console.log('Results:');
			console.log(results);
			this.accounts = results.data.accounts;
		})
		.catch((err) => {
			this.sldsSpinnerService.hideSpinner();
			console.error(err)
		});
	}

	editAccount(account: any): void {
		console.log('Edit account: ', account);
	}

	deleteAccount(account: any): void {
		console.log('Delete account: ', account);
	}

}
