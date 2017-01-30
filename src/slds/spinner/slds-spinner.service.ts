import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class SldsSpinnerService {

	level: number = 0;

	private showChangeSource = new Subject<boolean>();

	getShow():Observable<boolean> {
		return this.showChangeSource.asObservable();
	}

	showSpinner():void {
		if (this.level == 0) {
			this.showChangeSource.next(true);
		}
		this.level++;
	} 

	hideSpinner():void {
		this.level--;
		if (this.level == 0) {
			this.showChangeSource.next(false);
		}
	}

}