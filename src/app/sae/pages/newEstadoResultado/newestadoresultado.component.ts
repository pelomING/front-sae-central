import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Product } from '../../models/product.model';
import { EstadoResultado } from '../../models/estadoResultado.model'

import { EstadoResultadoService } from 'src/app/sae/services/estadoResultado.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';

import { NgxPrintService } from 'ngx-print';


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


interface CierrePeriodoInterface {
  periodo: string;
  zonal: Zona;
  fecha_inicial: string;
  fecha_final: string;
  coordinador_pelom: string;
  supervisor_cge: string;
  turnos_comprometidos: string;
  fecha_generacion: string;
}


@Component({
  selector: 'app-estadoresultado',
  templateUrl: './newestadoresultado.component.html',
  styleUrls: ['./newestadoresultado.component.scss'],
  providers: [MessageService]
})

export class NewEstadoResultadoComponent implements OnInit {


  @ViewChild('pdfContainer') pdfContainer!: ElementRef;


  loading: boolean = false;

  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  CerrarPeriodoDialog: boolean = false;


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


  cierrePeriodoInterface: CierrePeriodoInterface | undefined;



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



  formularioPeriodoForm: FormGroup;

  CerrarPeriodoForm: FormGroup;




  //private config: PrimeNGConfig,
  //private translateService: TranslateService

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private estadoResultadoService: EstadoResultadoService,
    private messageService: MessageService,
    private printService: NgxPrintService
  ) {

    this.formularioPeriodoForm = this.fb.group({
      FechaInicio: ['', Validators.required],
      FechaFinal: ['', Validators.required],
    });


    this.CerrarPeriodoForm = this.fb.group({
      periodo: ['', Validators.required],
      zonal: new FormControl(),
      fecha_inicial: ['', Validators.required],
      fecha_final: ['', Validators.required],
      coordinador_pelom: ['', Validators.required],
      supervisor_cge: ['', Validators.required],
      turnos_comprometidos: ['', Validators.required],
      fecha_generacion: ['', Validators.required],
    });

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



  // ngAfterViewInit() {
  //   // Asegúrate de que la vista se haya inicializado antes de llamar al servicio de impresión
  //   this.printService.print(this.pdfContainer.nativeElement);
  // }

  // print() {
  //   this.printService.print(this.pdfContainer.nativeElement);
  // }


  print() {
    // Llama a la función de impresión del servicio ngxPrint
    //this.printService.print();
  }



  //   translate(lang: string) {
  //     this.translateService.use(lang);
  //     this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
  // }


  ngOnInit() {

    //this.translateService.setDefaultLang('es');

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



  customMonthFormatter(date: Date): string {

    console.log(date);

    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
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




  formateoFecha(fechaOriginal: string): string {

    const fechaParseada = new Date(fechaOriginal);

    const dia = fechaParseada.getDate().toString().padStart(2, '0');
    const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
    const año = fechaParseada.getFullYear();

    const fechaFormateada = `${año}-${mes}-${dia}`;

    console.log("fechaFormateada", fechaFormateada);

    return fechaFormateada;

  }


  async ConsultarEstadoResultado() {

    this.cdr.detectChanges();

    this.submitted = true;

    console.log("Agregar Reporte Estado");

    let nuevaConsulta = this.formularioPeriodoForm.value;

    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Buscando...', life: 3000 });


    if (typeof nuevaConsulta.FechaInicio === 'string') {

      // El campo es de tipo texto (string)
      console.log('Es una cadena de texto');
      let arrayFecha = nuevaConsulta.FechaInicio.split("-");
      
      // Formatea la fecha en el formato deseado
      nuevaConsulta.FechaInicio = `${arrayFecha[0]}-${arrayFecha[1]}-${arrayFecha[2]}`;

      // Puedes realizar operaciones específicas para cadenas de texto si es necesario
    } else if (nuevaConsulta.FechaInicio instanceof Date) {

      // El campo es de tipo Date
      console.log('Es un objeto Date');
      nuevaConsulta.FechaInicio = this.formateoFecha(nuevaConsulta.FechaInicio);

    }


    if (typeof nuevaConsulta.FechaFinal === 'string') {

      // El campo es de tipo texto (string)
      console.log('Es una cadena de texto');
      let arrayFecha = nuevaConsulta.FechaFinal.split("-");
      
      // Formatea la fecha en el formato deseado
      nuevaConsulta.FechaFinal = `${arrayFecha[0]}-${arrayFecha[1]}-${arrayFecha[2]}`;

      // Puedes realizar operaciones específicas para cadenas de texto si es necesario
    } else if (nuevaConsulta.FechaFinal instanceof Date) {

      // El campo es de tipo Date
      console.log('Es un objeto Date');
      nuevaConsulta.FechaFinal = this.formateoFecha(nuevaConsulta.FechaFinal);

    }


    console.log('nuevaConsulta:', nuevaConsulta);


    await this.estadoResultadoService.CARGOFIJOSEMANALPORBRIGADA().subscribe({
      next: (data) => {
        console.log("DATOS CARGOFIJOSEMANALPORBRIGADA", data);
        this.CARGOFIJOSEMANALPORBRIGADA = data;
      }, error: (e) => console.error(e)
    });



    await this.estadoResultadoService.PERMANENICACARGOFIJOSEMANALPORBRIGADA(nuevaConsulta).subscribe({
      next: (data) => {
        
        console.log("DATOS PERMANENICACARGOFIJOSEMANALPORBRIGADA", data);
        this.PERMANENICACARGOFIJOSEMANALPORBRIGADA = data.detalle;
        this.PERMANENICACARGOFIJOSEMANALPORBRIGADA_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });



    await this.estadoResultadoService.OBSERVACIONES().subscribe({
      next: (data) => {
        console.log("DATOS OBSERVACIONES", data);
        this.OBSERVACIONES = data;
      }, error: (e) => console.error(e)
    });



    await this.estadoResultadoService.HORASEXTRAS(nuevaConsulta).subscribe({
      next: (data) => {
        
        console.log("DATOS HORASEXTRAS", data);
        this.HORASEXTRAS = data.detalle;
        this.HORASEXTRAS_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    await this.estadoResultadoService.TURNOSADICIONALES(nuevaConsulta).subscribe({
      next: (data) => {

        console.log("DATOS TURNOSADICIONALES", data);
        this.TURNOSADICIONALES = data.detalle;
        this.TURNOSADICIONALES_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    await this.estadoResultadoService.TURNOSCONTINGENCIA(nuevaConsulta).subscribe({
      next: (data) => {

        console.log("DATOS TURNOSCONTINGENCIA", data);
        this.TURNOSCONTINGENCIA = data.detalle;
        this.TURNOSCONTINGENCIA_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    await this.estadoResultadoService.PRODUCCIONPxQ(nuevaConsulta).subscribe({
      next: (data) => {

        console.log("DATOS PRODUCCIÓNPxQ", data);
        this.PRODUCCIONPxQ = data.detalle;
        this.PRODUCCIONPxQ_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });



    await this.estadoResultadoService.COBROSADICIONALES(nuevaConsulta).subscribe({
      next: (data) => {

        console.log("DATOS COBROSADICIONALES", data);
        this.COBROSADICIONALES = data.detalle;
        this.COBROSADICIONALES_TOTAL = data.subtotal;

      }, error: (e) => console.error(e)
    });


    await this.estadoResultadoService.DESCUENTOS(nuevaConsulta).subscribe({
      next: (data) => {

        console.log("DATOS DESCUENTOS", data);
        this.DESCUENTOS = data.detalle;
        this.DESCUENTOS_TOTAL = data.subtotal;
        
      }, error: (e) => console.error(e)
    });


    await this.estadoResultadoService.RESUMEN(nuevaConsulta).subscribe({
      next: (data) => {
        console.log("DATOS RESUMEN", data);
        this.RESUMEN = data.detalle;
      }, error: (e) => console.error(e)
    });


  }




  CrearEstadoResultado(formularioPeriodoForm) {

    this.cdr.detectChanges();


    console.log("FORMULARIO:", formularioPeriodoForm.value)

    const today = new Date();

    let year = today.getFullYear().toString().slice(-4); // Obtiene los dos últimos dígitos del año
    let month = ('0' + (today.getMonth() + 1)).slice(-2); // Añade un cero inicial si el mes es < 10
    let day = ('0' + today.getDate()).slice(-2); // Añade un cero inicial si el día es < 10

    const formattedDate = `${month}-${day}-${year}`;

    this.CerrarPeriodoForm.reset();

    this.cierrePeriodoInterface = {
      periodo: '',
      zonal: this.zonas[0],
      fecha_inicial: formularioPeriodoForm.value.FechaInicio,
      fecha_final: formularioPeriodoForm.value.FechaFinal,
      coordinador_pelom: '',
      supervisor_cge: '',
      turnos_comprometidos: '',
      fecha_generacion: formattedDate,
    }

    console.log("this.cierrePeriodoInterface", this.cierrePeriodoInterface);

    this.CerrarPeriodoForm.patchValue(this.cierrePeriodoInterface);

    this.CerrarPeriodoDialog = true;

  }



  onGuardarClick() {

    this.cdr.detectChanges();


    this.loading = true;

    if (this.CerrarPeriodoForm.valid) {

      const datoscerrarperiodo = this.CerrarPeriodoForm.value;

      const periodoValue = this.CerrarPeriodoForm.get('periodo')?.value;

      // Mapear el número del mes a su nombre correspondiente
      const monthNames = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
      ];

      const monthNumber = periodoValue.getMonth();
      const monthName = monthNames[monthNumber];

      // Extraer el año
      const year = periodoValue.getFullYear();

      // Formatear el valor para el servidor (por ejemplo, "Noviembre-2023")
      const formattedValue = `${monthName}-${year}`;

      datoscerrarperiodo.periodo = formattedValue;

      console.log('Nueva:', datoscerrarperiodo);

      this.estadoResultadoService.createEstadoResultado(datoscerrarperiodo).subscribe(
        (response) => {

          // Manejar la respuesta exitosa
          console.log('Obra guardada con éxito:', response);

          this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

          this.loading = false

          this.CerrarPeriodoDialog = false;

        },
        (error) => {

          // Manejar errores
          console.error('Error al guardar la obra:', error);

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

    this.loading = false

  }


  ConfirmoCerrarPeriodo() {

    this.cdr.detectChanges();


    this.loading = true;

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
        this.loading = false
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


