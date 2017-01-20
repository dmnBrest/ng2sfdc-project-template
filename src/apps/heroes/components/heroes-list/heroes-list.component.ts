import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';
import { Router } from '@angular/router';

@Component({
	selector: 'heroes-list',
	templateUrl: './heroes-list.component.html',
	styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

	heroes: Hero[];
	selectedHero: Hero;

	constructor(
		private router: Router,
		private heroService: HeroService
	) {}

	ngOnInit(): void {
		this.getHeroes();
	}

	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}

	gotoDetail(): void {
		this.router.navigate(['/hero', this.selectedHero.id]);
	}

	getHeroes(): void {
		this.heroService.getHeroes().then(
			heroes => this.heroes = heroes
		);
	}
}











