import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { HeroesComponent } from './heroes.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './components/hero-details/hero-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroService } from './services/hero.service';
import { SfdcService } from './../../services/sfdc.service';

import { HeroesRoutingModule }     from './heroes-routing.module';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		HeroesRoutingModule
	],
	declarations: [
		HeroesComponent,
		HeroesListComponent,
		HeroDetailComponent,
		DashboardComponent
	],
	providers: [
		HeroService,
		SfdcService
	],
	bootstrap: [ HeroesComponent ]
})

export class HeroesModule { }