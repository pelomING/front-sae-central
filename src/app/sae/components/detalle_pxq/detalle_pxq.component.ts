import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Product } from '../../model/product.model';
import { EstadoResultado } from '../../model/estadoResultado.model'

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';


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




  async ConsultarEstadoResultado() {

    this.submitted = true;
    
    console.log("selectedPaquete", this.selectedPaquete.code);
    
    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

    this.estadoResultadoService.detallepxq(this.selectedPaquete.code).subscribe({
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
