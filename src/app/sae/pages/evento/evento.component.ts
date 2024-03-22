import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Eventos } from 'src/app/sae/models/eventos.model';
import { EventoService } from 'src/app/sae/services/evento.service';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { PrimeIcons } from 'primeng/api';
//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style';
import * as XLSX from 'xlsx-js-style';
import { DomSanitizer } from '@angular/platform-browser';
import { EstadoResultadoService } from '../../services/estadoResultado.service';
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



interface InterfaceTipoEvento {
  codigo: string;
  descripcion: string;
}

interface InterfaceComuna {
  codigo: Number;
  nombre: string;
}



//conecta a desarrollo
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})


export class EventoComponent implements OnInit, AfterViewInit {

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


  lista_objs_brigadas: InterfaceBrigada[] | undefined;

  lista_objs_tipoTurno: InterfaceTipoTurno[] | undefined;

  lista_objs_ayudantes: InterfaceAyudantes[] | undefined;

  lista_objs_maestros: InterfaceMaestro[] | undefined;

  lista_objs_camionetas: InterfaceCamioneta[] | undefined;


  lista_obj_tipo_evento: InterfaceTipoEvento[] | undefined;

  lista_obj_comuna: InterfaceComuna[] | undefined;

  latitude: string;
  longitude: string;


  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private eventoService: EventoService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService,
    private estadoResultadoService: EstadoResultadoService,
    private geolocationService: GeolocationService,
    private confirmationService: ConfirmationService) {

    this.EventosForm = this.fb.group({

      id: [''],
      numero_ot: ['', Validators.required],
      despachador: ['', Validators.required],
      trabajo_solicitado: ['', Validators.required],
      direccion: ['', Validators.required],
      trabajo_realizado: ['', Validators.required],
      fecha_hora: ['', Validators.required],
      hora_inicio: ['', Validators.required],
      hora_termino: ['', Validators.required],

      obj_brigada: ['', Validators.required],
      obj_tipo_turno: ['', Validators.required],
      obj_maestro: ['', Validators.required],
      obj_ayudante: ['', Validators.required],
      obj_camionetas: ['', Validators.required],
      obj_tipo_evento: ['', Validators.required],
      obj_comuna: ['', Validators.required],

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


  onDialogShow() {
    // Asegúrate de que el mapa se ajuste al tamaño correcto después de que se muestre el diálogo
    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Ajustar el tamaño del mapa cuando cambie el tamaño de la ventana
    this.map.invalidateSize();
  }

  iconConfig = {
    icon: this.sanitizer.bypassSecurityTrustUrl('assets/layout/images/location-icon-png-4240.png'),
    markerColor: 'green',
    size: '2.5rem'
  };

  initializeMap() {

    this.cdr.detectChanges();

    console.log('Contenedor del mapa:', this.mapContainer?.nativeElement);

    if (!this.mapContainer) {
      return;
    }


    // Antes de crear un nuevo mapa, destruye el mapa existente si existe
    if (this.map) {
      this.map.remove();
    }


    // Inicializa el mapa (puedes ajustar esto según tus necesidades)
    this.map = L.map(this.mapContainer.nativeElement, {
      center: [this.lat, this.lng],
      zoom: 13
    });

    const key = 'v4IS8KH4bX8ed9q1WXii';

    //'https://api.maptiler.com/maps/satellite/style.json?key=v4IS8KH4bX8ed9q1WXii'

    L.tileLayer(`https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=${key}`, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
      crossOrigin: true
    }).addTo(this.map);

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors'
    // }).addTo(this.map);

    // L.marker([this.lat, this.lng]).addTo(this.map)
    // .bindPopup('Hola, este es un marcador de ejemplo.');

    // Añade marcador en Santiago
    // L.marker([this.lat, this.lng]).addTo(this.map)
    // .bindPopup('Santiago, Chile')
    // .openPopup();

    // Crea un icono personalizado para el marcador
    //const customIcon = L.divIcon({ className: 'custom-marker', html: 'Santiago, Chile' });

    // Añade el marcador con el icono personalizado al mapa
    //L.marker([this.lat, this.lng], { icon: customIcon }).addTo(this.map);

    //L.marker([this.lat, this.lng]).addTo(this.map);

    // const customIcon = L.divIcon({
    //   className: 'custom-marker',
    //   html: '<i class="fa-solid fa-location-dot"></i>',
    // });

    // Crea un icono de Leaflet utilizando el icono de PrimeNG
    // const customIcon = L.divIcon({
    //   className: 'custom-marker',
    //   html: `<i class="pi ${this.iconConfig.icon}" style="color: ${this.iconConfig.markerColor}; font-size: ${this.iconConfig.size};"></i>`
    // });

    // Añade el marcador al mapa con el icono personalizado
    //L.marker([this.lat, this.lng], { icon: customIcon }).addTo(this.map);


    // Crea un icono de Leaflet utilizando una imagen personalizada
    const customIcon = L.icon({
      //iconUrl: 'assets/layout/images/location-icon-azul.png', // Ruta de la imagen personalizada
      iconUrl: 'assets/layout/images/location-icon-rojo.png', // Ruta de la imagen personalizada
      iconSize: [32, 32], // Tamaño de la imagen
      iconAnchor: [16, 32], // Punto de anclaje de la imagen
      popupAnchor: [0, -32] // Punto de anclaje del popup
    });

    // Añade el marcador al mapa con el icono personalizado
    L.marker([this.lat, this.lng], { icon: customIcon }).addTo(this.map);




  }


  ngOnInit(): void {

    this.recuperaEventos();

    this.getLocation();

    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'despachador', header: 'Despachador' },
      { field: 'numero_ot', header: 'N° Ot' },
      { field: 'tipo_evento', header: 'Tipo Evento' },
      { field: 'nombre_maestro', header: 'Maestro' },
      { field: 'nombre_ayudante', header: 'Ayudante' },
      { field: 'brigada', header: 'Brigada' },
      { field: 'tipo_turno', header: 'Tipo Turno' },
      { field: 'trabajo_solicitado', header: 'trabajo_solicitado' },
      { field: 'trabajo_realizado', header: 'trabajo_realizado' },
      { field: 'direccion', header: 'Dirección' },
      { field: 'comuna', header: 'Comuna' },
      { field: 'fecha_hora', header: 'Fecha Hora Ejecución' }
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


    this.estadoResultadoService.listaTipoEvento().subscribe({
      next: (data) => {
        this.lista_obj_tipo_evento = data.map((tipoeventos: any) => {
          return {
            codigo: tipoeventos.codigo,
            descripcion: tipoeventos.descripcion
          }
        })
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.listaComuna().subscribe({
      next: (data) => {
        this.lista_obj_comuna = data.map((comunas: any) => {
          return {
            codigo: comunas.codigo,
            nombre: comunas.nombre
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



  recuperaEventos(): void {
    this.eventoService.getEventos().subscribe({
      next: (data) => {
        this.eventos = data;
        this.eventos.sort((a, b) => b.id - a.id);

        console.log(this.eventos);
        
      }, error: (e) => console.error(e)
    });
  }


  lat: number = -33.4528512;
  lng: number = -70.6347008;


  showDialog(evento: Eventos) {

    console.log("show", evento);

    this.lat = parseFloat(evento.coordenadas.latitude);
    this.lng = parseFloat(evento.coordenadas.longitude);

    this.initializeMap();

    this.display = true;

  }

  hideDialog() {
    this.display = false;
  }


  eventoDialog = false;
  OT = null;


  turnoDialog = false;
  IDTURNO = null;

  titulo_formulario = ''

  openNew() {

    this.OT = '';
    this.titulo_formulario = 'INGRESAR EVENTO';

    this.mostrarGuardar = true;
    this.mostrarActualizar = false;
    this.EventosForm.reset();
    this.eventoDialog = true;

  }


  editEvento(evento: Eventos) {

    this.titulo_formulario = 'EDITAR EVENTO';

    this.eventoCopia = { ...evento };
    
    this.OT = 'Numero OT : ' + this.eventoCopia.numero_ot;


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

    this.eventoCopia.obj_maestro = { rut: this.eventoCopia.rut_maestro, nombre: this.eventoCopia.nombre_maestro };
    this.eventoCopia.obj_ayudante = { rut: this.eventoCopia.rut_ayudante, nombre: this.eventoCopia.nombre_ayudante };

    let result = this.lista_objs_tipoTurno.filter(obj => obj.nombre === this.eventoCopia.tipo_turno);
    if (result.length > 0) this.eventoCopia.obj_tipo_turno = { id: result[0].id, nombre: result[0].nombre };

    let result1 = this.lista_objs_brigadas.filter(obj => obj.brigada === this.eventoCopia.brigada);
    if (result1.length > 0) this.eventoCopia.obj_brigada = { id: result1[0].id, brigada: result1[0].brigada };

    let result2 = this.lista_objs_camionetas.filter(obj => obj.patente === this.eventoCopia.patente);
    if (result2.length > 0) this.eventoCopia.obj_camionetas = { id: result2[0].id, patente: result2[0].patente };

    let result3 = this.lista_obj_tipo_evento.filter(obj => obj.descripcion === this.eventoCopia.tipo_evento);
    if (result3.length > 0) this.eventoCopia.obj_tipo_evento = { codigo: result3[0].codigo, descripcion: result3[0].descripcion  };
 
    let result4 = this.lista_obj_comuna.filter(obj => obj.nombre === this.eventoCopia.comuna );
    if (result4.length > 0) this.eventoCopia.obj_comuna = { codigo: result4[0].codigo, nombre: result4[0].nombre };

    this.EventosForm.patchValue(this.eventoCopia);

    this.eventoDialog = true;

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


    if (this.EventosForm.valid) 
    {

      const nuevoevento = this.EventosForm.value;

      //console.log('Nuevo Evento:', nuevoevento);

      let nuevoeventoCopia = { ...nuevoevento };


      if (typeof nuevoeventoCopia.fecha_hora === 'string') {

        // El campo es de tipo texto (string)
        console.log('Es una cadena de texto');
        const arrayFechaHora = nuevoeventoCopia.fecha_hora.split(" ");
        const arrayFecha = arrayFechaHora[0].split("-");
        const arrayHora = arrayFechaHora[1].split(":");
        // Formatea la fecha en el formato deseado
        nuevoeventoCopia.fecha_hora = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;

        // Puedes realizar operaciones específicas para cadenas de texto si es necesario
      } else if (nuevoeventoCopia.fecha_hora instanceof Date) {

        // El campo es de tipo Date
        console.log('Es un objeto Date');
        nuevoeventoCopia.fecha_hora = this.formateoFecha(nuevoeventoCopia.fecha_hora);

      }


      nuevoeventoCopia.coordenada_x = this.latitude;
      nuevoeventoCopia.coordenada_y = this.longitude;

      console.log('nuevoeventoCopia : ', nuevoeventoCopia);

      this.eventoService.creaEvento(nuevoeventoCopia).subscribe(
        (response) => {

          // Manejar la respuesta exitosa
          console.log('éxito:', response);

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

          this.eventoDialog = false;

          this.recuperaEventos();

        },
        (ObjError) => {

          // Manejar errores
          console.error('Error al guardar :', ObjError);

          this.messageService.add({
            severity: 'error',
            summary: 'Error : ' + ObjError.status,
            detail: 'Por favor, intentar mas tarde problemas de servicio : ' + ObjError.error.message,
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


      //ObjetUpdatedCopia.coordenada_x = this.latitude;
      //ObjetUpdatedCopia.coordenada_y = this.longitude;

      console.log("ObjetUpdatedCopia", ObjetUpdatedCopia);

      // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
      this.eventoService.updateEvento(ObjetUpdatedCopia).subscribe(
        (response) => {

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

          this.eventoDialog = false;

          this.recuperaEventos();

        },
        (ObjError) => {

          // Manejar errores
          console.error('Error al actualizar :', ObjError);

          this.messageService.add({
            severity: 'error',
            summary: 'Error : ' + ObjError.status,
            detail: 'Por favor, intentar mas tarde problemas de servicio : ' + ObjError.error.message,
          });

        }
      );

    }

  }



  onEliminarClick(evento: Eventos) {

    console.log("evento", evento);


    this.confirmationService.confirm({
      message: 'Estás seguro de que deseas eliminar ID : ' + evento.numero_ot + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.eventoService.deleteEvento(evento).subscribe(
          (response) => {

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });

            this.recuperaEventos();

          },
          (ObjError) => {

            // Manejar errores
            console.error('Error al Delete :', ObjError);

            this.messageService.add({
              severity: 'error',
              summary: 'Error : ' + ObjError.status,
              detail: 'Por favor, intentar mas tarde problemas de servicio: ' + ObjError.error.message,
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
        { v: "despachador", t: 's', s: this.headerStyle },
        { v: "numero_ot", t: 's', s: this.headerStyle },
        { v: "direccion", t: 's', s: this.headerStyle },
        { v: "comuna", t: 's', s: this.headerStyle },
        { v: "trabajo_solicitado", t: 's', s: this.headerStyle },
        { v: "trabajo_realizado", t: 's', s: this.headerStyle },
        { v: "maestro", t: 's', s: this.headerStyle },
        { v: "ayudante", t: 's', s: this.headerStyle },
        { v: "turno", t: 's', s: this.headerStyle },
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
        item.trabajo_solicitado,
        item.trabajo_realizado,
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
      "trabajo_solicitado",
      "trabajo_realizado",
      "nombre_maestro",
      "nombre_ayudante",
      "turno",
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
