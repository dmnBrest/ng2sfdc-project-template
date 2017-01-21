import { Component, OnInit } from '@angular/core';
import { SfdcService } from './../../services/sfdc.service';

@Component({
selector: 'my-app',
	template: `
		<div class="slds">
			<h1>Welcome to {{app.name}}</h1>
			<h2>Description: {{app.description}}</h2>
			<div>
				<button (click)="callRemoteService()">Call SFDC</button>
			</div>
		</div>
	`
})

export class DemoComponent implements OnInit {

	constructor(
		private sfdcService: SfdcService
	) {}

	app = {
		name: 'Demo',	
		description: 'NG2-SFDC Package Demo Appication'
	};

	ngOnInit(): void {
		
	}
	
	callRemoteService(): void {

		console.log('>> CALL REMOTE !!!!');

		this.sfdcService.remoteAction('NG2DemoService', 'getAccounts', {param1: 'test param1'})
		.then((results) => {
			console.log('Results:');
			console.log(results);
		})
		.catch((err) => {
			console.error(err)
		});
	}
}
