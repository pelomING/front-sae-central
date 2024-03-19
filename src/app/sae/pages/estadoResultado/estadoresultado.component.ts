import { Component, OnInit } from '@angular/core';

import * as XLSX from 'xlsx-js-style';
import { saveAs } from 'file-saver';

import { ConfirmationService } from 'primeng/api';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Product } from '../../models/product.model';
import { EstadoResultado } from '../../models/estadoResultado.model'

import { ProductService } from 'src/app/demo/service/product.service';

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';
import { map } from 'rxjs';


interface City {
  name: string;
  code: string;
}

interface Cliente {
  name: string;
  code: string;
}

interface Zona {
  name: string;
  code: string;
}

interface Paquete {
  name: string;
  code: string;
}

interface Paquete {
  name: string;
  code: string;
}

interface Mes {
  name: string;
  code: string;
}

export interface Detallepxq {
  id?: string;
  aviso?: string;
  ayudante?: string;
  centrality?: string;
  comuna?: string;
  patente?: string;
  descripcion?: string;
  despachador?: string;
  direccion?: string;
  fecha?: string;
  hora_termino?: string;
  maestro?: string;
  tipo_turno?: string;
  valor_cobrar?: string;
}


@Component({
  selector: 'app-estadoresultado',
  templateUrl: './estadoresultado.component.html',
  styleUrls: ['./estadoresultado.component.scss'],
  providers: [MessageService]
})


