import { Component, ElementRef, OnInit } from '@angular/core';
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
  code: number;
}

interface Mes {
  name: string;
  code: string;
}

interface ResumenEvento {
  cantidad: string;
  glosa_evento: string;
  id_paquete: string;
  id_tipo_evento: string;
  monto: string;
  precio: string;
  tipo_evento: string;
}

interface ResumenTurno {
  cantidad_brigada: string;
  id_paquete: string;
  id_turno: string;
  monto: string;
  permanencia_semanal: string;
  precio: string;
  uso_semanal: string;
}

@Component({
  selector: 'app-estadoresultado',
  templateUrl: './newestadoresultado.component.html',
  styleUrls: ['./newestadoresultado.component.scss'],
  providers: [MessageService]
})

export class NewEstadoResultadoComponent implements OnInit {

  loading: boolean = false;
  
  productDialog: boolean = false;
  
  deleteProductDialog: boolean = false;
  
  deleteProductsDialog: boolean = false;
  products: Product[] = [];
  product: Product = {};
  selectedProducts: Product[] = [];

  ListEstadoResultado: EstadoResultado[];
  estadoResultado: EstadoResultado = {};
  selectedEstadoResultado: EstadoResultado[] = [];

  ListResumenEvento: ResumenEvento[];
  ListResumenTurno: ResumenTurno[];

  sumatoriaResumenEvento: number = 0;
  sumatoriaResumenTurno: number = 0;

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

  constructor(
    private estadoResultadoService: EstadoResultadoService,
    private messageService: MessageService) { }


  ngOnInit() {

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
      { name: 'Talca', code: 1 },
      { name: 'Curicó', code: 2 },
      { name: 'Parral', code: 3 },
      { name: 'Pelluhue', code: 4 }
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

  ConsultarEstadoResultado() {

    this.submitted = true;
    console.log("Agregar Reporte Estado");

    console.log("selectedPaquete", this.selectedPaquete.code);
    console.log("selectedMes", this.selectedMes);
    console.log("FechaInicio", this.FechaInicio);
    console.log("FechaFinal", this.FechaFinal);

    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });

    let year = this.FechaInicio.getFullYear().toString().slice(-4); // Obtiene los dos últimos dígitos del año
    let month = ('0' + (this.FechaInicio.getMonth() + 1)).slice(-2); // Añade un cero inicial si el mes es < 10
    let day = ('0' + this.FechaInicio.getDate()).slice(-2); // Añade un cero inicial si el día es < 10

    // Formatea la fecha en el formato deseado
    const fechaFormateada1 = `${year}-${month}-${day}`;

    year = this.FechaFinal.getFullYear().toString().slice(-4); // Obtiene los dos últimos dígitos del año
    month = ('0' + (this.FechaFinal.getMonth() + 1)).slice(-2); // Añade un cero inicial si el mes es < 10
    day = ('0' + this.FechaFinal.getDate()).slice(-2); // Añade un cero inicial si el día es < 10

    // Formatea la fecha en el formato deseado
    const fechaFormateada2 = `${year}-${month}-${day}`;

    this.estadoResultadoService.getResumenEventos(fechaFormateada1, fechaFormateada2, this.selectedPaquete.code).subscribe({
      next: (data) => {
        this.ListResumenEvento = data;
        this.ListResumenEvento.forEach(item => {
          const montoNumero = parseFloat(item.monto);
          if (!isNaN(montoNumero)) {
            this.sumatoriaResumenEvento += montoNumero;
          }
        });
      }, error: (e) => console.error(e)
    });

    this.estadoResultadoService.getResumenTurnos(fechaFormateada1, fechaFormateada2, this.selectedPaquete.code).subscribe({
      next: (data) => {
        this.ListResumenTurno = data;
        this.ListResumenTurno.forEach(item => {
          const montoNumero = parseFloat(item.monto);
          if (!isNaN(montoNumero)) {
            this.sumatoriaResumenTurno += montoNumero;
          }
        });
      }, error: (e) => console.error(e)
    });

  }


  CrearEstadoResultado() 
  {

    this.deleteProductDialog = true;
    this.loading = true;

    setTimeout(() => {
        this.loading = false
    }, 2000);

  }


  ConfirmoCerrarPeriodo()
  {

    console.log("selectedPaquete", this.selectedPaquete.code);
    console.log("selectedMes", this.selectedMes);
    console.log("FechaInicio", this.FechaInicio);
    console.log("FechaFinal", this.FechaFinal);


    let year = this.FechaInicio.getFullYear().toString().slice(-4); // Obtiene los dos últimos dígitos del año
    let month = ('0' + (this.FechaInicio.getMonth() + 1)).slice(-2); // Añade un cero inicial si el mes es < 10
    let day = ('0' + this.FechaInicio.getDate()).slice(-2); // Añade un cero inicial si el día es < 10

    // Formatea la fecha en el formato deseado
    const fechaFormateada1 = `${year}-${month}-${day}`;

    year = this.FechaFinal.getFullYear().toString().slice(-4); // Obtiene los dos últimos dígitos del año
    month = ('0' + (this.FechaFinal.getMonth() + 1)).slice(-2); // Añade un cero inicial si el mes es < 10
    day = ('0' + this.FechaFinal.getDate()).slice(-2); // Añade un cero inicial si el día es < 10

    // Formatea la fecha en el formato deseado
    const fechaFormateada2 = `${year}-${month}-${day}`;

    
    this.estadoResultadoService.getcreaEstadoResultado(fechaFormateada1, fechaFormateada2, this.selectedPaquete.code).subscribe({
      next: (data) => {       
        console.log(data);
      }, error: (e) => console.error(e)
    });

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


