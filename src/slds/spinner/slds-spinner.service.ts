import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class SldsSpinnerService {

	level: number = 0;

	private showChangeStream = new Subject<boolean>();

	getShow():Observable<boolean> {
		return this.showChangeStream.asObservable();
	}

	showSpinner():void {
		if (this.level == 0) {
			this.showChangeStream.next(true);
		}
		this.level++;
	} 

	hideSpinner():void {
		this.level--;
		if (this.level == 0) {
			this.showChangeStream.next(false);
		}
	}

}