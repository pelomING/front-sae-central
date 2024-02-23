import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ObrasService } from '../../services/obras.service';

import { Obra } from '../../interfaces/obra.interface';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
    selector: 'app-gestionedp-page',
    templateUrl: './gestionedp-page.component.html',
    styleUrls: ['./gestionedp-page.component.scss']
})

export class GestionEDPPageComponent implements OnInit {

    cerrarObraDialog: boolean;

    cols: any[] = [];

    cerrar_Obra_Form: FormGroup;

    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;

    obras: Obra[];

    constructor(
        private messageService: MessageService,
        public route: ActivatedRoute,
        private obrasService: ObrasService,
        private router: Router,
        private fb: FormBuilder,
        private confirmationService: ConfirmationService) {

        this.cerrar_Obra_Form = this.fb.group({
            id: [''],
            id_obra: [null, Validators.required],
            fecha_hora: [null, Validators.required],
            supervisor_responsable: [null, Validators.required],
            coordinador_responsable: [null, Validators.required],
            ito_mandante: [null, Validators.required],
            observacion: [null, Validators.required]
        });

    }



    private codigo_vista = 555;

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

        this.listadoObras();

        this.cols = [
            { field: 'nombre_obra', header: 'Nombre Obra' },
            { field: 'codigo_obra', header: 'Codigo' },
            { field: 'numero_ot', header: 'N° OT' },
            { field: 'monto', header: 'Monto' },
            { field: 'estado.nombre', header: 'Estado' }
        ];

    }




    id_obra_paraliza = 0;
    codigo_obra = '';
    nombre_obra = '';

    OpenFormCerrarObra(obra: Obra) {

        this.cerrar_Obra_Form.reset();

        this.codigo_obra = obra.codigo_obra;

        this.nombre_obra = obra.nombre_obra;

        this.cerrar_Obra_Form.patchValue({
            id_obra: obra?.id || ''
        });

        this.cerrarObraDialog = true;

    }




    loading_cerrar_Obra_Form: boolean = false;

    onCerrarObraClick() {

        this.loading_cerrar_Obra_Form = true;

        setTimeout(() => {
            this.loading_cerrar_Obra_Form = false
        }, 2000);

        if (this.cerrar_Obra_Form.valid) {

            const registroCerrarObra = this.cerrar_Obra_Form.value;

            console.log('registroCerrarObra:', registroCerrarObra);

            this.obrasService.Cierraobra(registroCerrarObra).subscribe(
                (response) => {

                    // Manejar la respuesta exitosa
                    console.log('Obra Cerrada con éxito:', response);

                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

                    this.loading_cerrar_Obra_Form = false

                    this.cerrarObraDialog = false;

                    this.listadoObras();

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar la obra:', ObjError);

                    this.loading_cerrar_Obra_Form = false

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos : ' + ObjError.error,
                    });

                }
            )

        } else {

            this.loading_cerrar_Obra_Form = false

            // El formulario es inválido, muestra errores si es necesario
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Por favor, completa el formulario correctamente',
            });

        }

    }



    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
