import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { DemoComponent }  from './demo.component';
import { SfdcService } from './../../services/sfdc.service';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule
	],
	declarations: [
		DemoComponent
	],
	providers: [
		SfdcService
	],
	bootstrap: [
		DemoComponent
	]
})

export class DemoModule { }
