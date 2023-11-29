import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cobros_adicionalesComponent } from './cobros_adicionales.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Cobros_adicionalesComponent }
	])],
	exports: [RouterModule]
})

export class Cobros_adicionalesRoutingModule { }
