import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import * as XLSX from 'xlsx';


import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../interfaces/obra.interface';

import { Product } from '../../interfaces/product.interface';
import { ProductService } from '../../services/productservice';

import { MaterialesObrasService } from '../../services/materiales-obras.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';



@Component({
    selector: 'app-materiales-page',
    templateUrl: './materiales-page.component.html',
    styleUrls: ['./materiales-page.component.scss'],
})

export class MaterialesPageComponent implements OnInit {

    productDialog: boolean;

    products: Product[];

    product: Product;

    selectedProducts: Product[];

    submitted: boolean;

    statuses: any[];

    obras: Obra[];

    cols: any[] = [];

    formObraDialog: boolean;

    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;

    obraForm: FormGroup;


    constructor(private productService: ProductService,
        private materialesObrasService: MaterialesObrasService,
        private fb: FormBuilder,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) {




            this.obraForm = this.fb.group({
                id: [''],
                codigo_obra: ['', Validators.required],
                numero_ot: ['', Validators.required],
                nombre_obra: ['', Validators.required],
                zona: ['', Validators.required],
                delegacion: ['', Validators.required],
                gestor_cliente: ['', Validators.required],
                numero_aviso: ['', Validators.required],
                numero_oc: ['', Validators.required],
                monto: ['', Validators.required],
                cantidad_uc: ['', Validators.required],
                fecha_llegada: ['', Validators.required],
                fecha_inicio: ['', Validators.required],
                fecha_termino: ['', Validators.required],
                tipo_trabajo: ['', Validators.required],
                persona_envia_info: ['', Validators.required],
                cargo_persona_envia_info: ['', Validators.required],
                empresa_contratista: ['', Validators.required],
                coordinador_contratista: ['', Validators.required],
                comuna: ['', Validators.required],
                ubicacion: ['', Validators.required],
                estado: ['', Validators.required],
                tipo_obra: ['', Validators.required],
                segmento: ['', Validators.required]
            });




         }

    ngOnInit() {

        this.productService.getProducts().then((data) => (this.products = data));


        this.materialesObrasService.getAllObras().subscribe(
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




    onFileUpload(event: any) {
        const file = event.files[0]; // Obtén el archivo Excel desde el evento
      
        const reader = new FileReader();
      
        reader.onload = (e: any) => {
          const bstr: string = e.target.result;
          const workbook = XLSX.read(bstr, { type: 'binary' });
      
          // Aquí puedes procesar el archivo Excel (workbook) según tus necesidades.
          // Por ejemplo, puedes recorrer las hojas, extraer datos, etc.
        };
      
        reader.readAsBinaryString(file);
      }

      

    openNew() {
        this.mostrarGuardar = true;
        this.mostrarActualizar = false;
        this.obraForm.reset();
        this.formObraDialog = true;
    }


    formateoFecha(fechaOriginal: string): string {
        const fechaParseada = new Date(fechaOriginal);
        const dia = fechaParseada.getDate().toString().padStart(2, '0');
        const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
        const año = fechaParseada.getFullYear();
        const fechaFormateada = `${mes}/${dia}/${año}`;
        console.log(fechaFormateada); // Esto mostrará "10/03/2023" en la consola

        return fechaFormateada;
    }


    editProduct(obra: Obra) {

        this.obraForm.reset();

        this.mostrarGuardar = false;
        this.mostrarActualizar = true;

        obra.fecha_inicio = this.formateoFecha(obra.fecha_inicio);
        obra.fecha_llegada = this.formateoFecha(obra.fecha_llegada);
        obra.fecha_termino = this.formateoFecha(obra.fecha_termino);

        this.obraForm.patchValue(obra);
        this.formObraDialog = true;

    }



    hideDialog() {
        this.formObraDialog = false;
        this.submitted = false;
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
