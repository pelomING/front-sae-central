import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { VisitaTerreno } from '../../../interfaces/visita-terreno.interface';
import { Obra } from '../../../interfaces/obra.interface';

import { AgendaService } from '../../../services/agenda.service';
import { ObrasService } from '../../../services/obras.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
    selector: 'app-agendas-page',
    templateUrl: './agendas-page.component.html',
    styleUrls: ['./agendas-page.component.scss']
})

export class AgendasPageComponent implements OnInit {


    productDialog: boolean;
    submitted: boolean;
    statuses: any[];
    visitasterreno: VisitaTerreno[];
    cols: any[] = [];
    visitaTerrenoForm: FormGroup;
    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;
    obras: Obra[];


    constructor(
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


    private codigo_vista = 222;

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

    openNew() {

        this.mostrarGuardar = true;
        this.mostrarActualizar = false;
        this.visitaTerrenoForm.reset();

        this.submitted = false;
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

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
