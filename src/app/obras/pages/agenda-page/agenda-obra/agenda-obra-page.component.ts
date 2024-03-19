import { Component, Inject, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute, NavigationEnd, NavigationExtras } from '@angular/router';
import { Observable, filter, take } from 'rxjs';

import { Product } from '../../../interfaces/product.interface';
import { VisitaTerreno, Estado, VisitaTerrenoCrear } from '../../../interfaces/visita-terreno.interface';
import { Obra } from '../../../interfaces/obra.interface';

import { AgendaService } from '../../../services/agenda.service';
import { ProductService } from 'src/app/obras/services/productservice';


@Component({
    selector: 'app-agenda-obra-page',
    templateUrl: './agenda-obra-page.component.html',
    styleUrls: ['./agenda-obra-page.component.scss']
})

export class AgendaObraPageComponent implements OnInit {

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
    visitaterreno: VisitaTerreno;

    mostrarIngresarNuevoRegistro: boolean = false; 


    currentState$: Observable<any>;
    detailProduct: any;

    private ejecutado = false;

    estadosvisitasterreno: Estado[] | undefined;
    obra: Obra;
    newVisitaTerreno: VisitaTerrenoCrear;


    constructor(

        private productService: ProductService,
        
        public route: ActivatedRoute,
        private router: Router,
        private agendaService: AgendaService,
        private messageService: MessageService,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService) {


        this.visitaTerrenoForm = this.fb.group({
            id: [''],  
            id_obra: ['', Validators.required],
            fecha_visita: ['', Validators.required],
            direccion: ['', Validators.required],
            persona_mandante: ['', Validators.required],
            cargo_mandante: ['', Validators.required],
            persona_contratista: ['', Validators.required],
            cargo_contratista: ['', Validators.required],
            observacion: ['', Validators.required]
        });


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


        this.obra = JSON.parse(localStorage.getItem('obra'));

        this.agendaService.getAllVisitasTerrenoPorObra(this.obra).subscribe(
            (VisitasTerreno: any) => {

                this.visitasterreno = VisitasTerreno;

                if(this.visitasterreno.length > 0) this.mostrarIngresarNuevoRegistro = false; else this.mostrarIngresarNuevoRegistro = true; 

            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.agendaService.getAllEstadosVisitas().subscribe(
            (estadosvisitasterreno: any) => {
                this.estadosvisitasterreno = estadosvisitasterreno;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.cols = [
            { field: 'fecha_visita', header: 'fecha_visita' },
            { field: 'direccion', header: 'direccion' },
            { field: 'persona_mandante', header: 'persona_mandante' },
            { field: 'cargo_mandante', header: 'cargo_mandante' },
            { field: 'persona_contratista', header: 'persona_contratista' },
            { field: 'cargo_contratista', header: 'cargo_contratista' },
            { field: 'observacion', header: 'observacion' },
            { field: 'estado', header: 'estado' }
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

        this.obra = JSON.parse(localStorage.getItem('obra'));

        const newVisitaTerreno: VisitaTerrenoCrear = {
            id: null,
            id_obra: this.obra.id,
            fecha_visita: null,
            direccion: null,
            persona_mandante: null,
            cargo_mandante: null,
            persona_contratista: null,
            cargo_contratista: null,
            observacion: null
        };

        this.visitaTerrenoForm.patchValue(newVisitaTerreno);

        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }



    formateoFecha(fechaOriginal: string): string {

        const fecha = fechaOriginal; //"2023-10-31";
        const partes = fecha.split("-");
        const anio = partes[0];
        const mes = partes[1];
        const dia = partes[2];

        const fechaFormateada = `${dia}-${mes}-${anio}`;
        return fechaFormateada;

    }


    editProduct(visitaterreno: VisitaTerreno) {

        this.visitaTerrenoForm.reset();
        this.mostrarGuardar = false;
        this.mostrarActualizar = true;

        const newVisitaTerreno: VisitaTerrenoCrear = {
            id: visitaterreno.id,
            id_obra: visitaterreno.id_obra.id,
            fecha_visita: this.formateoFecha(visitaterreno.fecha_visita),
            direccion: visitaterreno.direccion,
            persona_mandante: visitaterreno.persona_mandante,
            cargo_mandante: visitaterreno.cargo_mandante,
            persona_contratista: visitaterreno.persona_contratista,
            cargo_contratista: visitaterreno.cargo_contratista,
            observacion: visitaterreno.observacion
        };

        this.visitaTerrenoForm.patchValue(newVisitaTerreno);
        this.productDialog = true;

    }


    nomostrar: boolean = true;
    
    verVisitaTerreno(visitaterreno: VisitaTerreno) {

        this.visitaTerrenoForm.reset();
        this.mostrarGuardar = false;
        this.mostrarActualizar = false;

        const newVisitaTerreno: VisitaTerrenoCrear = {
            id: visitaterreno.id,
            id_obra: visitaterreno.id_obra.id,
            fecha_visita: this.formateoFecha(visitaterreno.fecha_visita),
            direccion: visitaterreno.direccion,
            persona_mandante: visitaterreno.persona_mandante,
            cargo_mandante: visitaterreno.cargo_mandante,
            persona_contratista: visitaterreno.persona_contratista,
            cargo_contratista: visitaterreno.cargo_contratista,
            observacion: visitaterreno.observacion
        };

        this.visitaTerrenoForm.patchValue(newVisitaTerreno);
        this.productDialog = true;

    }


    loading: boolean = false;

    onGuardarClick() {

        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);


        if (this.visitaTerrenoForm.valid) {

            const nuevaVisitaTerreno = this.visitaTerrenoForm.value;

            console.log('Nueva Visita Terreno:', nuevaVisitaTerreno);

            nuevaVisitaTerreno.fecha_visita = this.formateoFechaEnviar(nuevaVisitaTerreno.fecha_visita);



            this.agendaService.createVisitaTerreno(nuevaVisitaTerreno).subscribe(
                (response) => {
                    // Manejar la respuesta exitosa
                    console.log('Obra guardada con éxito:', response);

                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

                    this.productDialog = false;

                    this.obra = JSON.parse(localStorage.getItem('obra'));

                    this.agendaService.getAllVisitasTerrenoPorObra(this.obra).subscribe(
                        (VisitasTerreno: any) => {
                            this.visitasterreno = VisitasTerreno;
                        }
                    );

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al eliminar reporte :', ObjError);

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos:' + ObjError.error,
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
    }



    fechaFormateada: string;

    formateoFechaEnviar(fechaOriginal: string | number | Date) {

        this.fechaFormateada = '';

        if (typeof fechaOriginal === 'string') {

            // El campo es de tipo texto (string)
            //console.log('Es una cadena de texto');

            let arrayFecha = fechaOriginal.split("-");

            // Formatea la fecha en el formato deseado
            this.fechaFormateada = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]}`;

        } else if (fechaOriginal instanceof Date) {

            // El campo es de tipo Date
            //console.log('Es un objeto Date');

            const fechaParseada = new Date(fechaOriginal);

            const dia = fechaParseada.getDate().toString().padStart(2, '0');
            const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaParseada.getFullYear();

            this.fechaFormateada = `${año}-${mes}-${dia}`;

        }

        console.log("fechaFormateada", this.fechaFormateada);

        return this.fechaFormateada;

    }


    onActualizarClick() {

        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);


        if (this.visitaTerrenoForm.valid) {

            const updatedVisitaTerreno = this.visitaTerrenoForm.value;

            updatedVisitaTerreno.fecha_visita = this.formateoFechaEnviar(updatedVisitaTerreno.fecha_visita);

            this.agendaService.updateVisitaTerreno(updatedVisitaTerreno).subscribe(
                (response) => {

                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

                    this.productDialog = false;

                    this.obra = JSON.parse(localStorage.getItem('obra'));

                    this.agendaService.getAllVisitasTerrenoPorObra(this.obra).subscribe(
                        (VisitasTerreno: any) => {
                            this.visitasterreno = VisitasTerreno;
                        }
                    );

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al eliminar reporte :', ObjError);

                    let arrayFecha = updatedVisitaTerreno.fecha_visita.split("-");

                    updatedVisitaTerreno.fecha_visita = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]

                    this.visitaTerrenoForm.patchValue(updatedVisitaTerreno);

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos:' + ObjError.error,
                    });

                }
            );
        }
    }



    onEliminarClick(visitaterreno: VisitaTerreno) {

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar registro Id : ' + visitaterreno.id + ' ?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => { 

                this.agendaService.eliminaVisitaTerreno(visitaterreno).subscribe(
                    (response) => {

                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });

                        this.obra = JSON.parse(localStorage.getItem('obra'));

                        this.agendaService.getAllVisitasTerrenoPorObra(this.obra).subscribe(
                            (VisitasTerreno: any) => {
                                this.visitasterreno = VisitasTerreno;
                            }
                        );
                       
                    },
                    (ObjError) => {

                        // Manejar errores
                        console.error('Error al eliminar reporte :', ObjError);

                        this.messageService.add({
                            severity: 'info',
                            summary: 'Información : ' + ObjError.status,
                            detail: 'Por favor, verifique los siguientes datos:' + ObjError.error,
                        });

                    }
                );

            }
        });

    }



    navegarAPagina2() {
        this.router.navigate(['/pagina2']);
    }


    goBack() {
        window.history.back();
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
            case 'AGENDADA':
                return 'primary';
            case 'EN EJECUCIÓN':
                return 'success';
            case 'CANCELADA':
                return 'help';
            case 'FALLIDA':
                return 'info';
            case 'POSTERGADA':
                return 'warning';
            case 'EFECTUADA OK':
                return 'help';
        }

        return '';
    }


    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
