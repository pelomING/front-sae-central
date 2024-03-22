import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Turnos } from 'src/app/sae/models/turnos.model';
import { TurnosService } from 'src/app/sae/services/turnos.service';

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';



//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style'; 
import * as XLSX from 'xlsx-js-style';
import { GeolocationService } from '../../services/geolocation.service';


interface InterfaceBrigada {
  id: Number;
  brigada: string;
}

interface InterfaceTipoTurno {
  id: Number;
  nombre: string;
}

interface InterfaceAyudantes {
  rut: string;
  nombre: string;
}

interface InterfaceMaestro {
  rut: string;
  nombre: string;
}

interface InterfaceCamioneta {
  id: Number;
  patente: string;
}


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


  lista_objs_brigadas: InterfaceBrigada[] | undefined;

  lista_objs_tipoTurno: InterfaceTipoTurno[] | undefined;

  lista_objs_ayudantes: InterfaceAyudantes[] | undefined;

  lista_objs_maestros: InterfaceMaestro[] | undefined;

  lista_objs_camionetas: InterfaceCamioneta[] | undefined;
  
  alertController: any;


  latitude: string;
  longitude: string;



  constructor(
    private turnosService: TurnosService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private estadoResultadoService: EstadoResultadoService,
    private geolocationService: GeolocationService,
    private confirmationService: ConfirmationService) {

    this.TurnosForm = this.fb.group({
      id: [''],
      fecha_hora_ini: ['', Validators.required],
      fecha_hora_fin: ['', Validators.required],
      obj_brigada: ['', Validators.required],
      obj_tipo_turno: ['', Validators.required],
      obj_maestro: ['', Validators.required],
      obj_ayudante: ['', Validators.required],
      obj_camionetas: ['', Validators.required],
      km_inicial: ['', Validators.required],
      km_final: ['', [Validators.required, this.validarKmFinal.bind(this)]],
    });


    // Suscribirse a cambios en km_final
    this.TurnosForm.get('km_final').valueChanges.subscribe(() => {
      this.validarYMostrarAlerta();
    });


  }


  kmFinalInvalido: boolean = false;


  validarKmFinal(control: AbstractControl): { [key: string]: boolean } | null {

    // Verifica si el formulario está inicializado
    if (!this.TurnosForm) {
      return null;
    }

    const kmInicia = this.TurnosForm.get('km_inicial').value;

    const kmFinal = control.value;

    if (kmFinal !== null && kmFinal !== undefined && kmFinal <= 0) {
      console.log('kmFinalNoMayorACero');
      return { 'kmFinalNoMayorACero': true };
    }

    if (kmInicia !== null && kmFinal !== null && kmFinal <= kmInicia) {
      console.log('kmFinalNoMayorAInicia');
      return { 'kmFinalNoMayorAInicia': true };
    }

    return null;
  }



  async validarYMostrarAlerta() {

    const kmFinal = this.TurnosForm.get('km_final').value;

    const kmInicia = this.TurnosForm.get('km_inicial').value;


    if (kmFinal !== null && kmFinal !== undefined && kmFinal <= 0) {

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor, ingrese un valor mayor a cero',
            life: 5000
          });

    }

    if (kmInicia !== null && kmFinal !== null && kmFinal <= kmInicia) {

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor, ingrese un valor mayor a km inicial',
            life: 5000
          });

    }

  }




  ngOnInit(): void {

    this.recuperaJornadas();

    this.getLocation();

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


    this.estadoResultadoService.listabrigadassae().subscribe({
      next: (data) => {
        this.lista_objs_brigadas = data.map((brigada: any) => {
          return {
            id: brigada.id,
            brigada: brigada.brigada
          }
        })
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.listaTipodeturno().subscribe({
      next: (data) => {
        this.lista_objs_tipoTurno = data.map((turno: any) => {
          return {
            id: turno.id,
            nombre: turno.nombre
          }
        })
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.listaAyudantes().subscribe({
      next: (data) => {
        this.lista_objs_ayudantes = data.map((ayudante: any) => {
          return {
            rut: ayudante.rut,
            nombre: ayudante.nombre
          }
        })
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.listaMaestros().subscribe({
      next: (data) => {
        this.lista_objs_maestros = data.map((maestro: any) => {
          return {
            rut: maestro.rut,
            nombre: maestro.nombre
          }
        })
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.listaCamionetas().subscribe({
      next: (data) => {
        this.lista_objs_camionetas = data.map((camioneta: any) => {
          return {
            id: camioneta.id,
            patente: camioneta.patente
          }
        })
      }, error: (e) => console.error(e)
    });

  }



  getLocation(): void {
    this.geolocationService.getPosition().subscribe(
      (position: GeolocationPosition) => {
 
        this.latitude = position.coords.latitude.toString();
        this.longitude = position.coords.longitude.toString();
        
      },
      (error: any) => {
        console.error(error);
      }
    );
  }


  recuperaJornadas(): void {
    this.turnosService.getJornada().subscribe({
      next: (data) => {
        console.log("data:", data);
        this.turnos = data;
        this.turnos.sort((a, b) => b.id - a.id);
      }, error: (e) => console.error(e)
    });
  }


  turnoDialog = false;
  IDTURNO = null;

  titulo_formulario = ''

  openNew() {

    this.IDTURNO = '';
    this.titulo_formulario = 'INGRESAR TURNO';
    this.mostrarGuardar = true;
    this.mostrarActualizar = false;
    this.TurnosForm.reset();
    this.turnoDialog = true;

  }






  editTurno(turno: Turnos) {


    console.log("editTurno", turno);



    this.titulo_formulario = 'EDITAR TURNO';


    this.turnoCopia = { ...turno };

    this.IDTURNO = 'Id Registro : ' + this.turnoCopia.id;

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

    this.turnoCopia.obj_maestro = { rut: this.turnoCopia.rut_maestro, nombre: this.turnoCopia.nombre_maestro };
    this.turnoCopia.obj_ayudante = { rut: this.turnoCopia.rut_ayudante, nombre: this.turnoCopia.nombre_ayudante };


    let result = this.lista_objs_tipoTurno.filter(obj => obj.nombre === this.turnoCopia.tipo_turno);
    if (result.length > 0) this.turnoCopia.obj_tipo_turno = { id: result[0].id, nombre: result[0].nombre };


    let result1 = this.lista_objs_brigadas.filter(obj => obj.brigada === this.turnoCopia.brigada);
    if (result1.length > 0) this.turnoCopia.obj_brigada = { id: result1[0].id, brigada: result1[0].brigada };


    let result2 = this.lista_objs_camionetas.filter(obj => obj.patente === this.turnoCopia.patente);
    if (result2.length > 0) this.turnoCopia.obj_camionetas = { id: result2[0].id, patente: result2[0].patente };


    this.TurnosForm.patchValue(this.turnoCopia);

    this.turnoDialog = true;

  }




  filtrarFecha(fechaString: string) {

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


    if (this.TurnosForm.valid) {

      const nueva = this.TurnosForm.value;

      let nuevaCopia = { ...nueva };

      nuevaCopia.fecha_hora_ini = this.formateoFecha(nuevaCopia.fecha_hora_ini);

      nuevaCopia.fecha_hora_fin = this.formateoFecha(nuevaCopia.fecha_hora_fin);

      const data: Turnos = {
        rut_maestro: nuevaCopia.obj_maestro.rut,
        rut_ayudante: nuevaCopia.obj_ayudante.rut,
        patente: nuevaCopia.obj_camionetas.patente,
        km_inicial: nuevaCopia.km_inicial,
        km_final: nuevaCopia.km_final,
        fecha_hora_ini: nuevaCopia.fecha_hora_ini,
        fecha_hora_fin: nuevaCopia.fecha_hora_fin,
        brigada: nuevaCopia.obj_brigada.id,
        tipo_turno: nuevaCopia.obj_tipo_turno.id,
        coordenada_x: this.latitude,
        coordenada_y: this.longitude,
      }

      this.turnosService.creaJornada(data).subscribe(
        (response) => {

          console.log('Respuesta:', response);

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

          this.turnoDialog = false;

          this.recuperaJornadas();

        },
        (error) => {

          // Manejar errores
          console.error('Error al guardar:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor, intentar mas tarde problemas de servicio al crear jornada :' + error,
            life: 3000
          });

        }
      );

    } else {

      // El formulario es inválido, muestra errores si es necesario
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Por favor, completa el formulario correctamente',
      });

    }
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

      ObjetUpdatedCopia.rut_maestro = ObjetUpdatedCopia.obj_maestro.rut;
      ObjetUpdatedCopia.rut_ayudante = ObjetUpdatedCopia.obj_ayudante.rut;
      ObjetUpdatedCopia.patente = ObjetUpdatedCopia.obj_camionetas.patente;
      ObjetUpdatedCopia.km_inicial = ObjetUpdatedCopia.km_inicial;
      ObjetUpdatedCopia.km_final = ObjetUpdatedCopia.km_final;
      ObjetUpdatedCopia.fecha_hora_ini = ObjetUpdatedCopia.fecha_hora_ini;
      ObjetUpdatedCopia.fecha_hora_fin = ObjetUpdatedCopia.fecha_hora_fin;
      ObjetUpdatedCopia.brigada = ObjetUpdatedCopia.obj_brigada.id;
      ObjetUpdatedCopia.tipo_turno = ObjetUpdatedCopia.obj_tipo_turno.id;
      
      console.log("ObjetUpdatedCopia", ObjetUpdatedCopia);

      // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
      this.turnosService.updateJornada(ObjetUpdatedCopia).subscribe(
        (response) => {

          console.log("response", response);

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




  onEliminarClick(turno: Turnos) {

    console.log("turno", turno);


    this.confirmationService.confirm({
      message: 'Estás seguro de que deseas eliminar ID : ' + turno.id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.turnosService.deleteJornada(turno).subscribe(
          (response) => {

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });

            this.recuperaJornadas();

          },
          (error) => {

            // Manejar errores
            console.error('Error :', error);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Por favor, intentar mas tarde problemas de servicio',
            });

          }
        );

      }
    });

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
