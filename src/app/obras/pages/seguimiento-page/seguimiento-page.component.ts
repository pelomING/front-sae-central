import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Product } from '../../interfaces/product.interface';
import { VisitaTerreno } from '../../interfaces/visita-terreno.interface';

import { ProductService } from '../../services/productservice';
import { AgendaService } from '../../services/agenda.service';

import { ObrasService } from '../../services/obras.service';

import { Obra } from '../../interfaces/obra.interface';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
    selector: 'app-seguimiento-page',
    templateUrl: './seguimiento-page.component.html',
    styleUrls: ['./seguimiento-page.component.scss']
})


export class SeguimientoPageComponent implements OnInit {


    productDialog: boolean;
    products: Product[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    statuses: any[];
    visitasterreno: VisitaTerreno[];
    cols: any[] = [];
    visitaTerrenoForm: FormGroup;
    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;
    obras: Obra[];


    constructor(private productService: ProductService,
        private agendaService: AgendaService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private obrasService: ObrasService,
        private router: Router,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService) {

        this.visitaTerrenoForm = this.fb.group({
            id_obra: [null, Validators.required],
            fecha_visita: [null, Validators.required],
            direccion: [null, Validators.required],
            persona_mandante: [null, Validators.required],
            cargo_mandante: [null, Validators.required],
            persona_contratista: [null, Validators.required],
            cargo_contratista: [null, Validators.required],
            observacion: [null],
            estado: [null, Validators.required],
            fecha_modificacion: [null]
        });

    }

    ngOnInit() {

        this.obrasService.getAllObras().subscribe(
            (Obras: any) => {
                console.log("Esto es la Obras:", Obras);
                this.obras = Obras;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
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

        this.mostrarGuardar = true;
        this.mostrarActualizar = false;
        this.visitaTerrenoForm.reset();

        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }


    navegarAPagina2(obra: Obra) {

        const navigationExtras: NavigationExtras = {
            state: {
                obra: obra
            }
        };

        this.router.navigate(['/obras/agenda-obra'], navigationExtras);

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


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
