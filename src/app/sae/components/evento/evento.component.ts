import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Eventos } from 'src/app/sae/model/eventos.model';
import { EventoService } from 'src/app/sae/services/evento.service';


import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import * as L from 'leaflet';


//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style'; 
import * as XLSX from 'xlsx-js-style';


//conecta a desarrollo 


@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})


export class EventoComponent implements OnInit,AfterViewInit {

  @ViewChild('map') mapContainer!: ElementRef;


  display = false;
  map: L.Map | undefined;

  cols: any[] = [];
  eventos?: Eventos[];

  eventoCopia?: Eventos;
  eventoSeleccionado?: Eventos;

  mostrarGuardar: boolean = true; // Mostrar el botón por defecto
  mostrarActualizar: boolean = true;

  formObraDialog: boolean;
  

  EventosForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private eventoService: EventoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.EventosForm = this.fb.group({
      id: [''],
      fecha_hora: ['', Validators.required]
    });

  }



  ngAfterViewInit(): void {

    this.cdr.detectChanges();
    
    console.log(this.mapContainer?.nativeElement);

     // Espera a que se cargue completamente Leaflet antes de inicializar el mapa
     setTimeout(() => {
      // Inicializa el mapa cuando se carga la vista
      this.initializeMap();
    });

  }



  initializeMap() {

    console.log('Contenedor del mapa:', this.mapContainer?.nativeElement);

    if (!this.mapContainer) {
      return;
    }
    
    // Inicializa el mapa (puedes ajustar esto según tus necesidades)
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.lat, this.lng],
      zoom: 13
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([this.lat, this.lng]).addTo(this.map)
      .bindPopup('Hola, este es un marcador de ejemplo.');

  }


  ngOnInit(): void {

    this.recuperaEventos();


    this.cols = [
      { field: 'id', header: 'Id' },

      { field: 'despachador', header: 'Despachador' },

      { field: 'numero_ot', header: 'N° Ot' },
      { field: 'tipo_evento', header: 'Tipo Evento' },

      { field: 'nombre_maestro', header: 'Maestro' },

      { field: 'nombre_ayudante', header: 'Ayudante' },

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
        this.eventos = data;
        this.eventos.sort((a, b) => b.id - a.id);
      }, error: (e) => console.error(e)
    });
  }


  lat: number = -33.4528512;
  lng: number = -70.6347008;


  showDialog(evento : Eventos) {

    console.log("show", evento);

    this.lat = parseFloat(evento.coordenadas.latitude);
    this.lng = parseFloat(evento.coordenadas.longitude);

    console.log("lat", this.lat);
    console.log("lng", this.lng);

    this.display = true;

  }

  hideDialog() {
    this.display = false;
  }


  eventoDialog = false;
  OT = null;

  editEvento(evento : Eventos) {

    console.log("edit", evento);

    this.eventoCopia = { ...evento };

    this.OT = this.eventoCopia.numero_ot;

    this.EventosForm.reset();

    this.mostrarGuardar = false;
    this.mostrarActualizar = true;

    const fechaParseada = new Date(this.eventoCopia.fecha_hora);

    const dia = fechaParseada.getDate().toString().padStart(2, '0');
    const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaParseada.getFullYear();

    const hh = fechaParseada.getHours().toString();
    const mm = fechaParseada.getMinutes().toString();

    const fechaFormateada = `${dia}-${mes}-${año} ${hh}:${mm}`;

    this.eventoCopia.fecha_hora = fechaFormateada;

    console.log("this.eventoCopia", this.eventoCopia);

    this.EventosForm.patchValue(this.eventoCopia);

    this.eventoDialog = true;

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


    if (this.EventosForm.valid) {

       const ObjetUpdated = this.EventosForm.value; // Obtén los datos del formulario

       console.log("ObjetUpdated", ObjetUpdated);

       let ObjetUpdatedCopia = { ...ObjetUpdated };

      if (typeof ObjetUpdatedCopia.fecha_hora === 'string') {

        // El campo es de tipo texto (string)
        console.log('Es una cadena de texto');

        const arrayFechaHora = ObjetUpdatedCopia.fecha_hora.split(" ");

        const arrayFecha = arrayFechaHora[0].split("-");

        const arrayHora = arrayFechaHora[1].split(":");

        // Formatea la fecha en el formato deseado
        ObjetUpdatedCopia.fecha_hora = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;
        
        // Puedes realizar operaciones específicas para cadenas de texto si es necesario
      } else if (ObjetUpdatedCopia.fecha_hora instanceof Date) {

        // El campo es de tipo Date
        console.log('Es un objeto Date');
        ObjetUpdatedCopia.fecha_hora = this.formateoFecha(ObjetUpdatedCopia.fecha_hora);

      }

       console.log("ObjetUpdatedCopia", ObjetUpdatedCopia);

      // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
      this.eventoService.updateEvento(ObjetUpdatedCopia).subscribe(
        (response) => {

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

          this.eventoDialog = false;

          this.recuperaEventos();

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
        { v: "despachador", t: 's', s: this.headerStyle },
        { v: "numero_ot", t: 's', s: this.headerStyle },

        { v: "direccion", t: 's', s: this.headerStyle },
        { v: "comuna", t: 's', s: this.headerStyle },
        { v: "requerimiento", t: 's', s: this.headerStyle },


        { v: "maestro", t: 's', s: this.headerStyle },
        { v: "ayudante", t: 's', s: this.headerStyle },
        { v: "brigada", t: 's', s: this.headerStyle },
        
        { v: "tipo_turno", t: 's', s: this.headerStyle },
        { v: "tipo_evento", t: 's', s: this.headerStyle },
        
        { v: "fecha_hora", t: 's', s: this.headerStyle },
        { v: "hora_inicio", t: 's', s: this.headerStyle },
        { v: "hora_termino", t: 's', s: this.headerStyle },
        
        { v: "coordenadas.latitude", t: 's', s: this.headerStyle },
        { v: "coordenadas.longitude", t: 's', s: this.headerStyle },
        
      ],
      // Datos
      ...this.eventos.map(item => [
        item.id,
        item.despachador,
        item.numero_ot,

        item.direccion,
        item.comuna,
        item.requerimiento,
        
        item.nombre_maestro,
        item.nombre_ayudante,
        item.brigada,
        item.tipo_turno,
        item.tipo_evento,
                
        item.fecha_hora,
        item.hora_inicio,
        item.hora_termino,
        item.coordenadas.latitude,
        item.coordenadas.longitude
      ])
    ]);



    const columnas = [
      "id",
      "despachador",
      "numero_ot",
      "direccion",
      "comuna",
      "requerimiento",
      "nombre_maestro",
      "nombre_ayudante",
      "brigada",
      "tipo_turno",
      "tipo_evento",
      "fecha_hora",
      "hora_inicio",
      "hora_termino",
      "coordenadas.latitude",
      "coordenadas.longitude"
    ];

    // Establecer el ancho de la columna para cada columna
    ws['!cols'] = columnas.map(columna => ({ wch: 25 })); // Ancho de columna predeterminado


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
