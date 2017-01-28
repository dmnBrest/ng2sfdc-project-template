import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'demo-home',
	templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

	constructor() { }

	ngOnInit(): void {
		console.log('HomeComponent init');
	}

}