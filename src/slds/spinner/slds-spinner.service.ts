import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class SldsSpinnerService {

	level: number = 0;

	private showChangeSubject = new Subject<boolean>();
	showChange$ = this.showChangeSubject.asObservable();

	getShow():Observable<boolean> {
		return this.showChangeSubject.asObservable();
	}

	showSpinner():void {
		if (this.level == 0) {
			this.showChangeSubject.next(true);
		}
		this.level++;
	} 

	hideSpinner():void {
		this.level--;
		if (this.level == 0) {
			this.showChangeSubject.next(false);
		}
	}

}