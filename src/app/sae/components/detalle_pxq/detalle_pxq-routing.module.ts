import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Detalle_pxqComponent } from './detalle_pxq.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: Detalle_pxqComponent }
	])],
	exports: [RouterModule]
})
export class Detalle_pxqRoutingModule { }
