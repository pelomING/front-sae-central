import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Eventos } from 'src/app/sae/model/eventos.model';
import { EventoService } from 'src/app/sae/services/evento.service';


//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style'; 
import * as XLSX from 'xlsx-js-style';


//conecta a desarrollo 


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
      
      { field: 'despachador', header: 'Despachador' },

      { field: 'numero_ot', header: 'N° Ot' },
      { field: 'tipo_evento', header: 'Tipo Evento' },
      { field: 'rut_maestro', header: 'Maestro' },
      { field: 'rut_ayudante', header: 'Ayudante' },
      
      { field: 'brigada', header: 'Brigada' },
      { field: 'tipo_turno', header: 'Tipo Turno' },

      { field: 'requerimiento', header: 'Requerimiento' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'comuna', header: 'Comuna' },
      
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



  exportToExcel1(): void {

    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      // Encabezados con estilos
      [
        { v: "Id", t: 's', s: this.headerStyle },
        { v: "despachador", t: 's', s: this.headerStyle },
        { v: "numero_ot", t: 's', s: this.headerStyle },
        { v: "tipo_evento", t: 's', s: this.headerStyle },
        { v: "rut_maestro", t: 's', s: this.headerStyle },
        { v: "rut_ayudante", t: 's', s: this.headerStyle },
        { v: "brigada", t: 's', s: this.headerStyle },
        { v: "tipo_turno", t: 's', s: this.headerStyle },
        { v: "requerimiento", t: 's', s: this.headerStyle },
        { v: "direccion", t: 's', s: this.headerStyle },
        { v: "comuna", t: 's', s: this.headerStyle },
        { v: "fecha_hora", t: 's', s: this.headerStyle },
      ],
      // Datos
      ...this.eventos.map(item => [
        item.id,
        item.despachador,
        item.numero_ot,
        item.tipo_evento,
        item.rut_maestro,
        item.rut_ayudante,
        item.brigada,
        item.tipo_turno,
        item.requerimiento,
        item.direccion,
        item.comuna,
        item.fecha_hora
      ])
    ]);

    // Crear libro de trabajo
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

    // Obtener las letras de las columnas
    // const range = XLSX.utils.decode_range(ws["!ref"]);

    // for (let col = range.s.c; col <= range.e.c; col++) {
    //   const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });

    //   // Establecer el ancho de la columna (en este caso, 15 unidades)
    //   ws['!cols'] = [{ wch: 25 }];

    //   ws[cellAddress].t = 's'; // Establece el tipo de celda como texto
    //   ws[cellAddress].s = this.headerStyle;
    // }

    // Convertir a array buffer
    const arrayBuffer: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Crear objeto Blob y descargar
    const blob: Blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });


    const fecha = new Date();
    const fechatotal =
      fecha.getDate() +
      '-' +
      (fecha.getMonth() + 1) +
      '-' +
      fecha.getFullYear() +
      '_' +
      fecha.getHours() +
      '-' +
      fecha.getMinutes() +
      '-' +
      fecha.getSeconds();

    const nombreArchivo = `listado_de_eventos-${fechatotal}.xlsx`;

    saveAs(blob, nombreArchivo);

  }

  // Establecer el estilo de los encabezados
  private headerStyle = {
    fill: { fgColor: { rgb: "87CEEB" } }, // Fondo celeste opaco
    font: { color: { rgb: "000000" }, bold: true }, // Texto negro y negrita
    alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
  };


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



}
