import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Product } from '../../models/product.model';
import { EstadoResultado } from '../../models/estadoResultado.model'

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';

//import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import * as XLSX from 'sheetjs-style'; 
import * as XLSX from 'xlsx-js-style';



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
  trabajo_solicitado?: string;
  trabajo_realizado?: string;

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
  selector: 'app-detalle_pxq',
  templateUrl: './detalle_pxq.component.html',
  styleUrls: ['./detalle_pxq.component.scss'],
  providers: [MessageService]
})

export class Detalle_pxqComponent implements OnInit {



  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];


  ListEstadoResultado: EstadoResultado[];

  ListDetallepxq: Detallepxq[] = [];


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


  constructor(private estadoResultadoService: EstadoResultadoService, private messageService: MessageService) { }

  ngOnInit() {

    // this.recuperaEstadosResultados();

    this.cols = [

      { field: 'id', header: 'id' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'hora_termino', header: 'Hora término' },
      { field: 'centrality', header: 'Centrality' },

      { field: 'maestro', header: 'Brigada1' },
      { field: 'ayudante', header: 'Brigada2' },

      { field: 'patente', header: 'Patente Móvil' },
      { field: 'despachador', header: 'Despachador' },
      { field: 'comuna', header: 'Comuna' },
      { field: 'direccion', header: 'Direccion' },
      { field: 'aviso', header: 'Aviso' },
      { field: 'descripcion', header: 'Descripción trabajo realizado' },
      { field: 'valor_cobrar', header: 'VALOR' },

      { field: 'trabajo_solicitado', header: 'Trabajo solicitado' },
      { field: 'trabajo_realizado', header: 'Trabajo realizado' },


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
      { name: 'Curicó', code: '2' },
      { name: 'Parral', code: '3' }
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
    "trabajo_solicitado",
    "trabajo_realizado",
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


  async ConsultarEstadoResultado() {

    this.submitted = true;


    if (this.selectedPaquete == null) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Debe seleccionar un paquete', life: 3000 });
      return;
    }

    console.log("selectedPaquete", this.selectedPaquete.code);

    this.messageService.add({ severity: 'success', summary: 'Buscando Resultados', detail: 'esperando...', life: 3000 });

    this.estadoResultadoService.detallepxq(this.selectedPaquete.code).subscribe({
      next: (data) => {

        console.log("data", data);
        const reorderedData = this.reorganizarData(data);
        this.ListDetallepxq = reorderedData;

      }, error: (e) => {

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al buscar resultados', life: 3000 });
        console.error(e)

      }


    });

  }





  exportToExcel0(): void {

    var archivo = [
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
    ];

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

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(archivo);
    const unificadoExcel = XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Hoja1',
      true
    );
    // console.log("Este es el resultado de unificado: ", workbook.SheetNames)
    const nombreArchivo = `unificado-${fechatotal}.xlsx`;
    const rutaArchivo = `api_operaciones/files/unificados/${nombreArchivo}`;

    // const colNames = ['A1', 'B1', 'C1'];
    // for (const itm of colNames) {
    //   if (worksheet[itm]) {
    //     worksheet[itm].s = {
    //       fill: { fgColor: { rgb: '00BFFF' } },
    //       font: { color: { rgb: 'FFFFFF' } },
    //     };
    //   }
    // }

    XLSX.writeFile(workbook, rutaArchivo);

  }


  exportToExcel1(): void {

    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      // Encabezados con estilos
      [
        { v: "Despachador", t: 's', s: this.headerStyle },
        { v: "N° OT", t: 's', s: this.headerStyle },
        { v: "Dirección", t: 's', s: this.headerStyle },
        { v: "Comuna", t: 's', s: this.headerStyle },

        { v: "Trabajo solicitado", t: 's', s: this.headerStyle },
        { v: "Trabajo realizado", t: 's', s: this.headerStyle },

        { v: "Evento", t: 's', s: this.headerStyle },
        
        { v: "Maestro", t: 's', s: this.headerStyle },
        { v: "Ayudante", t: 's', s: this.headerStyle },
        { v: "Patente", t: 's', s: this.headerStyle },
        { v: "Fecha", t: 's', s: this.headerStyle },
        
        { v: "Hora Término", t: 's', s: this.headerStyle },
        { v: "Valor", t: 's', s: this.headerStyle },
      ],
      // Datos
      ...this.ListDetallepxq.map(item => [
        item.despachador,
        item.centrality,
        item.direccion,
        item.comuna,
        item.trabajo_solicitado,
        item.trabajo_realizado,
        item.descripcion,
        item.maestro,
        item.ayudante,
        item.patente,
        item.fecha,
        item.hora_termino,
        item.valor_cobrar
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

    const nombreArchivo = `detalle_pxq-${fechatotal}.xlsx`;

    saveAs(blob, nombreArchivo);

  }

  // Establecer el estilo de los encabezados
  private headerStyle = {
    fill: { fgColor: { rgb: "87CEEB" } }, // Fondo celeste opaco
    font: { color: { rgb: "000000" }, bold: true }, // Texto negro y negrita
    alignment: { wrapText: true, vertical: 'bottom', horizontal: 'center' },
  };



  exportToExcel(): void {

    // Crear hoja de trabajo
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.ListEstadoResultado, {
      header: [
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
      ],
      cellStyles: true, // Habilitar estilos de celda
    });

    // Crear un objeto de estilo para las celdas
    const style = {
      font: { color: { rgb: 'FFFFFF' } },
      fill: { bgColor: 'FF0000', fgColor: 'FF0000' },
    };

    // Aplicar estilos a las celdas
    for (const cellAddress in ws) {
      if (cellAddress.startsWith('A') && +cellAddress.substr(1) > 1) {  // Aplicar estilos a las celdas en la primera columna, excluyendo la primera fila (encabezados)
        ws[cellAddress].s = style;
      }
    }

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    const arrayBuffer: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([arrayBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'exported_data.xlsx');
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


}
