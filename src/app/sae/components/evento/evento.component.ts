import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Eventos } from 'src/app/sae/model/eventos.model';
import { EventoService } from 'src/app/sae/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {

  cols: any[] = [];
  eventos?: Eventos[];

  mostrarGuardar: boolean = true; // Mostrar el botón por defecto
  mostrarActualizar: boolean = true;

  formObraDialog: boolean;

  constructor(
    private eventoService: EventoService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.recuperaEventos();


    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'numero_ot', header: 'N° Ot' },
      { field: 'tipo_evento', header: 'Tipo Evento' },
      { field: 'rut_maestro', header: 'Maestro' },
      { field: 'rut_ayudante', header: 'Ayudante' },
      { field: 'turno', header: 'Turno' },
      { field: 'paquete', header: 'Oficina' },
      { field: 'requerimiento', header: 'Requerimiento' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'fecha_hora', header: 'Fecha Hora Ejecución' }
    ];

  }

  recuperaEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => {

        console.log("data eventos:", data);

        this.eventos = data

      }, error: (e) => console.error(e)
    });
  }



  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



}
