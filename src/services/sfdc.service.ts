import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

declare var Visualforce: {
	remoting: any
};

export interface ObjectMatadataInterface {
	name: string;
	label: string;
	fields: any[];
}

export interface RemoteActionResponseInterface {
	data?: any;
	error?: string;
	stack?: string;
}

@Injectable()
export class SfdcService {

	metadataCache: {[objectType:string]: ObjectMatadataInterface | Promise<ObjectMatadataInterface>}

	constructor (
		private http: Http
	) {
		this.metadataCache = {};
	}

	public remoteAction(service: string, method: string, data: any): Promise<RemoteActionResponseInterface> {

		let outData: any = {
			service: service,
			method: method,
			data: data
		};	

		if (window.hasOwnProperty('Visualforce') && Visualforce.remoting) {
			return new Promise((resolve, reject) => {
				Visualforce.remoting.Manager.invokeAction(
					'ng2.GatewayController.remoteActionStringHandler',
					JSON.stringify({payload: outData}),
					function(result:any, event:any) {
						if (event.type === 'exception') {
							console.log(event);
							reject(event.message);
						} else {
							result = JSON.parse(result);
							if (result.error) {
								reject(result);
							}
							resolve(result);
						}
					},
					{ buffer: true, escape: false, timeout: 120000 }
				);
			});
		} else {

			let headers = new Headers({ 'Content-Type': 'application/json' });
			let options = new RequestOptions({ headers: headers });

			return this.http.post('/remoteaction/exec', outData, options)
				.toPromise()
				.then(res => {
					return res.json();
				}).catch(err => {
					console.log(err);
				});
		}
	}

	public initObjectsMetadata(objectTypes: string[]): Promise<any> {
		return new Promise((resolve, reject) => {
			let resolvers: any = {};
			
			for (let ot of objectTypes) {
				this.metadataCache[ot] = new Promise<ObjectMatadataInterface>((resolve, reject) => {
					resolvers[ot] = resolve;
				});
			}
			this.remoteAction('NG2DemoService', 'getObjectsMetadata', {objectTypes: objectTypes})
			.then(res => {
				if (res.data && res.data.meta) {
					for (let ot of objectTypes) {
						resolvers[ot](res.data.meta[ot]);
					}
					Object.assign(this.metadataCache, res.data.meta);
					resolve(true);
				} else {
					reject(res);
				}
			});
		});
	}

	public getObjectMetadata(objectType: string): Promise<ObjectMatadataInterface> {
		if (this.metadataCache[objectType] && this.metadataCache[objectType] instanceof Promise) {
			return this.metadataCache[objectType] as Promise<ObjectMatadataInterface>;
		} else if (this.metadataCache[objectType]) {
			return new Promise<ObjectMatadataInterface>((resolve, reject) => {
				resolve(this.metadataCache[objectType]);
			});
		} else {
			let p = new Promise<ObjectMatadataInterface>((resolve, reject) => {
				this.remoteAction('NG2DemoService', 'getObjectsMetadata', {objectTypes: [objectType]})
				.then(res => {
					if (res.data && res.data.meta) {
						Object.assign(this.metadataCache, res.data.meta);
						resolve(res.data.meta[objectType]);
					} else {
						reject(res);
					}
				});
			});
			this.metadataCache[objectType] = p;
			return p;
		}
		
	}

}