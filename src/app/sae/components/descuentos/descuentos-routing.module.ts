import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DescuentosComponent  } from './descuentos.component'

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DescuentosComponent }
	])],
	exports: [RouterModule]
})

export class DescuentosRoutingModule { }
