import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

declare var Visualforce: {
	remoting: any
};

@Injectable()
export class SfdcService {

	constructor (private http: Http) {}

	public remoteAction(service: string, method: string, data: any): Promise<any> {

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
				.then(this.extractData)
		}
	}

	private extractData(res: Response) {	
		return res.json();
	}
}