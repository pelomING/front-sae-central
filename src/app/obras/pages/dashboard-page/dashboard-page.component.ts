import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/productservice';
import { ObrasService } from '../../services/obras.service';


import * as Highcharts from 'highcharts';

import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);





@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit {


    Highcharts: typeof Highcharts = Highcharts; // required


    productDialog: boolean;
    products: Product[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    statuses: any[];

    chartData: any;
    chartOptions: any;

    chartDataPie: any;
    chartOptionsPie: any;

    chartDataPie_maule_norte: any;
    chartDataPie_maule_sur: any;


    chartDataPie2: any;
    chartOptionsPie2: any;

    pieData: any;
    pieOptions: any;

    constructor(private productService: ProductService, private obrasService: ObrasService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

        this.listadoObras();


    }


    private codigo_vista = 111;

    graficas_resumen_estados: any;
    graficas_resumen_maule_norte: any;
    graficas_resumen_maule_sur: any;

    graficas_resumen_tipos_obra: any;
    graficas_resumen_mnorte_tipo_obra: any;
    graficas_resumen_msur_tipo_obra: any;

    obras_estados_total: any;
    obras_ingresadas: any;
    obras_visita_exitosa: any;
    obras_enfaena: any;
    obras_paralizadas: any;
    obras_finalizadas: any;
    obras_eliminadas: any;

    chartOptionsHighcharts: any;

    listadoObras() {
        this.obrasService.getResumenObras().subscribe(
            (Respuesta: any) => {


                console.log("Respuesta",Respuesta);

                this.graficas_resumen_estados = Respuesta.resumen_estados;


                this.graficas_resumen_tipos_obra = Respuesta.resumen_tipos_obra;
                
                this.graficas_resumen_mnorte_tipo_obra = Respuesta.resumen_mnorte_tipo_obra;
                
                this.graficas_resumen_msur_tipo_obra = Respuesta.resumen_msur_tipo_obra;


                console.log("this.graficas_resumen_estados",this.graficas_resumen_estados);

                this.obras_estados_total = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "TOTAL");
                this.obras_ingresadas = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "Ingresada");
                this.obras_visita_exitosa = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "Visita Reportada Exitosa");
                this.obras_enfaena = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "En Faena");
                this.obras_paralizadas = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "Paralizada");
                this.obras_finalizadas = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "Faena Finalizada");
                this.obras_eliminadas = this.graficas_resumen_estados.find((item: { estado: string; }) => item.estado === "Eliminada");

                
                this.graficas_resumen_maule_norte = Respuesta.resumen_maule_norte;  

                console.log("this.graficas_resumen_maule_norte",this.graficas_resumen_maule_norte);


                this.graficas_resumen_maule_sur = Respuesta.resumen_maule_sur;

                console.log("this.graficas_resumen_maule_sur",this.graficas_resumen_maule_sur);


                this.initChart();

            },
            (error: any) => {
                console.error('Error al obtener las obras:', error);
            }
        );
    }



    initChart() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        
        let porcentajes = this.graficas_resumen_estados.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        let estados = porcentajes.map((item: { estado: any; }) => item.estado);
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => parseFloat(item.porcentaje));

        this.chartDataPie = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };

        this.chartOptionsPie = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };



        porcentajes = this.graficas_resumen_maule_norte.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        estados = porcentajes.map((item: { estado: any; }) => item.estado);
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => parseFloat(item.porcentaje));
        
        this.chartDataPie_maule_norte = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };



        porcentajes = this.graficas_resumen_maule_sur.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        estados = porcentajes.map((item: { estado: any; }) => item.estado);
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => parseFloat(item.porcentaje));
        
        this.chartDataPie_maule_sur = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };





        // this.chartOptionsHighcharts = {
        //     chart: {
        //         type: 'line'
        //     },
        //     title: {
        //         text: 'My Chart'
        //     },
        //     series: [{
        //         data: [1, 2, 3, 4, 5]
        //     }]
        // };

        


    }



    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.products = this.products.filter((val) => val.id !== product.id);
                this.product = {};
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name.trim()) {
            if (this.product.id) {
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.image = 'product-placeholder.svg';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
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
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {

        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
        }

        return '';
    }

}
