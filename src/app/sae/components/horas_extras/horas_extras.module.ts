import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Horas_extrasComponent } from './horas_extras.component';
import { Detalle_pxqRoutingModule } from './horas_extras-routing.module';

import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { CalendarModule } from 'primeng/calendar';
import { PrimeNGModule } from 'src/app/_primeng/primeng.module';



@NgModule({
	imports: [
		CommonModule,
		Detalle_pxqRoutingModule,
		FormsModule,
		TableModule,
		RatingModule,
		ButtonModule,
		InputTextModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
        ToolbarModule,
        DialogModule,
        RadioButtonModule,
        InputNumberModule,
        InputTextareaModule,
        FileUploadModule,
        MessageModule,
        MessagesModule,
		CalendarModule,
		PrimeNGModule
	],
	declarations: [Horas_extrasComponent]
})

export class Horas_extrasModule { }
