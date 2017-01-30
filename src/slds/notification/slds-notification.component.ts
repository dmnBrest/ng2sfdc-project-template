import { Component, OnInit, OnDestroy } from '@angular/core';
import { SldsNotificationService, MessageType, INotificationWrapper } from './slds-notification.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'slds-notifications',
	templateUrl: './slds-notification.component.html'
})
export class SldsNotificationComponent implements OnInit, OnDestroy {

	message: INotificationWrapper = null;
	private messagesSubscription: Subscription
	public MessageType = MessageType;

	constructor(
		private sldsNotificationsService: SldsNotificationService
	) {
		this.messagesSubscription = sldsNotificationsService.messagesObserver.subscribe(
			(m: INotificationWrapper) => {
				this.message = m;
			}
		);
	}

	clearNotifications(): void {
		this.message = null;
	}

	ngOnInit(): void {
		
	}

	ngOnDestroy() {
		this.messagesSubscription.unsubscribe();
	}


}
