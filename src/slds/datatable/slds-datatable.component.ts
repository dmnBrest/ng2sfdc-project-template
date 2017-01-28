import { Component, OnInit, OnDestroy, Input, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'slds-datatable',
	templateUrl: './slds-datatable.component.html'
	//styleUrls: ['./heroes-list.component.css']
})
export class SldsDatatableComponent implements OnInit, OnDestroy {
	@ContentChild('actions') actionsTemplate: TemplateRef<any>;


	@Input() items: any[];

	constructor() {
		
	}

	ngOnInit(): void {
		
	}

	ngOnDestroy() {
		
	}


}
