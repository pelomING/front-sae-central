
export interface DetActividad {
    clase: number;
    tipo: number;
    actividad: number;
    cantidad: number;
}

export interface DetOtros {
    glosa: string;
    uc_unitaria: number;
    cantidad: number;
    uc_total: number;
}

export interface RecargosHora {
    id: number,
    nombre: string,
    id_tipo_recargo: number,
    porcentaje: number
    nombre_corto: string,
}

export interface ReporteDiario {
    id?: number;
    id_obra: number;
    fecha_reporte: string;
    jefe_faena: number;
    sdi: string;
    ito_mandante: string;
    id_area: number;
    brigada_pesada: Brigada;
    observaciones: string;
    entregado_por_persona: string;
    fecha_entregado: string;
    revisado_por_persona: string;
    fecha_revisado: string;
    sector: string;
    hora_salida_base: string;
    hora_llegada_terreno: string;
    hora_salida_terreno: string;
    hora_llegada_base: string;
    alimentador: string;
    comuna: string;
    num_documento: string;
    flexiapp: string[];
    det_actividad: DetActividad[];
    det_otros: DetOtros[];
    recargo_hora: RecargosHora;
    seleccionado?: boolean;
    id_estado_pago?: number;
    codigo_pelom?: string;
}

export interface Tipooperacion {
    id: number,
    nombre: string,
    clase: string,
}

export interface Tipoactividad {
    id: number,
    descripcion: string
}

export interface Maestroactividad {
    id: number,
    descripcion: string,
    actividad: string,
    tipo_actividad: Tipoactividad,
    uc_instalacion: number,
    uc_retiro: number,
    uc_traslado: number,
    unidad: Unidad
}

export interface Unidad {
    id: number,
    nombre: string,
    codigo_corto: string
}

export interface TablaActividades {
    id: string;
    tipoOperacion: Tipooperacion;
    tipoActividad: Tipoactividad;
    maestroActividad: Maestroactividad;
    cantidad: number;
    ucUnitaria: number;
    ucTotal: number;
}

export interface TablaOtrasActividades {
    id: string;
    glosa: string;
    uc_unitaria: number;
    cantidad: number;
    uc_total: number;
}

export interface Jefesfaena {
    id: number,
    nombre: string
}

export interface Area {
    id: number,
    descripcion: string
}

export interface Brigada {
    id: number,
    valor: boolean,
    descripcion: string
}

export interface RecargosHora {
    id: number,
    nombre: string,
    porcentaje: number
}

