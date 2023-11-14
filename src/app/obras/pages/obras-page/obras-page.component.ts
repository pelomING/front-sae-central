import { Component, ElementRef, OnInit } from '@angular/core';

import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Table } from 'primeng/table';

import { Product } from '../../interfaces/product.interface';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../interfaces/obra.interface';
  
import { ProductService } from '../../services/productservice';
import { ObrasService } from '../../services/obras.service';

@Component({
    selector: 'app-obras-page',
    templateUrl: './obras-page.component.html',
    styleUrls: ['./obras-page.component.scss'],
})

export class ObrasPageComponent implements OnInit {

    obraForm: FormGroup;
    formObraDialog: boolean;
    products: Product[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    statuses: any[];
    obras: Obra[];


    zonas: Zona[] | undefined;
    delegacion: Delegacion[] | undefined;
    tipotrabajos: Tipotrabajos[] | undefined;
    empresacontratistas: Empresacontratistas[] | undefined;
    coordinadorcontratistas: Coordinadorcontratistas[] | undefined;
    comuna: Comuna[] | undefined;
    estado: Estado[] | undefined;
    tipo_obra: Tipo_obra[] | undefined;
    segmento: Segmento[] | undefined;
    router: any;

    cols: any[] = [];

    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;


    constructor(private productService: ProductService,
        private el: ElementRef,
        private fb: FormBuilder,
        private obrasService: ObrasService,
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

        
        this.obrasService.getAllObras().subscribe(
            (Obras: any) => {
                console.log("Esto es la Obras:", Obras);
                this.obras = Obras;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllZonas().subscribe(
            (Zonas: any) => {
                console.log("Esto es la Zonas:", Zonas);
                this.zonas = Zonas;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllDelegaciones().subscribe(
            (Delegacion: any) => {
                console.log("Esto es la Delegacion:", Delegacion);
                this.delegacion = Delegacion;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllTipoTrabajos().subscribe(
            (Tipotrabajos: any) => {
                console.log("Esto es la Tipotrabajos:", Tipotrabajos);
                this.tipotrabajos = Tipotrabajos;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllEmpresaContratistas().subscribe(
            (Empresacontratistas: any) => {
                console.log("Esto es la Empresacontratistas:", Empresacontratistas);
                this.empresacontratistas = Empresacontratistas;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllCoordinadorContratistas().subscribe(
            (Coordinadorcontratistas: any) => {
                console.log("Esto es la Coordinadorcontratistas:", Coordinadorcontratistas);
                this.coordinadorcontratistas = Coordinadorcontratistas;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllComunas().subscribe(
            (Comuna: any) => {
                console.log("Esto es la Comuna:", Comuna);
                this.comuna = Comuna;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllEstados().subscribe(
            (Estado: any) => {
                console.log("Esto es la Estado:", Estado);
                this.estado = Estado;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllTipoObras().subscribe(
            (Tipo_obra: any) => {
                console.log("Esto es la Tipo_obra:", Tipo_obra);
                this.tipo_obra = Tipo_obra;
            },
            (error) => {
                console.error('Error al obtener las obras:', error);
            }
        );


        this.obrasService.getAllSegmentos().subscribe(
            (Segmento: any) => {
                console.log("Esto es la Segmento:", Segmento);
                this.segmento = Segmento;
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




    calendarFocused() {
        // Esta función se ejecutará cuando el calendario se enfoque o se muestre
        console.log('Calendario enfocado o mostrado');
    }



    openNew() {
        this.mostrarGuardar = true;
        this.mostrarActualizar = false;
        this.obraForm.reset();
        this.formObraDialog = true;
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


    onEliminarClick(obra: Obra) {

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar ' + obra.nombre_obra + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.obrasService.deleleObra(obra).subscribe(
                    (response) => { 
                        
                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });    
                        
                        this.obrasService.getAllObras().subscribe(
                            (Obras: any) => {
                                console.log("Esto es la Obras:", Obras);
                                this.obras = Obras;
                            },
                            (error) => {
                                console.error('Error al obtener las obras:', error);
                            }
                        );

                    },
                    (error) => {
    
                        // Manejar errores
                        console.error('Error al guardar la obra:', error);
    
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: 'Por favor, intentar mas tarde problemas de servicio',
                        });
    
                    }
                );





            }
        });

    }


    hideDialog() {
        this.formObraDialog = false;
        this.submitted = false;
    }



    loading: boolean = false;

    onGuardarClick() {

        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);


        if (this.obraForm.valid) {

            const nuevaObra = this.obraForm.value;

            console.log('Nueva obra:', nuevaObra);

            this.obrasService.createObra(nuevaObra).subscribe(
                (response) => {
                    // Manejar la respuesta exitosa
                    console.log('Obra guardada con éxito:', response);
                    
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

                    this.formObraDialog = false;
                    
                    this.obrasService.getAllObras().subscribe(
                        (Obras: any) => {
                            console.log("Esto es la Obras:", Obras);
                            this.obras = Obras;
                        },
                        (error) => {
                            console.error('Error al obtener las obras:', error);
                        }
                    );

                },
                (error) => {

                    // Manejar errores
                    console.error('Error al guardar la obra:', error);

                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Por favor, intentar mas tarde problemas de servicio',
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



    onActualizarClick() {

        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);


        if (this.obraForm.valid) {

            const updatedObra = this.obraForm.value; // Obtén los datos del formulario

            // Luego, puedes enviar los datos actualizados al servidor, por ejemplo, utilizando un servicio:
            this.obrasService.updateObra(updatedObra).subscribe(
                (response) => {

                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

                    this.formObraDialog = false;

                    this.obrasService.getAllObras().subscribe(
                        (Obras: any) => {
                            console.log("Esto es la Obras:", Obras);
                            this.obras = Obras;
                        },
                        (error) => {
                            console.error('Error al obtener las obras:', error);
                        }
                    );

                },
                (error) => {
                    // Manejar errores, por ejemplo, mostrar un mensaje de error
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'No se pudo actualizar la obra. Inténtelo de nuevo.',
                    });
                }
            );
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
