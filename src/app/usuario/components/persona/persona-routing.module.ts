import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PersonaComponent } from './persona.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: PersonaComponent }
	])],
	exports: [RouterModule]
})
export class PersonaRoutingModule { }
