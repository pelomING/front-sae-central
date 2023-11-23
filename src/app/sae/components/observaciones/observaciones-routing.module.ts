import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ObservacionesComponent } from './observaciones.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ObservacionesComponent }
	])],
	exports: [RouterModule]
})
export class ObservacionesRoutingModule { }
