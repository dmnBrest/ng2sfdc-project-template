import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { APP_CONFIG, IAppConfig } from './../../demo.config';
import { SfdcService } from './../../../../services/sfdc.service';
import { SldsSpinnerService } from './../../../../slds/spinner/slds-spinner.service';
import { SldsNotificationService } from './../../../../slds/notification/slds-notification.service';
import * as _ from 'lodash';

import { SldsModalComponent } from './../../../../slds/modal/slds-modal.component'

@Component({
	selector: 'full-sobject',
	templateUrl: './full-object.component.html'
})

export class TestObjectComponent implements OnInit {

	@ViewChild('editRecordModal')
	private editRecordModal: SldsModalComponent;

	records: any[];
	recordToEdit: any;
	recordEditForm: NgForm;
	testObjectFields = [
		'Name', 
		'Account__c', 
		'Contact__c', 
		'Activation_Date__c', 
		'When__c', 
		'Email__c', 
		'Is_Active__c', 
		'Picklist__c', 
		'MultiPicklist__c', 
		'Number__c', 
		'Percent__c', 
		'Phone__c', 
		'Point__c', 
		'Textarea__c', 
		'Textarea_Long__c', 
		'Textarea_Rich__c', 
		'Total__c', 
		'Url__c'];

	constructor(
		private sfdcService: SfdcService,
		private sldsSpinnerService: SldsSpinnerService,
		private sldsNotificationService: SldsNotificationService,
		@Inject(APP_CONFIG) private appConfig: IAppConfig
	) { }

	getAccounts(): void {
		this.sldsSpinnerService.showSpinner();
		this.sfdcService.remoteAction('NG2DemoService', 'getRecords', {})
		.then((results) => {
			this.sldsSpinnerService.hideSpinner();
			console.log('Results:');
			console.log(results);
			this.records = results.data.records;
		})
		.catch((err) => {
			this.sldsSpinnerService.hideSpinner();
			console.error(err);
		});
	}

	recordEditFormInit(form: NgForm): void {
		this.recordEditForm = form;
	}

	editRecord(record: any): void {
		console.log('Edit record: ', record);
		this.recordToEdit = _.cloneDeep(record);
		this.editRecordModal.openModal();
	}

	deleteAccount(record: any): void {
		console.log('Delete record: ', record);
		alert('TODO');
	}

	saveAccount(account: any): void {
		console.log('Save record: ', account);
		this.getAccounts();
		this.recordToEdit = null;
		this.editRecordModal.closeModal();
	} 

	cancelAccountEditing(): void {
		this.recordToEdit = null;
		this.editRecordModal.closeModal();
	} 


	ngOnInit(): void {
		console.log('TestObjectComponent init');
		this.getAccounts();
	}

}