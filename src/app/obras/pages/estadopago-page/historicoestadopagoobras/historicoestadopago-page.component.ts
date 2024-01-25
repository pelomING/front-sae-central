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
    

    constructor(private productService: ProductService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
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

        this.cargarListadoReportesDiarios();


        this.cols = [
            { field: 'nombre_obra', header: 'Nombre Obra' },
            { field: 'codigo_obra', header: 'Codigo' },
            { field: 'numero_ot', header: 'N° OT' },
            { field: 'monto', header: 'Monto' },
            { field: 'estado.nombre', header: 'Estado' }
        ];



    }



    cargarListadoReportesDiarios() {

        this.reporteDiarioService.getAllReportesDiariosPorObra(this.obra).subscribe(
            (VisitasTerreno: any) => {
                console.log("VisitasTerreno", VisitasTerreno);
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



    openNewEstadodePago(obra: Obra)
    {

        console.log("OBRA",obra)

        const navigationExtras: NavigationExtras = {
            state: {
                obra: obra
            }
        };

        this.router.navigate(['/obras/generarestadopagoobras'],navigationExtras);

    }



}