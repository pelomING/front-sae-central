import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewEstadoResultadoComponent } from './newestadoresultado.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: NewEstadoResultadoComponent }
	])],
	exports: [RouterModule]
})
export class NewEstadoResultadoRoutingModule { }
