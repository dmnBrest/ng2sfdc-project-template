import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { APP_CONFIG, IAppConfig } from './../../demo.config';
import { SfdcService } from './../../../../services/sfdc.service';
import { SldsSpinnerService } from './../../../../slds/spinner/slds-spinner.service';
import { SldsNotificationService } from './../../../../slds/notification/slds-notification.service';
import * as _ from 'lodash';
import { SldsModalComponent } from './../../../../slds/modal/slds-modal.component'

@Component({
	selector: 'demo-accounts',
	templateUrl: './accounts.component.html'
})

export class AccountsComponent implements OnInit {

	@ViewChild('editAccountModal')
	private editAccountModal: SldsModalComponent;

	accounts: any[];
	accountToEdit: any;
	accountEditForm: NgForm;

	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		private sldsNotificationService: SldsNotificationService,
		@Inject(APP_CONFIG) private appConfig: IAppConfig
	) { }

	getAccounts(): void {
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
			console.error(err);
		});
	}

	accountEditFormInit(form: NgForm): void {
		this.accountEditForm = form;
	}

	editAccount(account: any): void {
		console.log('Edit account: ', account);
		this.accountToEdit = _.cloneDeep(account);
		this.editAccountModal.openModal();
	}

	deleteAccount(account: any): void {
		console.log('Delete account: ', account);
		alert('TODO');
	}

	saveAccount(account: any): void {
		console.log('Save account: ', account);
		this.getAccounts();
		this.accountToEdit = null;
		this.editAccountModal.closeModal();
	} 

	cancelAccountEditing(): void {
		console.log('Cancel account editing');
		this.accountToEdit = null;
		this.editAccountModal.closeModal();
	} 


	ngOnInit(): void {
		console.log('AccountsComponent init');
		this.getAccounts();
	}

}