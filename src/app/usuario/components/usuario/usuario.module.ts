import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { EventoComponent } from './usuario.component';
import { EventoRoutingModule } from './usuario-routing.module';

import { PrimeNGModule } from 'src/app/_primeng/primeng.module';


@NgModule({
	imports: [
		CommonModule,
		EventoRoutingModule,
		PrimeNGModule
	],
	declarations: [EventoComponent]
})
export class EventoModule { }
