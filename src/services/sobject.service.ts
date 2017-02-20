import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { SfdcService } from './sfdc.service'; 

export class Filters {
	equals(field: string, value: string | number | boolean): any {
		return {field: field, operator: 'equals', value: value};
	}
	notEquals(field: string, value: string | number | boolean): any {
		return {field: field, operator: 'notEquals', value: value};
	}
	in(field: string, value: string[] | number[]): any {
		return {field: field, operator: 'in', value: value};
	}
	like(field: string, value: string): any {
		return {field: field, operator: 'like', value: value};
	}
	
}

export interface Order {
	field: string,
	order: 'ASC' | 'DESC'
}

@Injectable()
export class SObjectService {

	constructor (
		private sfdcService: SfdcService
	) {}

	getRecords(objectType: string, fields: string[], filters: Filters[], order: Order, limit: number): Promise<any> {
		return new Promise((resolve, reject) => {
			

		});
	}



}