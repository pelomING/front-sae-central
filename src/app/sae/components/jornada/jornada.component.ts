import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Turnos } from 'src/app/sae/model/turnos.model';
import { TurnosService } from 'src/app/sae/services/turnos.service';


//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style'; 
import * as XLSX from 'xlsx-js-style';


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
      { field: 'nombre_maestro', header: 'Maestro' },
      { field: 'nombre_ayudante', header: 'Ayudante' },
      { field: 'turno', header: 'Turno' },
      { field: 'patente', header: 'Patente' },
      { field: 'km_inicial', header: 'Km inicial' },
      { field: 'km_final', header: 'Km final' },
      { field: 'fecha_hora_ini', header: 'Fecha Hora Inicio' },
      { field: 'fecha_hora_fin', header: 'Fecha Hora Fin' }
    ];

  }

  recuperaJornadas(): void {
    this.turnosService.getJornada().subscribe({ 
      next: (data) => { 
      
        console.log("data:", data);
      
        this.turnos = data 
      
      }, error: (e) => console.error(e) });
  }



  exportToExcel1(): void {

    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      // Encabezados con estilos
      [
        { v: "Id", t: 's', s: this.headerStyle },
        { v: "nombre_maestro", t: 's', s: this.headerStyle },
        { v: "nombre_ayudante", t: 's', s: this.headerStyle },
        { v: "brigada", t: 's', s: this.headerStyle },
        { v: "tipo_turno", t: 's', s: this.headerStyle },
        { v: "patente", t: 's', s: this.headerStyle },
        { v: "km_inicial", t: 's', s: this.headerStyle },
        { v: "km_final", t: 's', s: this.headerStyle },
        { v: "fecha_hora_ini", t: 's', s: this.headerStyle },
        { v: "fecha_hora_fin", t: 's', s: this.headerStyle }
      ],
      // Datos
      ...this.turnos.map(item => [
        item.id,
        item.nombre_maestro,
        item.nombre_ayudante,
        item.brigada,
        item.tipo_turno,
        item.patente,
        item.km_inicial,
        item.km_final,
        item.fecha_hora_ini,
        item.fecha_hora_fin
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
