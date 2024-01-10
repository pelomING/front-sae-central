
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
  
  export  interface ReporteDiario {
    id_obra: number;
    fecha_reporte: string;
    jefe_faena: number;
    sdi: string;
    gestor_cliente: string;
    id_area: number;
    brigada_pesada: boolean;
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
  }

  

export interface Tipooperacion 
{
    id: number,
    nombre: string
}

export interface Tipoactividad
{
    id: number,
    descripcion: string
}

export interface Maestroactividad
{
    id: number,
    actividad: string,
    tipo_actividad: Tipoactividad,
    uc_instalacion: string,
    uc_retiro: string,
    uc_traslado: string,
    descripcion: string,
    unidad: Unidad
}

export interface Unidad {
    id: number,
    nombre: string,
    codigo_corto: string
}



