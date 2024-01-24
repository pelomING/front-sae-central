import { Component, OnInit } from '@angular/core';

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
        private estadoPagoObrasService: EstadoPagoObrasService,
        private confirmationService: ConfirmationService) { 



            this.estadoPagoObrasService.getAlltiporecargo().subscribe(
                (respuesta: any) => {
                    console.log("respuesta getAlltiporecargo : ",respuesta);
                },
                (error) => {
                    console.error('Error al obtener listado de reportes diarios:', error);
                }
            );

            this.estadoPagoObrasService.getAllrecargos().subscribe(
                (respuesta: any) => {
                    console.log("respuesta : getAllrecargos",respuesta);
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
                }
                this.ejecutado = true;
            });
        }


    }


    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));

        this.obra = JSON.parse(localStorage.getItem('obra'));
        
        console.log("obra", this.obra);




        this.estadoPagoObrasService.getNuevoencabezado(this.obra.id).subscribe(
            (respuesta: any) => {
                console.log("respuesta getNuevoencabezado : ",respuesta);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllactividadesporobra(this.obra.id).subscribe(
            (respuesta: any) => {
                console.log("respuesta : getAllactividadesporobra",respuesta);
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.estadoPagoObrasService.getAllactividadesadicionales(this.obra.id).subscribe(
            (respuesta: any) => {
                console.log("respuesta : getAllactividadesporobra",respuesta);
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





}
