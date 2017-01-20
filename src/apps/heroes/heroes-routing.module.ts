import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroDetailComponent } from './components/hero-details/hero-details.component';

const routes: Routes = [
	{ path: 'list', component: HeroesListComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'hero/:id', component: HeroDetailComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class HeroesRoutingModule {}