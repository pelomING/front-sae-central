import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../../interfaces/obra.interface';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/productservice';

import { ReporteDiario, Tipooperacion, Tipoactividad, Maestroactividad, TablaActividades, TablaOtrasActividades, Jefesfaena, Area, Brigada, DetActividad, DetOtros, RecargosHora } from '../../../interfaces/reporte-diario.interface';

import { ReporteDiarioService } from '../../../services/reporte-diario.service';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObrasService } from 'src/app/obras/services/obras.service';


@Component({
    selector: 'app-selecionarreportediarioporobra-page',
    templateUrl: './selecionarreportediarioporobra-page.component.html',
    styleUrls: ['./selecionarreportediarioporobra-page.component.scss'],
})

export class SelecionarReportediarioporobraPageComponent implements OnInit {

    products: Product[];
    product: Product;
    selectedProducts: Product[];
    submitted: boolean;
    statuses: any[];
    obras: Obra[];
    obra: Obra;
    cols: any[] = [];

    colslistaTablaActividades: any[] = [];
    colslistaTablaOtrasActividades: any[] = [];

    listaReportesDiarios: ReporteDiario[];
    reporteDiarioCopia: ReporteDiario;

    listaTablaActividades: TablaActividades[] = [];
    listaTablaOtrasActividades: TablaOtrasActividades[] = [];
    listaTipooperacion: Tipooperacion[] | undefined;
    listaTipoactividad: Tipoactividad[] | undefined;
    listaMaestroactividad: Maestroactividad[] | undefined;

    listaJefesfaena: Jefesfaena[] | undefined;

    listaComunas: Comuna[] | undefined;

    listadeAreas: Area[] | undefined;

    listarecargoshora: RecargosHora[] | undefined;


    listaBrigadas: Brigada[] = [
        { id: 1, valor: false, descripcion: 'LIVIANA' },
        { id: 2, valor: true, descripcion: 'PESADA' }
    ];



    ReporteDiarioForm: FormGroup;
    ActividadForm: FormGroup;
    OtraActividadForm: FormGroup;
    FlexiAppForm: FormGroup;

    selectedActividad: Maestroactividad | undefined;

    titulo_formulario = ''
    numero_activiadad = ''

    ejecutado: boolean = false;

    productDialog: boolean = false;
    actividadesDialog: boolean = false;
    OtrasActividadesDialog: boolean = false;
    formAddFlexiAppDialog: boolean = false;

    loading: boolean = false;
    loadingActividad: boolean = false;
    loadingOtraActividad: boolean = false;


    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;

    mostrarGuardarActividad: boolean = true;
    mostrarActualizarActividad: boolean = true;

    mostrarGuardarOtraActividad: boolean = true;
    mostrarActualizarOtraActividad: boolean = true;

    fechaFormateada: string;


