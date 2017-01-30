import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';

export enum MessageType {
	ERROR, INFO, SUCCESS
}

export interface INotificationWrapper {
	message: string;
	type: MessageType;
}

@Injectable()
export class SldsNotificationService {

	private messagesSource = new Subject<INotificationWrapper>();
	public messagesObserver = this.messagesSource.asObservable();

	showError(message: string):void {
		this.messagesSource.next({message: message, type: MessageType.ERROR});
	} 

	showSuccess(message: string):void {
		this.messagesSource.next({message: message, type: MessageType.SUCCESS});
	} 

	showInfo(message: string):void {
		this.messagesSource.next({message: message, type: MessageType.INFO});
	} 


}