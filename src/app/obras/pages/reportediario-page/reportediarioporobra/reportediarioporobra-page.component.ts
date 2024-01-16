import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Obra, Zona, Delegacion, Tipotrabajos, Empresacontratistas, Coordinadorcontratistas, Comuna, Estado, Tipo_obra, Segmento } from '../../../interfaces/obra.interface';

import { Product } from '../../../interfaces/product.interface';
import { ProductService } from '../../../services/productservice';

import { ReporteDiario, Tipooperacion, Tipoactividad, Maestroactividad, TablaActividades, TablaOtrasActividades, Jefesfaena, Area, Brigada, DetActividad, DetOtros } from '../../../interfaces/reporte-diario.interface';

import { ReporteDiarioService } from '../../../services/reporte-diario.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ObrasService } from 'src/app/obras/services/obras.service';


@Component({
    selector: 'app-reportediarioporobra-page',
    templateUrl: './reportediarioporobra-page.component.html',
    styleUrls: ['./reportediarioporobra-page.component.scss'],
})

export class ReportediarioporobraPageComponent implements OnInit {

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
    listaTablaActividades: TablaActividades[] = [];
    listaTablaOtrasActividades: TablaOtrasActividades[] = [];
    listaTipooperacion: Tipooperacion[] | undefined;
    listaTipoactividad: Tipoactividad[] | undefined;
    listaMaestroactividad: Maestroactividad[] | undefined;

    listaJefesfaena: Jefesfaena[] | undefined;

    listaComunas: Comuna[] | undefined;

    listadeAreas: Area[] | undefined;


    listaBrigadas: Brigada[] = [
        { id: 1, descripcion: 'LIVIANA' },
        { id: 2, descripcion: 'PESADA' }
    ];



    ReporteDiarioForm: FormGroup;
    ActividadForm: FormGroup;
    OtraActividadForm: FormGroup;

    selectedActividad: Maestroactividad | undefined;

    titulo_formulario = ''
    numero_activiadad = ''

    ejecutado: boolean = false;

    productDialog: boolean;
    actividadesDialog: boolean = false;
    OtrasActividadesDialog: boolean = false;

    loading: boolean = false;
    mostrarGuardar: boolean = true; // Mostrar el botón por defecto
    mostrarActualizar: boolean = true;
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
            fecha_reporte_diario: ['', Validators.required],
            id_obra: ['', Validators.required],
            nombre_proyecto: ['', Validators.required],
            supervisor: ['', Validators.required],
            sector: ['', Validators.required],
            sdi: ['', Validators.required],
            alimentador: ['', Validators.required],
            jefe_faena: ['', Validators.required],
            ito_mandante: ['', Validators.required],
            comunas: ['', Validators.required],
            n_documento: ['', Validators.required],
            flexiapp: ['', Validators.required],
            area: ['', Validators.required],
            brigada: ['', Validators.required],
            fecha_hora_salida_base: ['', Validators.required],
            fecha_hora_llegada_terreno: ['', Validators.required],
            fecha_hora_salida_terreno: ['', Validators.required],
            fecha_hora_llegada_base: ['', Validators.required]
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

        this.reporteDiarioService.getAlljefesfaena().subscribe(
            (listado: any) => {
                this.listaJefesfaena = listado;
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

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

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

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

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

            console.log('ReporteDiarioObjeto : ', ReporteDiarioObjeto);


            ReporteDiarioObjeto.fecha_reporte = this.formateoFecha(ReporteDiarioObjeto.fecha_reporte_diario);
            ReporteDiarioObjeto.fecha_entregado = this.formateoFecha(ReporteDiarioObjeto.fecha_reporte_diario);
            ReporteDiarioObjeto.fecha_revisado = this.formateoFecha(ReporteDiarioObjeto.fecha_reporte_diario);

            ReporteDiarioObjeto.hora_salida_base = this.formateoFechaHora(ReporteDiarioObjeto.fecha_hora_salida_base);
            ReporteDiarioObjeto.hora_llegada_terreno = this.formateoFechaHora(ReporteDiarioObjeto.fecha_hora_llegada_terreno);
            ReporteDiarioObjeto.hora_salida_terreno = this.formateoFechaHora(ReporteDiarioObjeto.fecha_hora_salida_terreno);
            ReporteDiarioObjeto.hora_llegada_base = this.formateoFechaHora(ReporteDiarioObjeto.fecha_hora_llegada_base);


            const NuevoReporteDiario: ReporteDiario = {
                
                id_obra: ReporteDiarioObjeto.id_obra,
                fecha_reporte: ReporteDiarioObjeto.fecha_reporte,
                jefe_faena: ReporteDiarioObjeto.jefe_faena.id,
                sdi: ReporteDiarioObjeto.sdi,
                gestor_cliente: 'xxx',
                id_area: ReporteDiarioObjeto.area.id,
                brigada_pesada: true,
                observaciones: 'xxx',
                entregado_por_persona: 'xxx',
                fecha_entregado: ReporteDiarioObjeto.fecha_entregado,
                revisado_por_persona: 'xxx',
                fecha_revisado: ReporteDiarioObjeto.fecha_revisado,
                sector: ReporteDiarioObjeto.sector,
                hora_salida_base: ReporteDiarioObjeto.hora_salida_base,
                hora_llegada_terreno: ReporteDiarioObjeto.hora_llegada_terreno,
                hora_salida_terreno: ReporteDiarioObjeto.hora_salida_terreno,
                hora_llegada_base: ReporteDiarioObjeto.hora_llegada_base,
                alimentador: ReporteDiarioObjeto.alimentador,
                comuna: ReporteDiarioObjeto.comunas.codigo,
                num_documento: ReporteDiarioObjeto.num_documento,

                flexiapp: [ReporteDiarioObjeto.flexiapp],

                det_actividad: det_actividad,

                det_otros: det_otros

            }

            console.log('NuevoReporteDiario : ', NuevoReporteDiario);

            this.reporteDiarioService.guardarReporteDiario(NuevoReporteDiario).subscribe(
                (response) => {

                    // Manejar la respuesta exitosa
                    console.log('éxito:', response);
                    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro guardado', life: 3000 });

                },
                (ObjError) => {

                    // Manejar errores
                    console.error('Error al guardar :', ObjError);

                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error : ' + ObjError.status,
                        detail: 'Por favor, intentar mas tarde problemas de servicio : ' + ObjError.error.message,
                    });

                }
            );

        }
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





    }


    openEditActividad(Actividad: TablaActividades) {

        this.ActividadForm.reset();

        this.mostrarGuardar = false;
        this.mostrarActualizar = true;

        this.ActividadForm.patchValue({
            id: Actividad.id,
            cantidad: Actividad.cantidad,
            obj_Tipooperacion: Actividad.tipoOperacion,
            obj_Tipoactividad: Actividad.tipoActividad,
            obj_Maestroactividad: Actividad.maestroActividad,
        });

        this.actividadesDialog = true;

    }



    openEditOtraActividad(Otra_Actividad: TablaOtrasActividades) {

        this.mostrarGuardar = false;
        this.mostrarActualizar = true;

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

        this.ReporteDiarioForm.reset();

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

        this.mostrarGuardar = true;
        this.mostrarActualizar = false;

        this.ActividadForm.reset();
        this.actividadesDialog = true;

    }

    openNewOtrasActividades() {

        this.numero_activiadad = '';
        this.titulo_formulario = 'INGRESAR EVENTO';

        this.mostrarGuardar = true;
        this.mostrarActualizar = false;

        this.OtraActividadForm.reset();
        this.OtrasActividadesDialog = true;

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
