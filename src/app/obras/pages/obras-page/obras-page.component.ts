import { Component, ElementRef, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento, OficinaSupervisor, RecargoPorDistancia } from '../../interfaces/obra.interface';

import { ObrasService } from '../../services/obras.service';

@Component({
    selector: 'app-obras-page',
    templateUrl: './obras-page.component.html',
    styleUrls: ['./obras-page.component.scss'],
})

export class ObrasPageComponent implements OnInit {

    obraForm: FormGroup;
    paralizarForm: FormGroup;
    cerrar_Obra_Form: FormGroup;

    formObraDialog: boolean;
        
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

    oficinaSupervisor: OficinaSupervisor[] | undefined;
    recargoPorDistancia: RecargoPorDistancia[] | undefined;

    OBRA: any;

    router: any;
    cols: any[] = [];


    mostrarGuardar: boolean = true; // Mostrar el botón por defecto

    mostrarActualizar: boolean = true;

    mostrarParalizarObra: boolean = true;

    mostrarTabParalizarObra: boolean = true;

    mostrarTabCerradoObra: boolean = true;

    mostrarBottonCerrarObra: boolean = true;

    mostrarDeleteObra: boolean = true;



    constructor(
        private el: ElementRef,
        private fb: FormBuilder,
        private obrasService: ObrasService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService) {

        this.obraForm = this.fb.group({
            id: [''],
            codigo_obra: ['', Validators.required],
            //numero_ot: ['', Validators.required],
            nombre_obra: ['', Validators.required],
            zona: ['', Validators.required],
            delegacion: ['', Validators.required],
            gestor_cliente: ['', Validators.required],
            numero_aviso: ['', Validators.required],
            numero_oc: ['', Validators.required],
            //monto: ['', Validators.required],
            cantidad_uc: ['', Validators.required],
            fecha_llegada: ['', Validators.required],
            fecha_inicio: ['', Validators.required],
            fecha_termino: ['', Validators.required],
            tipo_trabajo: ['', Validators.required],
            //persona_envia_info: ['', Validators.required],
            //cargo_persona_envia_info: ['', Validators.required],
            empresa_contratista: ['', Validators.required],
            coordinador_contratista: ['', Validators.required],
            comuna: ['', Validators.required],
            ubicacion: ['', Validators.required],
            tipo_obra: ['', Validators.required],
            segmento: ['', Validators.required],
            jefe_delegacion: ['', Validators.required],
            oficina: ['', Validators.required],
            recargo_distancia: ['', Validators.required]
        });


        this.paralizarForm = this.fb.group({
            id: [''],
            id_obra: ['', Validators.required],
            fecha_hora: ['', Validators.required],
            responsable: [''],
            motivo: ['', Validators.required],
            observacion: ['', Validators.required],
        });



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


    private codigo_vista = 111;

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


        // /api/obras/backoffice/general/v1/alloficinasupervisor
        this.obrasService.getAlloficinasupervisor().subscribe(
            (oficinas_supervisor: any) => {
                console.log("Esto es la oficinas:", oficinas_supervisor);
                this.oficinaSupervisor = oficinas_supervisor;
            },
            (error) => {
                console.error('Error al obtener las oficinas:', error);
            }
        );


        //  /api/obras/backoffice/general/v1/allrecargospordistancia
        this.obrasService.getAllrecargospordistancia().subscribe(
            (recargos: any) => {
                console.log("Esto es la recargos:", recargos);
                this.recargoPorDistancia = recargos;
            },
            (error) => {
                console.error('Error al obtener las recargos:', error);
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



    openNew() 
    {

        this.OBRA = 'Registar Nueva Obra';
 
        this.mostrarGuardar = true;
        this.mostrarActualizar = false;

        this.mostrarTabParalizarObra = false;
        this.mostrarTabCerradoObra = false;
 
        this.obraForm.reset();
        this.paralizarForm.reset();
        this.cerrar_Obra_Form.reset();

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


    id_obra_paraliza = 0;

    editObra(obra: any) {

        this.obraForm.reset();
        this.paralizarForm.reset();

        this.id_obra_paraliza = obra.id;

        this.OBRA = 'Modificar registros Obra Código : ' + obra.codigo_obra;

        this.mostrarGuardar = false;
        this.mostrarActualizar = true;

        obra.fecha_inicio = this.formateoFecha(obra.fecha_inicio);
        obra.fecha_llegada = this.formateoFecha(obra.fecha_llegada);
        obra.fecha_termino = this.formateoFecha(obra.fecha_termino);


        this.mostrarTabCerradoObra = false;


        console.log("obra.estado.nombre",obra.estado.nombre);


        this.mostrarTabParalizarObra = false;
        this.mostrarParalizarObra = false;

        
        if(obra.estado.nombre != "Ingresada")
        {
            this.mostrarTabParalizarObra = true;
            this.mostrarParalizarObra = true;
        }

        // Verifica si obra y obra_paralizada están definidos y si id es diferente de null o undefined
        // if (obra && obra.obra_paralizada && obra.obra_paralizada.id_obra != null) {
        //     this.mostrarParalizarObra = false;
        // } else {
        //     this.mostrarParalizarObra = true;
        // }

        this.paralizarForm.patchValue({
            id_obra: obra?.id || ''
        });


        this.obraForm.patchValue(obra);


        this.formObraDialog = true;

 
    }


    verObra(obra: any) {

        this.obraForm.reset();
        this.paralizarForm.reset();

        this.id_obra_paraliza = obra.id;

        this.OBRA = 'Registros Obra Código : ' + obra.codigo_obra;

        this.mostrarGuardar = false;
        this.mostrarActualizar = false;

        obra.fecha_inicio = this.formateoFecha(obra.fecha_inicio);
        obra.fecha_llegada = this.formateoFecha(obra.fecha_llegada);
        obra.fecha_termino = this.formateoFecha(obra.fecha_termino);


        // Verifica si obra y obra_paralizada están definidos y si id es diferente de null o undefined
        if (obra && obra.obra_paralizada && obra.obra_paralizada.id_obra != null) {
            this.mostrarTabParalizarObra = true;
            this.mostrarParalizarObra = false;
        } else {
            this.mostrarTabParalizarObra = false;
        }

        this.paralizarForm.patchValue({
            id_obra: obra?.id || '',
            fecha_hora: this.formateoFecha(obra?.obra_paralizada?.fecha_hora) || '',
            responsable: obra?.obra_paralizada?.responsable || '',
            motivo: obra?.obra_paralizada?.motivo || '',
            observacion: obra?.obra_paralizada?.observacion || ''
        });



        // Verifica si obra y obra_paralizada están definidos y si id es diferente de null o undefined
        if (obra && obra.obras_cierres && obra.obras_cierres.id_obra != null) {
            this.mostrarTabCerradoObra = true;
            this.mostrarBottonCerrarObra = false;
        } else {
            this.mostrarTabCerradoObra = false;
        }

        this.cerrar_Obra_Form.patchValue({
            id_obra: obra?.id || '',
            fecha_hora: this.formateoFecha(obra?.obras_cierres?.fecha_hora) || '',
            supervisor_responsable: obra?.obras_cierres?.supervisor_responsable || '',
            coordinador_responsable: obra?.obras_cierres?.coordinador_responsable || '',
            ito_mandante: obra?.obras_cierres?.ito_mandante || '',
            observacion: obra?.obras_cierres?.observacion || ''
        });


        this.obraForm.patchValue(obra);

        this.formObraDialog = true;

    }


    deleteObra(obra: Obra) {

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar Obra Código : ' + obra.codigo_obra + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.obrasService.deleleObra(obra).subscribe(
                    (response) => {

                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });

                        this.listadoObras();

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

                    this.listadoObras();

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar la obra:', ObjError);

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos : ' + ObjError.error,
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


    loading_Paraliza: boolean = false;


    onParalizarObraClick() {


        this.loading_Paraliza = true;

        setTimeout(() => {
            this.loading_Paraliza = false
        }, 2000);


        if (this.paralizarForm.valid) {

            const registroParalizar = this.paralizarForm.value;

            console.log('paralizarForm:', registroParalizar);

            this.obrasService.ParalizaObra(registroParalizar).subscribe(
                (response) => {

                    // Manejar la respuesta exitosa
                    console.log('Obra paralizada con éxito:', response);

                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Obra Paralizada', life: 3000 });

                    this.loading_Paraliza = false

                    this.formObraDialog = false;

                    this.listadoObras();

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar la obra:', ObjError);

                    this.loading_Paraliza = false

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos : ' + ObjError.error,
                    });

                }
            )

        } else {


            this.loading_Paraliza = false

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

                    this.listadoObras();

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar la obra:', ObjError);

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos : ' + ObjError.error,
                    });

                }
            );
        }
    }




    codigoEmergencia: boolean = false;

    onTipoObraSelected(selectedValue: any) {

        console.log(selectedValue);

        if (selectedValue.descripcion == "EMERGENCIA") {

            // Llama a tu API con el valor seleccionado
            this.obrasService.getCodigodeobraemergencia().subscribe(response => {

                // Maneja la respuesta de la API
                console.log(response[0].valor);

                this.obraForm.patchValue({
                    codigo_obra: '',
                });

                this.obraForm.patchValue({
                    codigo_obra: response[0].valor,
                });

                this.codigoEmergencia = true; // Habilita el control del input

            }, error => {
                // Maneja el error si la llamada a la API falla
                console.error(error);
            });

        } else {

            this.obraForm.patchValue({
                codigo_obra: '',
            });

            this.codigoEmergencia = false; // Deshabilita el control del input

        }

    }





    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
