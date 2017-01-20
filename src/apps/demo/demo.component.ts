import { Component } from '@angular/core';

@Component({
selector: 'my-app',
	template: `
		<div class="slds">
			<h1>Welcome to {{app.name}}</h1>
			<h2>Description: {{app.description}}</h2>
		</div>
	`
})

export class DemoComponent {
	app = {
		name: 'Demo',
		description: 'NG2-SFDC Package Demo Appication'
	};
}
