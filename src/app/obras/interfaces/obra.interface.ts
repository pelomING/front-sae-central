
export interface Zona {
    id: number;
    nombre: string;
}

export interface Delegacion {
    id: number;
    nombre: string;
}

export interface Tipotrabajos {
    id: number;
    descripcion: string;
}

export interface Empresacontratistas {
    id: number;
    nombre: string;
    rut: string;
}

export interface Coordinadorcontratistas {
    id: number;
    nombre: string;
    id_empresa: number;
    rut: string;
}

export interface Comuna {
    codigo: string;
    nombre: string;
    provincia: string;
}

export interface Estado {
    id: number;
    nombre: string;
}

export interface Tipo_obra {
    id: number;
    descripcion: string;
    bg_color: string;
    txt_color: string;
}

export interface Segmento {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface OficinaSupervisor {
    id: number;
    oficina: string;
    supervisor: string;
}


export interface RecargoPorDistancia {
    id: number;
    nombre: string;
    porcentaje: number;
}





export interface Obra {
    id: number;
    codigo_obra: string;
    numero_ot: string;
    nombre_obra: string;
    zona: Zona;
    delegacion: Delegacion;
    gestor_cliente: string | null;
    numero_aviso: number;
    numero_oc: string | null;
    monto: number;
    cantidad_uc: number;
    fecha_llegada: string | null;
    fecha_inicio: string | null;
    fecha_termino: string | null;
    tipo_trabajo: Tipotrabajos;
    persona_envia_info: string | null;
    cargo_persona_envia_info: string | null;
    empresa_contratista: Empresacontratistas;
    coordinador_contratista: Coordinadorcontratistas;
    comuna: Comuna;
    ubicacion: string | null;
    estado: Estado;
    tipo_obra: Tipo_obra;
    segmento: Segmento;
    
    jefe_delegacion:string | null;
    oficina: OficinaSupervisor;
    recargo_distancia:RecargoPorDistancia;

    eliminada: boolean;
}
