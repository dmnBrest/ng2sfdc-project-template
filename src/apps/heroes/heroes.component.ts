import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
	<h1>{{title}}</h1>
	<a routerLink="/dashboard">Dashboard</a>
	<a routerLink="/list">Heroes</a>
	<router-outlet></router-outlet>
	`,
	styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
	title = 'Tour of Heroes';
}