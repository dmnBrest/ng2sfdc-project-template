import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../../models/hero'

@Component({
	selector: 'my-hero-detail',
	templateUrl: './hero-details.component.html',
	styleUrls: ['./hero-details.component.css']
})
export class HeroDetailComponent implements OnInit {

	constructor(
		private heroService: HeroService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
		this.route.params
			.switchMap((params: Params) => this.heroService.getHero(+params['id']))
			.subscribe(hero => this.hero = hero);
	}

	goBack(): void {
		this.location.back();
		throw new RangeError('DOOM!!!');
	}

	@Input()
	hero: Hero;
}