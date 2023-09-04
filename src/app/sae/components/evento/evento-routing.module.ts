import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EventoComponent } from './evento.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EventoComponent }
	])],
	exports: [RouterModule]
})
export class EventoRoutingModule { }
