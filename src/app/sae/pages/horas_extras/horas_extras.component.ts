import { Component, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

import { Product } from '../../models/product.model';
import { EstadoResultado } from '../../models/estadoResultado.model'

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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


interface Observacion {
  id: number,
  fecha_hora: string,
  detalle: string
}


interface CobrosAdicionales {
  id: number,
  fecha_hora: string,
  detalle: string,
  cantidad: string,
  valor: string
}


interface InterfaceHoraExtra {
  id: number,
  fecha_hora: string,
  brigada: InterfaceBrigada,
  cantidad: string,
  comentario: string
}

interface InterfaceBrigada {
  id: Number;
  brigada: string;
}


@Component({
  selector: 'app-horas_extras',
  templateUrl: './horas_extras.component.html',
  styleUrls: ['./horas_extras.component.scss'],
  providers: [MessageService]
})

export class Horas_extrasComponent implements OnInit {

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Product[] = [];

  product: Product = {};

  selectedProducts: Product[] = [];


  ListEstadoResultado: EstadoResultado[];

  ListHorasExtra: InterfaceHoraExtra[];

  HoraExtraCopia: InterfaceHoraExtra;



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


  HoraExtraForm: FormGroup;
  mostrarGuardar: boolean = true; // Mostrar el botón por defecto
  mostrarActualizar: boolean = true;

  brigadas: InterfaceBrigada[] | undefined;

  selectedBrigada: InterfaceBrigada | undefined;

  constructor(
    private fb: FormBuilder,
    private estadoResultadoService: EstadoResultadoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) {

    this.HoraExtraForm = this.fb.group({
      id: [''],
      fecha_hora: ['', Validators.required],
      brigada: ['', Validators.required],
      cantidad: ['', Validators.required],
      comentario: ['', Validators.required],
    });

  }


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
      { name: 'Maule sur - Maule norte', code: 'MN' },
      { name: 'Central', code: 'MS' }
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


    this.estadoResultadoService.listabrigadassae().subscribe({
      next: (data) => {
        this.brigadas = data
      }, error: (e) => console.error(e)
    });


  }


  recuperaEstadosResultados() {
    this.estadoResultadoService.horaextranoprocesados().subscribe({
      next: (data) => {
        this.ListHorasExtra = data.detalle;
        this.ListHorasExtra.sort((a, b) => b.id - a.id);
        console.log("ListHorasExtra",this.ListHorasExtra);
      }, error: (e) => console.error(e)
    });
  }



  filtrarFecha(fechaString: string) 
  {

    //"2023-04-12 00:00:00"
    const arrayFechaHora = fechaString.split(" ");
    // Divide el primer elemento (fecha) utilizando el guion como delimitador
    const arrayFecha = arrayFechaHora[0].split("-");
    // Formatea la fecha en el formato deseado
    return `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]}`;

  }




  loading: boolean = false;

  onGuardarClick() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);


    if (this.HoraExtraForm.valid) {

      const nueva = this.HoraExtraForm.value;

      //console.log('Nueva:', nueva);

      let nuevaCopia = { ...nueva };

      nuevaCopia.fecha_hora = this.formateoFecha(nuevaCopia.fecha_hora);

      //console.log('Nueva Formato Fecha :', nuevaCopia);

      this.estadoResultadoService.createHoraExtra(nuevaCopia).subscribe(
        (response) => {

          // Manejar la respuesta exitosa
          console.log('Obra guardada con éxito:', response);

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

          this.productDialog = false;

          this.estadoResultadoService.horaextranoprocesados().subscribe({
            next: (data) => {
              console.log("data", data);
              this.ListHorasExtra = data.detalle;
              this.ListHorasExtra.sort((a, b) => b.id - a.id);
            }, error: (e) => console.error(e)
          });

        },
        (error) => {

          // Manejar errores
          console.error('Error al guardar:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Por favor, intentar mas tarde problemas de servicio',
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



  onActualizarClick() {

    this.loading = true;

    setTimeout(() => {
      this.loading = false
    }, 2000);

    if (this.HoraExtraForm.valid) {

      const ObjetUpdated = this.HoraExtraForm.value; // Obtén los datos del formulario

      console.log("ObjetUpdated", ObjetUpdated);

      let ObjetUpdatedCopia = { ...ObjetUpdated };

      if (typeof ObjetUpdatedCopia.fecha_hora === 'string') {

        // El campo es de tipo texto (string)
        console.log('Es una cadena de texto');
        const arrayFecha = ObjetUpdatedCopia.fecha_hora.split("-");
        // Formatea la fecha en el formato deseado
        ObjetUpdatedCopia.fecha_hora = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]}`;

        // Puedes realizar operaciones específicas para cadenas de texto si es necesario
      } else if (ObjetUpdatedCopia.fecha_hora instanceof Date) {

        // El campo es de tipo Date
        console.log('Es un objeto Date');
        ObjetUpdatedCopia.fecha_hora = this.formateoFecha(ObjetUpdatedCopia.fecha_hora);

      }

      console.log("ObjetUpdatedCopia", ObjetUpdatedCopia);

      // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
      this.estadoResultadoService.updateHoraExtra(ObjetUpdatedCopia).subscribe(
        (response) => {

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

          this.productDialog = false;

          this.estadoResultadoService.horaextranoprocesados().subscribe({
            next: (data) => {
              console.log("data", data);
              this.ListHorasExtra = data.detalle;
              // Ordenar la lista por el campo 'id' de mayor a menor
              this.ListHorasExtra.sort((a, b) => b.id - a.id);
            }, error: (e) => console.error(e)
          });

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




  onEliminarClick(HoraExtra: InterfaceHoraExtra) {

    this.confirmationService.confirm({
      message: 'Estás seguro de que deseas eliminar ID : ' + HoraExtra.id + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.estadoResultadoService.deleteHoraExtra(HoraExtra).subscribe(
          (response) => {

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });

            this.estadoResultadoService.horaextranoprocesados().subscribe({
              next: (data) => {
                console.log("data", data);
                this.ListHorasExtra = data.detalle;
                // Ordenar la lista por el campo 'id' de mayor a menor
                this.ListHorasExtra.sort((a, b) => b.id - a.id);
              }, error: (e) => console.error(e)
            });

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




  openNew() {

    this.mostrarGuardar = true;
    this.mostrarActualizar = false;
    this.HoraExtraForm.reset();
    this.product = {};
    this.submitted = false;
    this.productDialog = true;

  }


  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }



  formateoFecha(fechaOriginal: string): string {
    const fechaParseada = new Date(fechaOriginal);
    const dia = fechaParseada.getDate().toString().padStart(2, '0');
    const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaParseada.getFullYear();
    const fechaFormateada = `${año}-${mes}-${dia}`;
    console.log("fechaFormateada", fechaFormateada);
    return fechaFormateada;
  }



  editHoraExtra(HoraExtra: InterfaceHoraExtra) {

    this.HoraExtraCopia = { ...HoraExtra };

    this.HoraExtraForm.reset();
    this.mostrarGuardar = false;
    this.mostrarActualizar = true;

    const fechaParseada = new Date(this.HoraExtraCopia.fecha_hora);

    const dia = fechaParseada.getDate().toString().padStart(2, '0');
    const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaParseada.getFullYear();

    const fechaFormateada = `${dia}-${mes}-${año}`;

    this.HoraExtraCopia.fecha_hora = fechaFormateada;

    this.HoraExtraForm.patchValue(this.HoraExtraCopia);
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