    constructor(private productService: ProductService,
        private messageService: MessageService,
        public route: ActivatedRoute,
        private fb: FormBuilder,
        private router: Router,
        private reporteDiarioService: ReporteDiarioService,
        private obrasService: ObrasService,
        private confirmationService: ConfirmationService) {



        this.ReporteDiarioForm = this.fb.group({
            id: [''],
            fecha_reporte: ['', Validators.required],
            id_obra: ['', Validators.required],
            nombre_proyecto: ['', Validators.required],
            //supervisor: ['', Validators.required],
            //sector: ['', Validators.required],
            sdi: [''],
            alimentador: [''],
            jefe_faena: ['', Validators.required],
            //ito_mandante: ['', Validators.required],
            //comuna: ['', Validators.required],
            num_documento: [''],
            flexiapp: [''],
            //area: ['', Validators.required],
            brigada: ['', Validators.required],
            hora_salida_base: ['', Validators.required],
            hora_llegada_terreno: ['', Validators.required],
            hora_salida_terreno: ['', Validators.required],
            hora_llegada_base: ['', Validators.required],
            recargo_hora: ['']
        });



        this.ActividadForm = this.fb.group({
            id: [''],
            cantidad: ['', Validators.required],
            obj_Tipooperacion: ['', Validators.required],
            obj_Tipoactividad: ['', Validators.required],
            obj_Maestroactividad: ['', Validators.required],
        });



        this.OtraActividadForm = this.fb.group({
            id: [''],
            glosa: ['', Validators.required],
            uc_unitaria: ['', Validators.required],
            cantidad: ['', Validators.required],
            uc_total: ['', Validators.required]
        });



        this.FlexiAppForm = this.fb.group({
            flexiappAgregar: ['', Validators.required]
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

        this.productService.getProducts().then((data) => (this.products = data));
        this.obra = JSON.parse(localStorage.getItem('obra'));
        console.log("obra", this.obra);


        this.cargarListadoReportesDiarios();


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

                this.originalListaMaestroactividad = [...this.listaMaestroactividad];

            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.reporteDiarioService.getAlljefesfaena().subscribe(
            (listado: any) => {
                this.listaJefesfaena = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.reporteDiarioService.getAllrecargoshora().subscribe(
            (listado: any) => {
                this.listarecargoshora = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.reporteDiarioService.getAllareas().subscribe(
            (listado: any) => {
                this.listadeAreas = listado;
            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.obrasService.getAllComunas().subscribe(
            (Comuna: any) => {
                console.log("Esto es la Comuna:", Comuna);
                this.listaComunas = Comuna;
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


        this.colslistaTablaActividades = [
            { field: 'clase', header: 'Clase' },
            { field: 'tipo', header: 'Tipo' },
            { field: 'actividad', header: 'Actividad' },
            { field: 'unidad', header: 'Unidad' },
            { field: 'cantidad', header: 'Cantidad' },
            { field: 'unitario', header: 'Unitario' },
            { field: 'total', header: 'Total' }
        ];


        this.colslistaTablaOtrasActividades = [
            { field: 'clase', header: 'Clase' },
            { field: 'tipo', header: 'Tipo' },
            { field: 'actividad', header: 'Actividad' },
            { field: 'unidad', header: 'Unidad' },
        ];


        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];


    }




    enviarDatos() {

        const reportesSeleccionados = this.listaReportesDiarios
            .filter(reportediario => reportediario.seleccionado)
            .map(reportediario => reportediario.id)
            .join(',');

        console.log("reportesSeleccionados=>", reportesSeleccionados);


        const navigationExtras: NavigationExtras = {
            state: {
                obra: this.obra,
                reportesdiariosseleccionados: reportesSeleccionados
            }
        };

        this.router.navigate(['/obras/generarestadopagoobras'], navigationExtras);

    }






    originalListaMaestroactividad: any[] = [];  // Guarda la lista original
    filteredMaestroactividad: any[] = [];

    // Función para manejar el evento onChange del primer p-dropdown
    onTipoActividadSelected(tipoActividad: Tipoactividad) {

        // Restaura la lista original si no está vacía
        if (this.originalListaMaestroactividad.length > 0) {
            this.listaMaestroactividad = [...this.originalListaMaestroactividad];
        }

        // Filtra la lista de maestroactividad basándose en el tipo de actividad seleccionado
        this.filteredMaestroactividad = this.listaMaestroactividad.filter(item => item.tipo_actividad.id == tipoActividad.id);

        this.listaMaestroactividad = this.filteredMaestroactividad;

        // Limpia la selección del segundo p-dropdown
        this.ActividadForm.get('obj_Maestroactividad').setValue('');

    }




    cargarListadoReportesDiarios() {

        this.reporteDiarioService.getAllReportesDiariosPorObra(this.obra).subscribe(
            (LISTADO: any) => {

                console.log("REPORTES DIARIOS POR OBRA", LISTADO);

                this.listaReportesDiarios = LISTADO.sort((a, b) => b.id - a.id);

                this.listaReportesDiarios.forEach(item => {
                    item.seleccionado = item.id_estado_pago === null ? false : true;
                });

            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

        this.reporteDiarioService.getUltimoreportediario(this.obra).subscribe(
            (ULTIMOREPORTEDIARIO: any) => {

                if (ULTIMOREPORTEDIARIO) {

                    this.ReporteDiarioForm.reset();

                    ULTIMOREPORTEDIARIO = ULTIMOREPORTEDIARIO[0];

                    console.log("ULTIMOREPORTEDIARIO : ", ULTIMOREPORTEDIARIO);

                    let arrayFecha = ULTIMOREPORTEDIARIO.fecha_reporte.split("-");

                    ULTIMOREPORTEDIARIO.fecha_reporte = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]

                    // Utilizar el método find para buscar en la lista
                    const objetoEncontrado = this.listaBrigadas.find((item) => item.id === ULTIMOREPORTEDIARIO.brigada_pesada.id);

                    ULTIMOREPORTEDIARIO.brigada = objetoEncontrado;

                    this.ReporteDiarioForm.patchValue(ULTIMOREPORTEDIARIO);

                }


            },
            (error) => {
                console.error('Error al obtener listado de reportes diarios:', error);
            }
        );

    }


    // Funciones para cerrar los diálogos
    onCloseProductDialog(): void {
        this.productDialog = false;
    }

    onCloseActividadesDialog(): void {
        this.actividadesDialog = false;
    }

    onCloseOtraActividadesDialog(): void {
        this.actividadesDialog = false;
    }

    onCloseFormAddFlexiAppDialog() {
        this.formAddFlexiAppDialog = false;
    }


    onActividadSelected(event: any) {
        // Verificar si event y event.value están definidos y no son nulos o vacíos
        if (event && event.value && event.value.actividad) {

            // Asignar el valor seleccionado solo si es válido
            this.selectedActividad = event.value;

        } else {
            console.warn("El valor seleccionado no es válido.");
            // Puedes manejar el caso en que el valor seleccionado no sea válido, por ejemplo, mostrar un mensaje de error.
        }
    }


    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }


    onGuardarActividadClick() {

        this.loading = true;

        if (this.ActividadForm.valid) {

            const nuevaActividad = this.ActividadForm.value;

            const tablaOriginal: TablaActividades = {
                id: this.createId(),
                tipoOperacion: nuevaActividad.obj_Tipooperacion,
                tipoActividad: nuevaActividad.obj_Tipoactividad,
                maestroActividad: nuevaActividad.obj_Maestroactividad,
                cantidad: nuevaActividad.cantidad,
                ucUnitaria: 0,
                ucTotal: 0,
            };

            const tablaCalculada: TablaActividades = this.CalculadoraTablaActividades(tablaOriginal);

            this.listaTablaActividades.push(tablaCalculada);

            this.loading = false;

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se agrego Actividad al reporte', life: 3000 });

            this.actividadesDialog = false;

        }
    }


    onGuardarOtraActividadClick() {

        this.loading = true;

        if (this.OtraActividadForm.valid) {

            const nuevaOtraActividad = this.OtraActividadForm.value;

            const tablaOriginal: TablaOtrasActividades = {
                id: this.createId(),
                glosa: nuevaOtraActividad.glosa,
                uc_unitaria: nuevaOtraActividad.uc_unitaria,
                cantidad: nuevaOtraActividad.cantidad,
                uc_total: nuevaOtraActividad.uc_total
            };

            this.listaTablaOtrasActividades.push(tablaOriginal);

            this.loading = false;

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Se actualizo la Actividad', life: 3000 });

            this.OtraActividadForm.reset();

            this.OtrasActividadesDialog = false;

        }

    }


    CalculadoraTablaActividades(tabla: TablaActividades): TablaActividades {

        const nuevaTabla: TablaActividades = { ...tabla }; // Crear una copia del objeto original

        if (nuevaTabla.tipoOperacion.id === 1) {
            nuevaTabla.ucUnitaria = nuevaTabla.maestroActividad.uc_instalacion;
        }

        if (nuevaTabla.tipoOperacion.id === 2) {
            nuevaTabla.ucUnitaria = nuevaTabla.maestroActividad.uc_retiro;
        }

        if (nuevaTabla.tipoOperacion.id === 3) {
            nuevaTabla.ucUnitaria = nuevaTabla.maestroActividad.uc_traslado;
        }

        // Realizar otros cálculos si es necesario
        nuevaTabla.ucTotal = nuevaTabla.cantidad * nuevaTabla.ucUnitaria;

        // Redondear ucTotal a dos decimales
        nuevaTabla.ucTotal = Math.round(nuevaTabla.ucTotal * 100) / 100;

        // Truncar ucTotal a dos decimales
        //nuevaTabla.ucTotal = Math.trunc(nuevaTabla.ucTotal * 100) / 100;

        // Redondear ucTotal a dos decimales
        //nuevaTabla.ucTotal = parseFloat(nuevaTabla.ucTotal.toFixed(2));

        return nuevaTabla;

    }


    filtrarFecha(fechaString: string) {

        // Formatea la fecha en el formato deseado
        // 2023-12-01 17:21:00
        let arrayFechaHora = fechaString.split(" ");

        let arrayFecha = arrayFechaHora[0].split("-");

        let arrayHora = arrayFechaHora[1].split(":");

        return `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}:${arrayHora[2]}`;

    }


    formateoFechaHora(fechaOriginal: string | number | Date) {

        this.fechaFormateada = '';

        if (typeof fechaOriginal === 'string') {

            // El campo es de tipo texto (string)
            //console.log('Es una cadena de texto');

            let arrayFechaHora = fechaOriginal.split(" ");
            let arrayFecha = arrayFechaHora[0].split("-");
            let arrayHora = arrayFechaHora[1].split(":");

            // Formatea la fecha en el formato deseado
            this.fechaFormateada = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;

        } else if (fechaOriginal instanceof Date) {

            // El campo es de tipo Date
            //console.log('Es un objeto Date');

            const fechaParseada = new Date(fechaOriginal);

            //console.log("fechaParseada", fechaParseada);

            const dia = fechaParseada.getDate().toString().padStart(2, '0');
            const mes = (fechaParseada.getMonth() + 1).toString().padStart(2, '0');
            const año = fechaParseada.getFullYear();

            const hh = fechaParseada.getHours().toString();
            const mm = fechaParseada.getMinutes().toString();

            this.fechaFormateada = `${año}-${mes}-${dia} ${hh}:${mm}`;

        }

        //console.log("formateoFechaHora", this.fechaFormateada);

        return this.fechaFormateada;


    }


    formateoFecha(fechaOriginal: string | number | Date) {

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


    onGuardarReporteDiarioClick() {

        this.loading = true;

        const det_actividad: DetActividad[] = this.listaTablaActividades.map((actividad: TablaActividades) => ({
            clase: actividad.tipoOperacion.id,
            tipo: actividad.tipoActividad.id,
            actividad: actividad.maestroActividad.id,
            cantidad: actividad.cantidad
        }));

        const det_otros: DetOtros[] = this.listaTablaOtrasActividades.map((otra_actividad: TablaOtrasActividades) => ({
            glosa: otra_actividad.glosa,
            uc_unitaria: otra_actividad.uc_unitaria,
            cantidad: otra_actividad.cantidad,
            uc_total: otra_actividad.uc_total
        }));

        if (this.ReporteDiarioForm.valid) {

            let ReporteDiarioObjeto = this.ReporteDiarioForm.value;

            //  console.log('ReporteDiarioObjeto : ', ReporteDiarioObjeto);


            let fechaConFormato = this.formateoFecha(ReporteDiarioObjeto.fecha_reporte);

            ReporteDiarioObjeto.fecha_reporte = fechaConFormato;
            ReporteDiarioObjeto.fecha_entregado = fechaConFormato;
            ReporteDiarioObjeto.fecha_revisado = fechaConFormato;

            ReporteDiarioObjeto.hora_salida_base = this.formateoFechaHora(ReporteDiarioObjeto.hora_salida_base);
            ReporteDiarioObjeto.hora_llegada_terreno = this.formateoFechaHora(ReporteDiarioObjeto.hora_llegada_terreno);
            ReporteDiarioObjeto.hora_salida_terreno = this.formateoFechaHora(ReporteDiarioObjeto.hora_salida_terreno);
            ReporteDiarioObjeto.hora_llegada_base = this.formateoFechaHora(ReporteDiarioObjeto.hora_llegada_base);



            console.log('ReporteDiarioObjeto flexiapp : ', ReporteDiarioObjeto.flexiapp);

            let arrayDeStrings: string[] = [];

            if (typeof ReporteDiarioObjeto.flexiapp === 'string') {
                arrayDeStrings = ReporteDiarioObjeto.flexiapp.split(',');
            } else {
                arrayDeStrings = ReporteDiarioObjeto.flexiapp;
            }


            const NuevoReporteDiario: ReporteDiario = {
                id_obra: ReporteDiarioObjeto.id_obra,
                fecha_reporte: ReporteDiarioObjeto.fecha_reporte,
                jefe_faena: ReporteDiarioObjeto.jefe_faena.id,
                sdi: ReporteDiarioObjeto.sdi,
                brigada_pesada: ReporteDiarioObjeto.brigada.valor,
                fecha_entregado: ReporteDiarioObjeto.fecha_entregado,
                fecha_revisado: ReporteDiarioObjeto.fecha_revisado,
                hora_salida_base: ReporteDiarioObjeto.hora_salida_base,
                hora_llegada_terreno: ReporteDiarioObjeto.hora_llegada_terreno,
                hora_salida_terreno: ReporteDiarioObjeto.hora_salida_terreno,
                hora_llegada_base: ReporteDiarioObjeto.hora_llegada_base,
                alimentador: ReporteDiarioObjeto.alimentador,
                num_documento: ReporteDiarioObjeto.num_documento,
                flexiapp: arrayDeStrings,
                det_actividad: det_actividad,
                det_otros: det_otros,
                recargo_hora: ReporteDiarioObjeto.recargo_hora,
                ito_mandante: '1',
                id_area: 1,
                observaciones: 'x',
                entregado_por_persona: 'x',
                revisado_por_persona: 'x',
                sector: 'x',
                comuna: 'x'
            }

            // console.log('NuevoReporteDiario : ', NuevoReporteDiario);

            this.reporteDiarioService.guardarReporteDiario(NuevoReporteDiario).subscribe(
                (response) => {

                    // Manejar la respuesta exitosa
                    console.log('éxito:', response);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });
                    this.cargarListadoReportesDiarios();

                    this.loading = false;

                    this.productDialog = false;

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar :', ObjError);


                    let arrayFecha = ReporteDiarioObjeto.fecha_reporte.split("-");

                    ReporteDiarioObjeto.fecha_reporte = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]

                    ReporteDiarioObjeto.hora_salida_base = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_salida_base);
                    ReporteDiarioObjeto.hora_llegada_terreno = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_llegada_terreno);
                    ReporteDiarioObjeto.hora_salida_terreno = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_salida_terreno);
                    ReporteDiarioObjeto.hora_llegada_base = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_llegada_base);

                    this.ReporteDiarioForm.patchValue(ReporteDiarioObjeto);

                    this.loading = false;

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos : ' + ObjError.error,
                    });

                }
            );

        }
    }


    onGuardarFlexiAppFormClick() {

        console.log('onGuardarFlexiAppFormClick : ', this.FlexiAppForm.value);

        const nuevoValorFlexiApp = this.FlexiAppForm.get('flexiappAgregar').value;

        // Obtén el valor actual del campo flexiapp del primer formulario
        const valorActualFlexiApp = this.ReporteDiarioForm.get('flexiapp').value;

        // Concatena los valores, separados por comas
        const nuevaCadenaFlexiApp = valorActualFlexiApp ? `${valorActualFlexiApp},${nuevoValorFlexiApp}` : nuevoValorFlexiApp;

        this.ReporteDiarioForm.patchValue({
            flexiapp: nuevaCadenaFlexiApp
        });

        this.FlexiAppForm.reset();

        this.formAddFlexiAppDialog = false;

    }




    onActualizarActividadClick() {

        if (this.ActividadForm.valid) {

            const Actividad = this.ActividadForm.value;

            const tablaOriginal: TablaActividades = {
                id: Actividad.id,
                tipoOperacion: Actividad.obj_Tipooperacion,
                tipoActividad: Actividad.obj_Tipoactividad,
                maestroActividad: Actividad.obj_Maestroactividad,
                cantidad: Actividad.cantidad,
                ucUnitaria: 0,
                ucTotal: 0,
            };

            const tablaCalculada: TablaActividades = this.CalculadoraTablaActividades(tablaOriginal);

            console.log('tablaCalculada : ', tablaCalculada);

            // Buscar el índice del elemento en this.listaTablaActividades
            const indice = this.listaTablaActividades.findIndex(item => item.id === tablaCalculada.id);

            if (indice !== -1) {
                // Actualizar el elemento existente en lugar de agregar uno nuevo
                this.listaTablaActividades[indice] = tablaCalculada;
            } else {
                // Si no se encuentra el elemento, agregar uno nuevo
                this.listaTablaActividades.push(tablaCalculada);
            }

            this.loading = false;
            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });
            this.actividadesDialog = false;
        }
    }



    onActualizarOtraActividadClick() {

        this.loading = true;

        if (this.OtraActividadForm.valid) {

            const Actividad = this.OtraActividadForm.value;

            const tablaOriginal: TablaOtrasActividades = {
                id: Actividad.id,
                glosa: Actividad.glosa,
                uc_unitaria: Actividad.uc_unitaria,
                cantidad: Actividad.cantidad,
                uc_total: Actividad.uc_total
            };

            // Buscar el índice del elemento en this.listaTablaActividades
            const indice = this.listaTablaOtrasActividades.findIndex(item => item.id === tablaOriginal.id);

            if (indice !== -1) {
                // Actualizar el elemento existente en lugar de agregar uno nuevo
                this.listaTablaOtrasActividades[indice] = tablaOriginal;
            } else {
                // Si no se encuentra el elemento, agregar uno nuevo
                this.listaTablaOtrasActividades.push(tablaOriginal);
            }

            this.loading = false;

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro actualizado', life: 3000 });

            this.OtrasActividadesDialog = false;

        }

    }


    onActualizarReporteDiarioClick() {

        this.loading = true;

        const det_actividad: DetActividad[] = this.listaTablaActividades.map((actividad: TablaActividades) => ({
            clase: actividad.tipoOperacion.id,
            tipo: actividad.tipoActividad.id,
            actividad: actividad.maestroActividad.id,
            cantidad: actividad.cantidad
        }));

        const det_otros: DetOtros[] = this.listaTablaOtrasActividades.map((otra_actividad: TablaOtrasActividades) => ({
            glosa: otra_actividad.glosa,
            uc_unitaria: otra_actividad.uc_unitaria,
            cantidad: otra_actividad.cantidad,
            uc_total: otra_actividad.uc_total
        }));

        if (this.ReporteDiarioForm.valid) {

            const ReporteDiarioObjeto = this.ReporteDiarioForm.value;

            let fechaConFormato = this.formateoFecha(ReporteDiarioObjeto.fecha_reporte);

            ReporteDiarioObjeto.fecha_reporte = fechaConFormato;
            ReporteDiarioObjeto.fecha_entregado = fechaConFormato;
            ReporteDiarioObjeto.fecha_revisado = fechaConFormato;

            ReporteDiarioObjeto.hora_salida_base = this.formateoFechaHora(ReporteDiarioObjeto.hora_salida_base);
            ReporteDiarioObjeto.hora_llegada_terreno = this.formateoFechaHora(ReporteDiarioObjeto.hora_llegada_terreno);
            ReporteDiarioObjeto.hora_salida_terreno = this.formateoFechaHora(ReporteDiarioObjeto.hora_salida_terreno);
            ReporteDiarioObjeto.hora_llegada_base = this.formateoFechaHora(ReporteDiarioObjeto.hora_llegada_base);


            let arrayDeStrings: string[] = [];

            if (typeof ReporteDiarioObjeto.flexiapp === 'string') {
                arrayDeStrings = ReporteDiarioObjeto.flexiapp.split(',');
            } else {
                arrayDeStrings = ReporteDiarioObjeto.flexiapp;
            }


            const UpdateReporteDiario: ReporteDiario = {
                id: ReporteDiarioObjeto.id,
                id_obra: ReporteDiarioObjeto.id_obra,
                fecha_reporte: ReporteDiarioObjeto.fecha_reporte,
                jefe_faena: ReporteDiarioObjeto.jefe_faena.id,
                sdi: ReporteDiarioObjeto.sdi,
                brigada_pesada: ReporteDiarioObjeto.brigada.valor,
                fecha_entregado: ReporteDiarioObjeto.fecha_entregado,
                fecha_revisado: ReporteDiarioObjeto.fecha_revisado,
                hora_salida_base: ReporteDiarioObjeto.hora_salida_base,
                hora_llegada_terreno: ReporteDiarioObjeto.hora_llegada_terreno,
                hora_salida_terreno: ReporteDiarioObjeto.hora_salida_terreno,
                hora_llegada_base: ReporteDiarioObjeto.hora_llegada_base,
                alimentador: ReporteDiarioObjeto.alimentador,
                num_documento: ReporteDiarioObjeto.num_documento,
                flexiapp: arrayDeStrings,
                det_actividad: det_actividad,
                det_otros: det_otros,
                recargo_hora: ReporteDiarioObjeto.recargo_hora,
                ito_mandante: '',
                id_area: 0,
                observaciones: '',
                entregado_por_persona: '',
                revisado_por_persona: '',
                sector: '',
                comuna: ''
            }


            this.reporteDiarioService.ActualizarReporteDiario(UpdateReporteDiario).subscribe(
                (response) => {

                    // Manejar la respuesta exitosa
                    console.log('éxito:', response);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro Actualizado', life: 3000 });
                    this.cargarListadoReportesDiarios();
                    this.loading = false;
                    this.productDialog = false;

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al actualizar :', ObjError);


                    let arrayFecha = ReporteDiarioObjeto.fecha_reporte.split("-");

                    ReporteDiarioObjeto.fecha_reporte = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]

                    ReporteDiarioObjeto.hora_salida_base = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_salida_base);
                    ReporteDiarioObjeto.hora_llegada_terreno = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_llegada_terreno);
                    ReporteDiarioObjeto.hora_salida_terreno = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_salida_terreno);
                    ReporteDiarioObjeto.hora_llegada_base = this.formateoFechaDMAHM(ReporteDiarioObjeto.hora_llegada_base);

                    this.ReporteDiarioForm.patchValue(ReporteDiarioObjeto);

                    this.loading = false;

                    this.messageService.add({
                        severity: 'info',
                        summary: 'Información : ' + ObjError.status,
                        detail: 'Por favor, verifique los siguientes datos:' + ObjError.error,
                    });

                }
            );

        }



    }



    formateoFechaDMAHM(fecha: String) {
        let arrayFechaHora = fecha.split(" ");
        let arrayFecha = arrayFechaHora[0].split("-");
        let arrayHora = arrayFechaHora[1].split(":");
        let fechaFormateada = `${arrayFecha[2]}-${arrayFecha[1]}-${arrayFecha[0]} ${arrayHora[0]}:${arrayHora[1]}`;
        return fechaFormateada;
    }


    openEditReporteDiario(reporteDiario: ReporteDiario) {

        console.log("Edit reporteDiario", reporteDiario);

        this.reporteDiarioCopia = { ...reporteDiario };

        this.mostrarGuardar = false;
        this.mostrarActualizar = true;


        // let fechaParseada0 = new Date(this.reporteDiarioCopia.fecha_reporte);
        // let dia0 = fechaParseada0.getDate().toString().padStart(2, '0');
        // let mes0 = (fechaParseada0.getMonth() + 1).toString().padStart(2, '0');
        // let año0 = fechaParseada0.getFullYear();
        // let fechaFormateada0 = `${dia0}-${mes0}-${año0}`;


        let arrayFecha = this.reporteDiarioCopia.fecha_reporte.split("-");

        this.reporteDiarioCopia.fecha_reporte = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]



        if (this.reporteDiarioCopia.det_actividad && Array.isArray(this.reporteDiarioCopia.det_actividad)) {

            // La lista det_actividad existe y es un array, entonces procedemos con la transformación
            this.listaTablaActividades = this.reporteDiarioCopia.det_actividad.map((actividad: any) => {
                const tabla: TablaActividades = {
                    id: actividad.id,
                    tipoOperacion: actividad.tipo_operacion,
                    tipoActividad: actividad.tipo_actividad,
                    maestroActividad: actividad.actividad,
                    cantidad: actividad.cantidad,
                    ucUnitaria: actividad.unitario,
                    ucTotal: actividad.total
                };
                return tabla;
            });

        } else {

            // La lista det_actividad es null o no es un array
            console.error('La lista det_actividad es nula o no es un array.');
            // Puedes manejar este caso según tus necesidades, por ejemplo, asignar una lista vacía:
            this.listaTablaActividades = [];

        }



        if (this.reporteDiarioCopia.det_otros && Array.isArray(this.reporteDiarioCopia.det_otros)) {
            // La lista det_otros existe y es un array, entonces procedemos con la transformación
            this.listaTablaOtrasActividades = this.reporteDiarioCopia.det_otros.map((otrosActividad: any) => {
                const tabla: TablaOtrasActividades = {
                    id: otrosActividad.id,
                    glosa: otrosActividad.glosa,
                    uc_unitaria: otrosActividad.uc_unitaria,
                    cantidad: otrosActividad.cantidad,
                    uc_total: otrosActividad.total_uc
                };
                return tabla;
            });
        } else {
            // La lista det_otros es null o no es un array
            console.error('La lista det_otros es nula o no es un array.');
            // Puedes manejar este caso según tus necesidades, por ejemplo, asignar una lista vacía:
            this.listaTablaOtrasActividades = [];
        }



        this.reporteDiarioCopia.hora_salida_base = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_salida_base);
        this.reporteDiarioCopia.hora_llegada_terreno = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_llegada_terreno);
        this.reporteDiarioCopia.hora_salida_terreno = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_salida_terreno);
        this.reporteDiarioCopia.hora_llegada_base = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_llegada_base);


        this.ReporteDiarioForm.reset();


        // Utilizar el método find para buscar en la lista
        const objetoEncontrado = this.listaBrigadas.find((item) => item.id === this.reporteDiarioCopia.brigada_pesada.id);


        // Asigna los valores iniciales al formulario
        this.ReporteDiarioForm.patchValue({
            id_obra: this.obra?.id || '',
            nombre_proyecto: this.obra?.nombre_obra || '',
            // Otros campos iniciales si es necesario
            brigada: objetoEncontrado
        });

        this.ReporteDiarioForm.patchValue(this.reporteDiarioCopia);

        this.productDialog = true;

    }


    nomostrar: boolean = true;

    verReporteDiario(reporteDiario: ReporteDiario) {

        console.log("Edit reporteDiario", reporteDiario);

        this.reporteDiarioCopia = { ...reporteDiario };

        this.mostrarGuardar = false;

        this.mostrarActualizar = false;

        this.nomostrar = false;


        // let fechaParseada0 = new Date(this.reporteDiarioCopia.fecha_reporte);
        // let dia0 = fechaParseada0.getDate().toString().padStart(2, '0');
        // let mes0 = (fechaParseada0.getMonth() + 1).toString().padStart(2, '0');
        // let año0 = fechaParseada0.getFullYear();
        // let fechaFormateada0 = `${dia0}-${mes0}-${año0}`;

        let arrayFecha = this.reporteDiarioCopia.fecha_reporte.split("-");

        this.reporteDiarioCopia.fecha_reporte = arrayFecha[2] + '-' + arrayFecha[1] + '-' + arrayFecha[0]


        if (this.reporteDiarioCopia.det_actividad && Array.isArray(this.reporteDiarioCopia.det_actividad)) {

            // La lista det_actividad existe y es un array, entonces procedemos con la transformación
            this.listaTablaActividades = this.reporteDiarioCopia.det_actividad.map((actividad: any) => {
                const tabla: TablaActividades = {
                    id: actividad.id,
                    tipoOperacion: actividad.tipo_operacion,
                    tipoActividad: actividad.tipo_actividad,
                    maestroActividad: actividad.actividad,
                    cantidad: actividad.cantidad,
                    ucUnitaria: actividad.unitario,
                    ucTotal: actividad.total
                };
                return tabla;
            });

        } else {

            // La lista det_actividad es null o no es un array
            console.error('La lista det_actividad es nula o no es un array.');
            // Puedes manejar este caso según tus necesidades, por ejemplo, asignar una lista vacía:
            this.listaTablaActividades = [];

        }



        if (this.reporteDiarioCopia.det_otros && Array.isArray(this.reporteDiarioCopia.det_otros)) {
            // La lista det_otros existe y es un array, entonces procedemos con la transformación
            this.listaTablaOtrasActividades = this.reporteDiarioCopia.det_otros.map((otrosActividad: any) => {
                const tabla: TablaOtrasActividades = {
                    id: otrosActividad.id,
                    glosa: otrosActividad.glosa,
                    uc_unitaria: otrosActividad.uc_unitaria,
                    cantidad: otrosActividad.cantidad,
                    uc_total: otrosActividad.total_uc
                };
                return tabla;
            });
        } else {
            // La lista det_otros es null o no es un array
            console.error('La lista det_otros es nula o no es un array.');
            // Puedes manejar este caso según tus necesidades, por ejemplo, asignar una lista vacía:
            this.listaTablaOtrasActividades = [];
        }



        this.reporteDiarioCopia.hora_salida_base = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_salida_base);
        this.reporteDiarioCopia.hora_llegada_terreno = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_llegada_terreno);
        this.reporteDiarioCopia.hora_salida_terreno = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_salida_terreno);
        this.reporteDiarioCopia.hora_llegada_base = this.formateoFechaDMAHM(this.reporteDiarioCopia.hora_llegada_base);


        this.ReporteDiarioForm.reset();


        // Utilizar el método find para buscar en la lista
        const objetoEncontrado = this.listaBrigadas.find((item) => item.id === this.reporteDiarioCopia.brigada_pesada.id);


        // Asigna los valores iniciales al formulario
        this.ReporteDiarioForm.patchValue({
            id_obra: this.obra?.id || '',
            nombre_proyecto: this.obra?.nombre_obra || '',
            // Otros campos iniciales si es necesario
            brigada: objetoEncontrado
        });

        this.ReporteDiarioForm.patchValue(this.reporteDiarioCopia);

        this.productDialog = true;

    }


    openEditActividad(Actividad: TablaActividades) {

        console.log("Actividad", Actividad);

        this.ActividadForm.reset();

        this.mostrarGuardarActividad = false;
        this.mostrarActualizarActividad = true;

        const objetoEncontrado = this.listaTipooperacion.find((item) => item.id === Actividad.tipoOperacion.id);


        this.selectedActividad = Actividad.maestroActividad;

        this.ActividadForm.patchValue({
            id: Actividad.id,
            cantidad: Actividad.cantidad,
            obj_Tipooperacion: objetoEncontrado,
            obj_Tipoactividad: Actividad.tipoActividad,
            obj_Maestroactividad: Actividad.maestroActividad,
        });

        this.actividadesDialog = true;

    }


    openEditOtraActividad(Otra_Actividad: TablaOtrasActividades) {

        this.mostrarGuardarOtraActividad = false;
        this.mostrarActualizarOtraActividad = true;

        this.OtraActividadForm.reset();

        this.OtraActividadForm.patchValue(Otra_Actividad);

        this.OtrasActividadesDialog = true;

    }


    openDeleteActividad(Actividad: TablaActividades) {

        console.log("onizarClick", Actividad);

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar ' + Actividad.maestroActividad.actividad + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                // Buscar la posición del objeto en la lista
                const index = this.listaTablaActividades.findIndex(item => item === Actividad);

                // Verificar si se encontró el objeto
                if (index !== -1) {
                    // Clonar la lista original antes de modificarla
                    const listaClonada = [...this.listaTablaActividades];

                    // Utilizar splice para eliminar el elemento en la posición index
                    listaClonada.splice(index, 1);

                    // Utilizar la lista clonada en lugar de modificar la original
                    this.listaTablaActividades = listaClonada;

                }

            }

        });

    }



    openDeleteOtraActividad(OtraActividad: TablaOtrasActividades) {

        console.log("onizarClick", OtraActividad);

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar ' + OtraActividad.glosa + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                // Buscar la posición del objeto en la lista
                const index = this.listaTablaOtrasActividades.findIndex(item => item === OtraActividad);

                // Verificar si se encontró el objeto
                if (index !== -1) {
                    // Clonar la lista original antes de modificarla
                    const listaClonada = [...this.listaTablaOtrasActividades];

                    // Utilizar splice para eliminar el elemento en la posición index
                    listaClonada.splice(index, 1);

                    // Utilizar la lista clonada en lugar de modificar la original
                    this.listaTablaOtrasActividades = listaClonada;

                }

            }

        });

    }


    openNew() {

        this.loading = false;

        this.mostrarGuardar = true;
        this.mostrarActualizar = false;

        this.product = {};
        this.submitted = false;

        this.listaTablaActividades = [];
        this.listaTablaOtrasActividades = [];


        // this.ReporteDiarioForm.reset();

        // Asigna los valores iniciales al formulario
        this.ReporteDiarioForm.patchValue({
            id_obra: this.obra?.id || '',
            nombre_proyecto: this.obra?.nombre_obra || '',
            // Otros campos iniciales si es necesario
        });

        this.productDialog = true;

    }



    openNewActividades() {

        this.numero_activiadad = '';
        this.titulo_formulario = 'INGRESAR EVENTO';

        this.mostrarGuardarActividad = true;
        this.mostrarActualizarActividad = false;

        this.ActividadForm.reset();
        this.actividadesDialog = true;

    }


    openNewOtrasActividades() {

        this.numero_activiadad = '';
        this.titulo_formulario = 'INGRESAR EVENTO';

        this.mostrarGuardarOtraActividad = true;
        this.mostrarActualizarOtraActividad = false;

        this.OtraActividadForm.reset();
        this.OtrasActividadesDialog = true;

    }


    openFormAddFlexiApp() {
        this.formAddFlexiAppDialog = true;
    }


    goBack() {
        window.history.back();
    }


    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    hideDialogActividadesDialog() {
        this.actividadesDialog = false;
    }

    hideDialogOtrasActividadesDialog() {
        this.OtrasActividadesDialog = false;
    }



    onEliminarClick(reportediario: ReporteDiario) {

        this.confirmationService.confirm({
            message: 'Estás seguro de que deseas eliminar reporte Id : ' + reportediario.id + ' ?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {

                this.reporteDiarioService.Eliminareportediario(reportediario).subscribe(
                    (response) => {

                        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro eliminado', life: 3000 });
                        this.cargarListadoReportesDiarios();

                    },
                    (error) => {

                        // Manejar errores
                        console.error('Error al eliminar reporte :', error);

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






    // deleteSelectedProducts() {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete the selected products?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
    //             this.selectedProducts = null;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    //         }
    //     });
    // }

    // editProduct(product: Product) {
    //     this.product = { ...product };
    //     this.productDialog = true;
    // }

    // deleteProduct(product: Product) {
    //     this.confirmationService.confirm({
    //         message: 'Are you sure you want to delete ' + product.name + '?',
    //         header: 'Confirm',
    //         icon: 'pi pi-exclamation-triangle',
    //         accept: () => {
    //             this.products = this.products.filter((val) => val.id !== product.id);
    //             this.product = {};
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    //         }
    //     });
    // }



    // saveProduct() {
    //     this.submitted = true;

    //     if (this.product.name.trim()) {
    //         if (this.product.id) {
    //             this.products[this.findIndexById(this.product.id)] = this.product;
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
    //         } else {
    //             this.product.id = this.createId();
    //             this.product.image = 'product-placeholder.svg';
    //             this.products.push(this.product);
    //             this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
    //         }

    //         this.products = [...this.products];
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }


    // getSeverity(status: string) {

    //     switch (status) {
    //         case 'activo':
    //             return 'primary';
    //         case 'Visita Terreno coordinada':
    //             return 'success';
    //         case 'Lista para Iniciar faena':
    //             return 'help';
    //         case 'En Faena':
    //             return 'info';
    //         case 'Paralizada':
    //             return 'warning';
    //         case 'Estado Pago Enviado':
    //             return 'help';
    //         case 'Factura Emitida':
    //             return 'warning';
    //         case 'Factura Pagada':
    //             return 'warning';

    //     }

    //     return '';
    // }


}
