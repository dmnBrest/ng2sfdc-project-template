import { Component } from '@angular/core';

@Component({
	selector: 'ng2-app',
	template: `
	<h1>{{title}}</h1>
	<a routerLink="/dashboard" routerLinkActive="active-link">Dashboard</a>
	<a routerLink="/list" routerLinkActive="active-link">Heroes</a>
	<router-outlet></router-outlet>
	`,
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
	title = 'Tour of Heroes';
}