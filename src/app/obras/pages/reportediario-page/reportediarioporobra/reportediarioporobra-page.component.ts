import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../../interfaces/obra.interface';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/productservice';

import { ReporteDiario,Tipooperacion,Tipoactividad, Maestroactividad } from '../../../interfaces/reporte-diario.interface';

import { ReporteDiarioService } from '../../../services/reporte-diario.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-reportediarioporobra-page',
    templateUrl: './reportediarioporobra-page.component.html',
    styleUrls: ['./reportediarioporobra-page.component.scss'],
})

export class ReportediarioporobraPageComponent implements OnInit {


    productDialog: boolean;

    actividadesDialog: boolean;


    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    obras: Obra[];

    cols: any[] = [];

    obra: Obra;

    private ejecutado = false;

    listaReportesDiarios : ReporteDiario[];

    listaTipooperacion: Tipooperacion[];

    listaTipoactividad: Tipoactividad[];
    
    listaMaestroactividad: Maestroactividad[];



    constructor(private productService: ProductService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private router: Router,
        private reporteDiarioService: ReporteDiarioService,
        private confirmationService: ConfirmationService) 
        { 

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
        

        this.reporteDiarioService.getAllReportesDiariosPorObra(this.obra).subscribe(
            (VisitasTerreno: any) => {
                this.listaReportesDiarios = VisitasTerreno;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );


        this.reporteDiarioService.getAlltipooperacion().subscribe(
            (listado: any) => {
                this.listaTipooperacion = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );


        this.reporteDiarioService.getAlltipoactividad().subscribe(
            (listado: any) => {
                this.listaTipoactividad = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );


        this.reporteDiarioService.getAllmaestroactividad().subscribe(
            (listado: any) => {
                this.listaMaestroactividad = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.cols = [
            { field: 'nombre_obra', header: 'Nombre Obra' },
            { field: 'codigo_obra', header: 'Codigo' },
            { field: 'numero_ot', header: 'N° OT' },
            { field: 'monto', header: 'Monto' },
            { field: 'estado.nombre', header: 'Estado' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];

    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    openNewActividades(){

        this.actividadesDialog = true;

    }


    goBack() {
        window.history.back();
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
            case 'activo':
                return 'primary';
            case 'Visita Terreno coordinada':
                return 'success';
            case 'Lista para Iniciar faena':
                return 'help';
            case 'En Faena':
                return 'info';
            case 'Paralizada':
                return 'warning';
            case 'Estado Pago Enviado':
                return 'help';
            case 'Factura Emitida':
                return 'warning';
            case 'Factura Pagada':
                return 'warning';

        }

        return '';
    }


}
