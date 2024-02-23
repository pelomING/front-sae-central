import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from 'src/app/_primeng/primeng.module';
import { DescuentosComponent } from './descuentos.component';
import { DescuentosRoutingModule } from './descuentos-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DescuentosRoutingModule,
		PrimeNGModule
	],
	declarations: [DescuentosComponent]
})

export class DescuentosModule { }
