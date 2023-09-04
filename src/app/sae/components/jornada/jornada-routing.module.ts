import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JornadaComponent } from './jornada.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: JornadaComponent }
	])],
	exports: [RouterModule]
})
export class JornadaRoutingModule { }
