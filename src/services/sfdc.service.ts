import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class SfdcService {

	private localRequestsProxy: string = '/remoteaction/exec';

	constructor (private http: Http) {}

	public remoteAction(service: string, method: string, data: any): Promise<any> {
		let outData: any = {data: 'doom'};

		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: headers });

		return this.http.post(this.localRequestsProxy, outData, options)
		.toPromise()
		.then(this.extractData)
	}

	private extractData(res: Response) {
		return res.text() || { };
	}
}