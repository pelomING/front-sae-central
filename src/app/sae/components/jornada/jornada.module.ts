import { NgModule } from '@angular/core';
import { PrimeNGModule } from '../../../_primeng/primeng.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JornadaComponent } from './jornada.component';
import { JornadaRoutingModule } from './jornada-routing.module';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';

@NgModule({
	imports: [
		CommonModule,
		PrimeNGModule,
		JornadaRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		SliderModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule
	],
	declarations: [JornadaComponent]
})
export class JornadaModule { }
