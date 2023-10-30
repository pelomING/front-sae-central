import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadoResultadoComponent } from './estadoresultado.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: EstadoResultadoComponent }
	])],
	exports: [RouterModule]
})
export class EstadoResultadoRoutingModule { }
