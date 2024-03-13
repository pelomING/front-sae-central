import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Obra } from '../../../interfaces/obra.interface';

import { ConfirmationService, MessageService } from 'primeng/api';


import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/productservice';

import { ReporteDiarioService } from 'src/app/obras/services/reporte-diario.service';
import { ReporteDiario } from 'src/app/obras/interfaces/reporte-diario.interface';
import { EstadoPagoObrasService } from 'src/app/obras/services/estadopagoobras.service';


@Component({
    selector: 'app-generarestadopagoobras-page',
    templateUrl: './generarestadopagoobras-page.component.html',
    styleUrls: ['./generarestadopagoobras-page.component.scss'],
})

export class GenerarEstadoPagoObrasPageComponent implements OnInit {

    @ViewChild('pdfContainer') pdfContainer!: ElementRef;

    products: Product[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    statuses: any[];


    obras: Obra[];
    obra: Obra;
    cols: any[] = [];
    ejecutado: boolean = false;

    listaReportesDiarios: ReporteDiario[];

    reportesdiariosseleccionados: ReporteDiario[];


    LISTA_ACTIVIDADES: [];
    LISTA_ACTIVIDADES_ADICIONALES: [];
    LISTA_ACTIVIDADES_CONHORASEXTRA: [];
    NUEVOENCABEZADO: any[];

    AVANCESESTADOPAGO: any[];
    TOTALESESTADOPAGO: any;


    constructor(private productService: ProductService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private reporteDiarioService: ReporteDiarioService,
        private estadoPagoObrasService: EstadoPagoObrasService,
        private confirmationService: ConfirmationService) {



        this.estadoPagoObrasService.getAlltiporecargo().subscribe(
            (respuesta: any) => {
                console.log("respuesta getAlltiporecargo : ", respuesta);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllrecargos().subscribe(
            (respuesta: any) => {
                console.log("respuesta : getAllrecargos", respuesta);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );





        if (!this.ejecutado) {
            this.route.queryParams.subscribe(params => {
                const navigationExtras = this.router.getCurrentNavigation()?.extras;
                if (navigationExtras && navigationExtras.state) {
                    
                    this.obra = this.router.getCurrentNavigation().extras.state['obra'];
                    localStorage.setItem('obra', JSON.stringify(this.obra));

                    this.reportesdiariosseleccionados = this.router.getCurrentNavigation().extras.state['reportesdiariosseleccionados'];
                    localStorage.setItem('reportesdiariosseleccionados', JSON.stringify(this.reportesdiariosseleccionados));

                }
                this.ejecutado = true;
            });
        }


    }


    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));

        this.obra = JSON.parse(localStorage.getItem('obra'));
        console.log("obra", this.obra);

        this.reportesdiariosseleccionados = JSON.parse(localStorage.getItem('reportesdiariosseleccionados'));
        console.log("reportesdiariosseleccionados", this.reportesdiariosseleccionados);


        this.estadoPagoObrasService.getNuevoencabezado(this.obra.id).subscribe(
            (respuesta: any) => {

                this.NUEVOENCABEZADO = respuesta;

                if (this.NUEVOENCABEZADO && this.NUEVOENCABEZADO.length > 0) {

                    console.log("respuesta getNuevoencabezado : ", this.NUEVOENCABEZADO[0]);

                }
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllactividadesporobra(this.obra.id,this.reportesdiariosseleccionados.toString()).subscribe(
            (respuesta: any) => {
                this.LISTA_ACTIVIDADES = respuesta;
                //console.log("this.LISTA_ACTIVIDADES",this.LISTA_ACTIVIDADES);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllactividadesadicionales(this.obra.id,this.reportesdiariosseleccionados.toString()).subscribe(
            (respuesta: any) => {
                this.LISTA_ACTIVIDADES_ADICIONALES = respuesta;
                //console.log("this.LISTA_ACTIVIDADES_ADICIONALES",this.LISTA_ACTIVIDADES_ADICIONALES);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllactividadesconhoraextra(this.obra.id,this.reportesdiariosseleccionados.toString()).subscribe(
            (respuesta: any) => {
                this.LISTA_ACTIVIDADES_CONHORASEXTRA = respuesta;
                //console.log("this.LISTA_ACTIVIDADES_CONHORASEXTRA",this.LISTA_ACTIVIDADES_CONHORASEXTRA);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );


        this.estadoPagoObrasService.getAvancesestadopago(this.obra.id).subscribe(
            (respuesta: any) => {

                this.AVANCESESTADOPAGO = respuesta;
                console.log("this.AVANCESESTADOPAGO",this.AVANCESESTADOPAGO);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );


        this.estadoPagoObrasService.getTotalesestadopago(this.obra.id,this.reportesdiariosseleccionados.toString()).subscribe(
            (respuesta: any) => {

                this.TOTALESESTADOPAGO = respuesta;
                console.log("this.TOTALESESTADOPAGO",this.TOTALESESTADOPAGO);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );




        this.cargarListadoReportesDiarios();

        this.cols = [
            { field: 'nombre_obra', header: 'Nombre Obra' },
            { field: 'codigo_obra', header: 'Codigo' },
            { field: 'numero_ot', header: 'N° OT' },
            { field: 'monto', header: 'Monto' },
            { field: 'estado.nombre', header: 'Estado' }
        ];

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

    cargarListadoReportesDiarios() {
        this.reporteDiarioService.getAllReportesDiariosPorObra(this.obra).subscribe(
            (VisitasTerreno: any) => {
                //console.log("listaReportesDiarios", VisitasTerreno);
                this.listaReportesDiarios = VisitasTerreno.sort((a, b) => b.id - a.id);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );
    }

    goBack() {
        window.history.back();
    }


    DialogConfirmarCrearEstadoPago: boolean = false;


    onCrearEstadoPago(){

        this.DialogConfirmarCrearEstadoPago = true;

    }



    Confirma_CrearEstadoPago(NUEVOENCABEZADO: any) {

        console.log("this.NUEVOENCABEZADO", NUEVOENCABEZADO[0]);

        const ENCABEZADO_OBRAS =  NUEVOENCABEZADO[0]

        ENCABEZADO_OBRAS.ids_reporte = this.reportesdiariosseleccionados.toString();

        this.estadoPagoObrasService.postcreaEstadoPagoObras(ENCABEZADO_OBRAS).subscribe(
            (response: any) => {
                
                // Manejar la respuesta exitosa
                console.log('éxito:', response);
                this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });
                this.DialogConfirmarCrearEstadoPago = true;

                // Recargar la página después de un breve retraso (3000 milisegundos en este ejemplo)
                setTimeout(() => {
                    this.router.navigate(['/obras/estadopago'], { replaceUrl: true });  // Cambia '/'' por la ruta que desees
                }, 3000);              
            
            },
            (error) => {
                
                console.error('Error al guardar :', error);

                //this.loading = false;

                this.messageService.add({
                    severity: 'error',
                    summary: 'Error : ' + error.status,
                    detail: 'Por favor, intentar mas tarde problemas de servicio : ' + error.error,
                });

            }
        );

    }



}
