import { Component, OnInit } from '@angular/core';
import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../../interfaces/obra.interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ObrasService } from 'src/app/obras/services/obras.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/productservice';
import { ReporteDiarioService } from 'src/app/obras/services/reporte-diario.service';
import { ReporteDiario } from 'src/app/obras/interfaces/reporte-diario.interface';
import { EstadoPagoObrasService } from 'src/app/obras/services/estadopagoobras.service';


@Component({
    selector: 'app-historicoestadopago-page',
    templateUrl: './historicoestadopago-page.component.html',
    styleUrls: ['./historicoestadopago-page.component.scss'],
})

export class HistoricoEstadoPagoPageComponent implements OnInit {


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

    listaestadospago: [];

    display = false;


    constructor(private productService: ProductService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private estadoPagoObrasService: EstadoPagoObrasService,
        private reporteDiarioService: ReporteDiarioService,
        private obrasService: ObrasService,
        private confirmationService: ConfirmationService) {




        if (!this.ejecutado) {
            this.route.queryParams.subscribe(params => {
                const navigationExtras = this.router.getCurrentNavigation()?.extras;
                if (navigationExtras && navigationExtras.state) {
                    this.obra = this.router.getCurrentNavigation().extras.state['obra'];
                    localStorage.setItem('obra', JSON.stringify(this.obra));
                }
                this.ejecutado = true;
            });
        }


    }


    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));
        this.obra = JSON.parse(localStorage.getItem('obra'));
        console.log("obra", this.obra);

        this.cargarListadoEstadodePago();


        this.cols = [
            { field: 'nombre_obra', header: 'Nombre Obra' },
            { field: 'codigo_obra', header: 'Codigo' },
            { field: 'numero_ot', header: 'N° OT' },
            { field: 'monto', header: 'Monto' },
            { field: 'estado.nombre', header: 'Estado' }
        ];



    }



    cargarListadoEstadodePago() {
        this.estadoPagoObrasService.getListaestadospago(this.obra.id).subscribe(
            (VisitasTerreno: any) => {
                console.log("VisitasTerreno", VisitasTerreno);
                this.listaestadospago = VisitasTerreno.sort((a, b) => b.id - a.id);
            },
            (error) => {
                console.error('Error al obtener listaestadospago:', error);
            }
        );
    }



    goBack() {
        window.history.back();
    }



    openNewEstadodePago(obra: Obra) {

        console.log("OBRA", obra)

        const navigationExtras: NavigationExtras = {
            state: {
                obra: obra
            }
        };

        this.router.navigate(['/obras/generarestadopagoobras'], navigationExtras);

    }



    openSelecionarReportesDiariosPorObra(obra: Obra) {

        console.log("OBRA", obra)

        const navigationExtras: NavigationExtras = {
            state: {
                obra: obra
            }
        };

        this.router.navigate(['/obras/selecionarreportediarioobras'], navigationExtras);

    }


    


    NUEVOENCABEZADO: any;
    LISTA_ACTIVIDADES: [];
    LISTA_ACTIVIDADES_ADICIONALES: [];
    LISTA_ACTIVIDADES_CONHORASEXTRA: [];

    AVANCESESTADOPAGO: any[];
    TOTALESESTADOPAGO: any;

    IDESTADOPAGO: number;


    openReporteEstadoPago(estadopago: any) {

        this.IDESTADOPAGO = estadopago.id;
        this.display = true;  
        
    }

    hideDialog() {

    }

    onDialogShow() {

        this.estadoPagoObrasService.getHistoricoestadopagoporid(this.IDESTADOPAGO).subscribe({
            next: (data) => {
      
                console.log("Historicoestadopagoporid", data);

                this.NUEVOENCABEZADO = data.encabezado;

                this.LISTA_ACTIVIDADES = data.actividades_por_obra;
                
                this.LISTA_ACTIVIDADES_ADICIONALES = data.actividades_adicionales;

                this.LISTA_ACTIVIDADES_CONHORASEXTRA = data.actividades_hora_extra;

                this.AVANCESESTADOPAGO = data.avances_estado_pago;

                this.TOTALESESTADOPAGO = data.totales;

            }, error: (e) => console.error(e)
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

}
