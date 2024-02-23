import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../interfaces/obra.interface';

import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/productservice';

import { ObrasService } from '../../services/obras.service';

import { ReporteDiarioService } from '../../services/reporte-diario.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
    selector: 'app-reportediario-page',
    templateUrl: './reportediario-page.component.html',
    styleUrls: ['./reportediario-page.component.scss'],
})

export class ReportediarioPageComponent implements OnInit {


    productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    obras: Obra[];

    cols: any[] = [];

    constructor(private productService: ProductService,
        private messageService: MessageService,
        private router: Router,
        private obrasService: ObrasService,
        private reporteDiarioService: ReporteDiarioService,
        private confirmationService: ConfirmationService) { }


    private codigo_vista = 333;

    listadoObras() {

        this.obrasService.getAllObras(this.codigo_vista).subscribe(
            (Obras: any) => {
                console.log("Esto es la Obras:", Obras);
                this.obras = Obras;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );

    }


    
    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));

        this.listadoObras();

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




    navegarAPagina2(obra: Obra) {

        const navigationExtras: NavigationExtras = {
            state: {
                obra: obra
            }
        };

        this.router.navigate(['/obras/reportediarioporobra'], navigationExtras);

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
