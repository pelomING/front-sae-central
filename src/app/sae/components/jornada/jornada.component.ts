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
  turnoCopia?: Turnos;

  mostrarGuardar: boolean = true; // Mostrar el botón por defecto
  mostrarActualizar: boolean = true;

  formObraDialog: boolean;

  TurnosForm: FormGroup;

  constructor(private turnosService: TurnosService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

      this.TurnosForm = this.fb.group({
        id: [''],
        fecha_hora_ini: ['', Validators.required],
        fecha_hora_fin: ['', Validators.required]
      });

     }

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
        this.turnos = data;
        this.turnos.sort((a, b) => b.id - a.id); 
      }, error: (e) => console.error(e) });
  }



  
  turnoDialog = false;
  IDTURNO = null;

  editTurno(turno: Turnos) {

    console.log("edit", turno);

    this.turnoCopia = { ...turno };

    this.IDTURNO = this.turnoCopia.id;

    this.TurnosForm.reset();

    this.mostrarGuardar = false;
    this.mostrarActualizar = true;


    let fechagringa = new Date();

    console.log("fechagringa", fechagringa);



    let fechaParseada = new Date(this.turnoCopia.fecha_hora_ini);
    let dia = fechaParseada.getDate().toString().padStart(2, '0');
    let mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    let año = fechaParseada.getFullYear();
    let hh = fechaParseada.getHours().toString();
    let mm = fechaParseada.getMinutes().toString();
    let fechaFormateada = `${dia}-${mes}-${año} ${hh}:${mm}`;

    this.turnoCopia.fecha_hora_ini = fechaFormateada;

    fechaParseada = new Date(this.turnoCopia.fecha_hora_fin);
    dia = fechaParseada.getDate().toString().padStart(2, '0');
    mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    año = fechaParseada.getFullYear();
    hh = fechaParseada.getHours().toString();
    mm = fechaParseada.getMinutes().toString();
    fechaFormateada = `${dia}-${mes}-${año} ${hh}:${mm}`;

    this.turnoCopia.fecha_hora_fin = fechaFormateada;

    console.log("this.turnoCopia", this.turnoCopia);

    this.TurnosForm.patchValue(this.turnoCopia);

    this.turnoDialog = true;

  }




  filtrarFecha(fechaString: string) 
  {

    // Formatea la fecha en el formato deseado
    // 2023-12-01 17:21:00
    let arrayFechaHora = fechaString.split(" ");
    
    let arrayFecha = arrayFechaHora[0].split("-");
    
    let arrayHora = arrayFechaHora[1].split(":");
      
    return `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}:${arrayHora[2]}`;

  }



  loading: boolean = false;

  onGuardarClick() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);


    // if (this.HoraExtraForm.valid) {

    //   const nueva = this.HoraExtraForm.value;

    //   //console.log('Nueva:', nueva);

    //   let nuevaCopia = { ...nueva };

    //   nuevaCopia.fecha_hora = this.formateoFecha(nuevaCopia.fecha_hora);

    //   //console.log('Nueva Formato Fecha :', nuevaCopia);

    //   this.estadoResultadoService.createHoraExtra(nuevaCopia).subscribe(
    //     (response) => {

    //       // Manejar la respuesta exitosa
    //       console.log('Obra guardada con éxito:', response);

    //       this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

    //       this.productDialog = false;

    //       this.estadoResultadoService.horaextranoprocesados().subscribe({
    //         next: (data) => {
    //           console.log("data", data);
    //           this.ListHorasExtra = data.detalle;
    //           this.ListHorasExtra.sort((a, b) => b.id - a.id);
    //         }, error: (e) => console.error(e)
    //       });

    //     },
    //     (error) => {

    //       // Manejar errores
    //       console.error('Error al guardar la obra:', error);

    //       this.messageService.add({
    //         severity: 'error',
    //         summary: 'Error',
    //         detail: 'Por favor, intentar mas tarde problemas de servicio',
    //       });

    //     }
    //   );

    // } else {

    //   // El formulario es inválido, muestra errores si es necesario
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: 'Error',
    //     detail: 'Por favor, completa el formulario correctamente',
    //   });

    // }
  }



  formateoFecha(fechaOriginal: string): string {

    const fechaParseada = new Date(fechaOriginal);

    const dia = fechaParseada.getDate().toString().padStart(2, '0');
    const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaParseada.getFullYear();

    const hh = fechaParseada.getHours().toString();
    const mm = fechaParseada.getMinutes().toString();

    const fechaFormateada = `${año}-${mes}-${dia} ${hh}:${mm}`;

    console.log("fechaFormateada", fechaFormateada);

    return fechaFormateada;
  
  }



  onActualizarClick() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);


    if (this.TurnosForm.valid) {

       const ObjetUpdated = this.TurnosForm.value; // Obtén los datos del formulario
       console.log("ObjetUpdated", ObjetUpdated);
       let ObjetUpdatedCopia = { ...ObjetUpdated };

      if (typeof ObjetUpdatedCopia.fecha_hora_ini === 'string') {

        // El campo es de tipo texto (string)
        console.log('Es una cadena de texto');
        let arrayFechaHora = ObjetUpdatedCopia.fecha_hora_ini.split(" ");
        let arrayFecha = arrayFechaHora[0].split("-");
        let arrayHora = arrayFechaHora[1].split(":");
        // Formatea la fecha en el formato deseado
        ObjetUpdatedCopia.fecha_hora_ini = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;

        // Puedes realizar operaciones específicas para cadenas de texto si es necesario
      } else if (ObjetUpdatedCopia.fecha_hora_ini instanceof Date) {

        // El campo es de tipo Date
        console.log('Es un objeto Date');
        ObjetUpdatedCopia.fecha_hora_ini = this.formateoFecha(ObjetUpdatedCopia.fecha_hora_ini);
 
      }


      if (typeof ObjetUpdatedCopia.fecha_hora_fin === 'string') {

        // El campo es de tipo texto (string)
        console.log('Es una cadena de texto');
        let arrayFechaHora = ObjetUpdatedCopia.fecha_hora_fin.split(" ");
        let arrayFecha = arrayFechaHora[0].split("-");
        let arrayHora = arrayFechaHora[1].split(":");
        // Formatea la fecha en el formato deseado
        ObjetUpdatedCopia.fecha_hora_fin = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;

        // Puedes realizar operaciones específicas para cadenas de texto si es necesario
      } else if (ObjetUpdatedCopia.fecha_hora_fin instanceof Date) {

        // El campo es de tipo Date
        console.log('Es un objeto Date');
        ObjetUpdatedCopia.fecha_hora_fin = this.formateoFecha(ObjetUpdatedCopia.fecha_hora_fin);
        
      }

       console.log("ObjetUpdatedCopia", ObjetUpdatedCopia);

      // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
      this.turnosService.updateJornada(ObjetUpdatedCopia).subscribe(
        (response) => {

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

          this.turnoDialog = false;

          this.recuperaJornadas();

        },
        (error) => {
          // Manejar errores, por ejemplo, mostrar un mensaje de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo actualizar el registro. Inténtelo de nuevo.',
          });
        }
      );
     
    }

  }



  exportToExcel1(): void {

    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      // Encabezados con estilos
      [
        { v: "Id", t: 's', s: this.headerStyle },
        { v: "nombre_maestro", t: 's', s: this.headerStyle },
        { v: "nombre_ayudante", t: 's', s: this.headerStyle },
        { v: "turno", t: 's', s: this.headerStyle },
        { v: "tipo_turno", t: 's', s: this.headerStyle },
        { v: "patente", t: 's', s: this.headerStyle },
        { v: "km_inicial", t: 's', s: this.headerStyle },
        { v: "km_final", t: 's', s: this.headerStyle },
        { v: "fecha_hora_ini", t: 's', s: this.headerStyle },
        { v: "fecha_hora_fin", t: 's', s: this.headerStyle },
        { v: "coordenadas.latitude", t: 's', s: this.headerStyle },
        { v: "coordenadas.longitude", t: 's', s: this.headerStyle }
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
        item.fecha_hora_fin,
        item.coordenadas.latitude,
        item.coordenadas.longitude
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

    const nombreArchivo = `listado_de_turnos-${fechatotal}.xlsx`;

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
