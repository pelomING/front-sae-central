import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Horas_extrasComponent } from './horas_extras.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Horas_extrasComponent }
	])],
	exports: [RouterModule]
})
export class Detalle_pxqRoutingModule { }
