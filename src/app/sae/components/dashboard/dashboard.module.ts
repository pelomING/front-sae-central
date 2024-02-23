import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from 'src/app/_primeng/primeng.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
	imports: [
		CommonModule,
		DashboardRoutingModule,
		PrimeNGModule
	],
	declarations: [DashboardComponent]
})

export class DashboardModule { }
