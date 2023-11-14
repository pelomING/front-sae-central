import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Turnos } from 'src/app/sae/model/turnos.model';
import { TurnosService } from 'src/app/sae/services/turnos.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html'
})
export class JornadaComponent implements OnInit {

  cols: any[] = [];

  turnos?: Turnos[];

  mostrarGuardar: boolean = true; // Mostrar el botón por defecto
  mostrarActualizar: boolean = true;

  formObraDialog: boolean;

  constructor(private turnosService: TurnosService, 
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit(): void {

    this.recuperaJornadas();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'rut_maestro', header: 'Maestro' },
      { field: 'rut_ayudante', header: 'Ayudante' },
      { field: 'turno', header: 'Turno' },
      { field: 'patente', header: 'Patente' },
      { field: 'km_inicial', header: 'Km inicial' },
      { field: 'km_final', header: 'Km final' },
      { field: 'fecha_hora_ini', header: 'Fecha Hora Inicio' },
      { field: 'fecha_hora_fin', header: 'Fecha Hora Fin' }
    ];

  }

  recuperaJornadas(): void {
    this.turnosService.getJornada().subscribe({ next: (data) => { this.turnos = data }, error: (e) => console.error(e) });
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }


}