export class EstadoResultadoComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];


  ListEstadoResultado: EstadoResultado[];

  estadoResultado: EstadoResultado = {};

  selectedEstadoResultado: EstadoResultado[] = [];



  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];


  cities: City[] | undefined;

  selectedCity: City | undefined;


  clientes: Cliente[] | undefined;

  selectedCliente: Cliente | undefined;


  zonas: Zona[] | undefined;

  selectedZona: Zona | undefined;


  paquetes: Paquete[] | undefined;

  selectedPaquete: Paquete | undefined;


  meses: Mes[] | undefined;

  selectedMes: Mes | undefined;


  date: Date | undefined;

  FechaInicio: Date | undefined;

  FechaFinal: Date | undefined;

  options: any;



  display = false;



  constructor(private estadoResultadoService: EstadoResultadoService, private messageService: MessageService) { }

  ngOnInit() {

    this.recuperaEstadosResultados();

    this.cols = [
      { field: 'id', header: 'id' },
      { field: 'nombre_usuario', header: 'nombre_usuario' },
      { field: 'nombre_cliente', header: 'nombre_cliente' },
      { field: 'nombre_zona', header: 'nombre_zona' },
      { field: 'nombre_paquete', header: 'nombre_paquete' },
      { field: 'nombre_mes', header: 'nombre_mes' },
      { field: 'fecha_inicio', header: 'fecha_inicio' },
      { field: 'fecha_final', header: 'fecha_final' },
      { field: 'nombre_doc', header: 'nombre_doc' },
      { field: 'url_doc', header: 'url_doc' }
    ];

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' }
    ];

    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.clientes = [
      { name: 'CGE', code: 'CGE' },
      { name: 'FronTel', code: 'FronTel' },
      { name: 'Enel', code: 'Enel' }
    ];

    this.zonas = [
      { name: 'Maule Norte', code: 'MN' },
      { name: 'Maule Sur', code: 'MS' }
    ];

    this.paquetes = [
      { name: 'Talca', code: 'Talca' },
      { name: 'Curicó', code: 'Curicó' },
      { name: 'Parral', code: 'Parral' }
    ];

    this.meses = [
      { name: 'Enero', code: 'Ene' },
      { name: 'Febrero', code: 'Feb' },
      { name: 'Marzo', code: 'Mar' },
      { name: 'Abril', code: 'Abr' },
      { name: 'Mayo', code: 'May' },
      { name: 'Junio', code: 'Jun' },
      { name: 'Julio', code: 'Jul' },
      { name: 'Agosto', code: 'Ago' },
      { name: 'Septiembre', code: 'Sep' },
      { name: 'Octubre', code: 'Oct' },
      { name: 'Noviembre', code: 'Nov' },
      { name: 'Diciembre', code: 'Dic' }
    ];

  }


  recuperaEstadosResultados(): void {
    this.estadoResultadoService.getEstadosResultados().subscribe({
      next: (data) => {
        console.log("data", data);
        this.ListEstadoResultado = data
      }, error: (e) => console.error(e)
    });
  }



  filtrarFecha(fechaString: string) {

    // Convierte la cadena en un objeto Date
    const fecha = new Date(fechaString);

    // Ahora puedes realizar operaciones con la fecha, por ejemplo, formatearla:
    this.options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    const fechaFormateada = fecha.toLocaleDateString('es-ES', this.options);

    console.log(fechaFormateada); // Mostrará '1 de septiembre de 2023'

    const fechaS = new Date(fechaFormateada);

    // Obten los componentes de la fecha
    const dia = fechaS.getDate().toString().padStart(2, '0'); // Añade ceros a la izquierda si es necesario
    const mes = (fechaS.getMonth() + 1).toString().padStart(2, '0'); // Suma 1 porque los meses comienzan en 0
    const anio = fechaS.getFullYear();

    // Formatea la fecha en el formato deseado
    return `${dia}-${mes}-${anio}`;

  }


  columnOrder = [
    "fecha",
    "hora_termino",
    "centrality",
    "maestro",
    "ayudante",
    "patente",
    "despachador",
    "comuna",
    "direccion",
    "aviso",
    "descripcion",
    "valor_cobrar"
  ];

  reorganizarData(data: any[]): any[] {
    return data.map(item => {
      const reorderedItem: any = {};
      this.columnOrder.forEach(column => {
        reorderedItem[column] = item[column];
      });
      return reorderedItem;
    });
  }



  onDialogShow() {

    console.log("onDialogShow");


    /*Consultas a Historico de Estado de Pago*/

    this.estadoResultadoService.CARGOFIJOSEMANALPORBRIGADA().subscribe({
      next: (data) => {

        console.log("DATOS CARGOFIJOSEMANALPORBRIGADA", data);
        this.CARGOFIJOSEMANALPORBRIGADA = data;

      }, error: (e) => console.error(e)
    });



    this.estadoResultadoService.PERMANENICACARGOFIJOSEMANALPORBRIGADA_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS PERMANENICACARGOFIJOSEMANALPORBRIGADA", data);
        this.PERMANENICACARGOFIJOSEMANALPORBRIGADA = data.detalle;
        this.PERMANENICACARGOFIJOSEMANALPORBRIGADA_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });



    this.estadoResultadoService.OBSERVACIONES_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS OBSERVACIONES", data);
        this.OBSERVACIONES = data;

      }, error: (e) => console.error(e)
    });



    this.estadoResultadoService.HORASEXTRAS_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS HORASEXTRAS", data);
        this.HORASEXTRAS = data.detalle;
        this.HORASEXTRAS_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    this.estadoResultadoService.TURNOSADICIONALES_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS TURNOSADICIONALES", data);
        this.TURNOSADICIONALES = data.detalle;
        this.TURNOSADICIONALES_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    this.estadoResultadoService.TURNOSCONTINGENCIA_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS TURNOSCONTINGENCIA", data);
        this.TURNOSCONTINGENCIA = data.detalle;
        this.TURNOSCONTINGENCIA_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    this.estadoResultadoService.PRODUCCIONPxQ_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS PRODUCCIÓNPxQ", data);
        this.PRODUCCIONPxQ = data.detalle;
        this.PRODUCCIONPxQ_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });



    this.estadoResultadoService.COBROSADICIONALES_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS COBROSADICIONALES", data);
        this.COBROSADICIONALES = data.detalle;
        this.COBROSADICIONALES_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    this.estadoResultadoService.DESCUENTOS_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {

        console.log("DATOS DESCUENTOS", data);
        this.DESCUENTOS = data.detalle;
        this.DESCUENTOS_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    this.estadoResultadoService.RESUMEN_HISTORIAL(this.estadoResultado.id).subscribe({
      next: (data) => {
        console.log("DATOS RESUMEN", data);
        this.RESUMEN = data;
      }, error: (e) => console.error(e)
    });


    /*XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX*/


  }



  CARGOFIJOSEMANALPORBRIGADA: any[] = [];
  PERMANENICACARGOFIJOSEMANALPORBRIGADA: any[] = [];
  OBSERVACIONES: any[] = [];
  HORASEXTRAS: any[] = [];
  TURNOSADICIONALES: any[] = [];
  TURNOSCONTINGENCIA: any[] = [];
  PRODUCCIONPxQ: any[] = [];
  COBROSADICIONALES: any[] = [];
  DESCUENTOS: any[] = [];
  RESUMEN: any[] = [];



  PERMANENICACARGOFIJOSEMANALPORBRIGADA_TOTAL = 0;
  HORASEXTRAS_TOTAL = 0;
  TURNOSADICIONALES_TOTAL = 0;
  TURNOSCONTINGENCIA_TOTAL = 0;
  PRODUCCIONPxQ_TOTAL = 0;
  COBROSADICIONALES_TOTAL = 0;
  DESCUENTOS_TOTAL = 0;



  showDialog(estadoResultado: EstadoResultado) {

    this.estadoResultado = estadoResultado;

    console.log("this.estadoResultado", this.estadoResultado);

    this.display = true;

  }


  ListDetallepxq: Detallepxq[] = [];

  async ejecutarConsultaDetallepxqhistorial(idPaquete: number, id_estado_pago: number) {
    try {

      const data = await this.estadoResultadoService.detallepxqhistorial(idPaquete, id_estado_pago).toPromise();

      console.log("data", data);

      const reorderedData = this.reorganizarData(data);

      this.ListDetallepxq = reorderedData;

      // Aquí puedes ejecutar cualquier código que deba ejecutarse después de que la consulta se haya completado.

    } catch (error) {

      console.error(error)

    }
  }



  async descargaReporteEstadodePago(estadoPago) {

    try {


      console.log("estadoPago", estadoPago);

      // Crear hoja de trabajo
      const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([]);



      XLSX.utils.sheet_add_aoa(ws, [['ESTADO DE PAGO SAE - PROYECTO INTEGRAL MAULE NORTE']], { origin: 'B2' });


      XLSX.utils.sheet_add_aoa(ws, [['FECHA E.D.P: 03-11-2023']], { origin: 'H5' });

      XLSX.utils.sheet_add_aoa(ws, [['No ESTADO DE PAGO: Z1-Z3-SAE-001-10/23']], { origin: 'H6' });


      XLSX.utils.sheet_add_aoa(ws, [['ZONA CONTRATO PELOM:Zona 1-3 / Curicó - Hualañe']], { origin: 'B11' });

      XLSX.utils.sheet_add_aoa(ws, [['COORDINADOR SUPERVISOR PELOM:	Omar Hinojosa Carreño']], { origin: 'B12' });

      XLSX.utils.sheet_add_aoa(ws, [['FECHA INICIAL	01-10-2023']], { origin: 'B13' });

      XLSX.utils.sheet_add_aoa(ws, [['FECHA FINAL	31-10-2023']], { origin: 'B14' });

      XLSX.utils.sheet_add_aoa(ws, [['ZONAL CGE: Maule sur - Maule Norte']], { origin: 'B15' });

      XLSX.utils.sheet_add_aoa(ws, [['SUPERVISOR CGE: José León']], { origin: 'B16' });

      XLSX.utils.sheet_add_aoa(ws, [['Turnos comprometido mes 31']], { origin: 'B17' });


      XLSX.utils.sheet_add_aoa(ws, [['Localidad']], { origin: 'B20' });


      // Combinar celdas desde A1 hasta C1
      ws['!merges'] = [{ s: { r: 19, c: 1 }, e: { r: 19, c: 2 } }];


      console.log("ws", ws);

      // Consulta PARRAL
      await this.ejecutarConsultaDetallepxqhistorial(3, estadoPago.id);

      // Crear hoja de trabajo
      const ws1: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
        // Encabezados con estilos
        [
          { v: "Fecha", t: 's', s: this.headerStyle },
          { v: "Hora término", t: 's', s: this.headerStyle },
          { v: "Centrality", t: 's', s: this.headerStyle },
          { v: "Maestro", t: 's', s: this.headerStyle },
          { v: "Ayudante", t: 's', s: this.headerStyle },
          { v: "Patente", t: 's', s: this.headerStyle },
          { v: "Despachador", t: 's', s: this.headerStyle },
          { v: "Comuna", t: 's', s: this.headerStyle },
          { v: "Direccion", t: 's', s: this.headerStyle },
          { v: "Aviso", t: 's', s: this.headerStyle },
          { v: "Descripción", t: 's', s: this.headerStyle },
          { v: "Valor Cobrar", t: 's', s: this.headerStyle },
        ],
        // Datos
        ...this.ListDetallepxq.map(item => [
          item.fecha,
          item.hora_termino,
          item.centrality,
          item.maestro,
          item.ayudante,
          item.patente,
          item.despachador,
          item.comuna,
          item.direccion,
          item.aviso,
          item.descripcion,
          item.valor_cobrar
        ])
      ]);


      const columnas1 = [
        "Fecha",
        "Hora término",
        "Centrality",
        "Maestro",
        "Ayudante",
        "Patente",
        "Despachador",
        "Comuna",
        "Direccion",
        "Aviso",
        "Descripción",
        "Valor Cobrar"
      ];

      // Establecer el ancho de la columna para cada columna
      ws1['!cols'] = columnas1.map(columna => ({ wch: 25 })); // Ancho de columna predeterminado




      // Consulta CURICÓ
      await this.ejecutarConsultaDetallepxqhistorial(2, estadoPago.id);


      // Crear hoja de trabajo
      const ws2: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
        // Encabezados con estilos
        [
          { v: "Fecha", t: 's', s: this.headerStyle },
          { v: "Hora término", t: 's', s: this.headerStyle },
          { v: "Centrality", t: 's', s: this.headerStyle },
          { v: "Maestro", t: 's', s: this.headerStyle },
          { v: "Ayudante", t: 's', s: this.headerStyle },
          { v: "Patente", t: 's', s: this.headerStyle },
          { v: "Despachador", t: 's', s: this.headerStyle },
          { v: "Comuna", t: 's', s: this.headerStyle },
          { v: "Direccion", t: 's', s: this.headerStyle },
          { v: "Aviso", t: 's', s: this.headerStyle },
          { v: "Descripción", t: 's', s: this.headerStyle },
          { v: "Valor Cobrar", t: 's', s: this.headerStyle },
        ],
        // Datos
        ...this.ListDetallepxq.map(item => [
          item.fecha,
          item.hora_termino,
          item.centrality,
          item.maestro,
          item.ayudante,
          item.patente,
          item.despachador,
          item.comuna,
          item.direccion,
          item.aviso,
          item.descripcion,
          item.valor_cobrar
        ])
      ]);


      const columnas2 = [
        "Fecha",
        "Hora término",
        "Centrality",
        "Maestro",
        "Ayudante",
        "Patente",
        "Despachador",
        "Comuna",
        "Direccion",
        "Aviso",
        "Descripción",
        "Valor Cobrar"
      ];

      // Establecer el ancho de la columna para cada columna
      ws2['!cols'] = columnas2.map(columna => ({ wch: 25 })); // Ancho de columna predeterminado



      // Crear libro de trabajo
      const wb: XLSX.WorkBook = XLSX.utils.book_new();

      // Agregar hoja de trabajo al libro
      //XLSX.utils.book_append_sheet(wb, ws, 'Estado de Pago');

      XLSX.utils.book_append_sheet(wb, ws1, 'PxQ Parral');

      XLSX.utils.book_append_sheet(wb, ws2, 'PxQ Curicó');

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


      const nombreArchivo = `reporte_estado_de_pago_${estadoPago.codigo_estado}_${fechatotal}.xlsx`;

      saveAs(blob, nombreArchivo);


    } catch (error) {

      console.error(error);

    }

  }



  // Establecer el estilo de los encabezados
  private headerStyle = {
    fill: { fgColor: { rgb: "87CEEB" } }, // Fondo celeste opaco
    font: { color: { rgb: "000000" }, bold: true }, // Texto negro y negrita
    alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
    width: 50
  };



  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(val => !this.selectedProducts.includes(val));
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter(val => val.id !== this.product.id);
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    this.product = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    console.log("Agregar Reporte Estado");

    console.log("selectedCliente", this.selectedCliente);
    console.log("selectedZona", this.selectedZona);
    console.log("selectedPaquete", this.selectedPaquete);
    console.log("selectedMes", this.selectedMes);

    console.log("FechaInicio", this.FechaInicio);
    console.log("FechaFinal", this.FechaFinal);



  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }



  nombreLocalidadCiudad = 'Santiago';

  opcionesFecha: Intl.DateTimeFormatOptions = {
    weekday: 'long', // Nombre del día de la semana
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };


  obtenerFechaActualConDiaYCiudad(): string {

    const fecha = new Date();

    this.opcionesFecha = {
      weekday: 'long', // Nombre del día de la semana
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const fechaFormateada = fecha.toLocaleDateString(undefined, this.opcionesFecha);

    return `${this.nombreLocalidadCiudad}, ${fechaFormateada}`;

  }


  convertirAFormatoTitulo(oracion: string): string {
    // Divide la oración en palabras
    const palabras = oracion.split(' ');

    // Convierte cada palabra a formato de título (mayúscula inicial, minúsculas restantes)
    const formatoTitulo = palabras.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // Une las palabras en una cadena
    return formatoTitulo.join(' ');
  }



}

