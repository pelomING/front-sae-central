
export interface EstadoResultado {
    id?: string;
    id_usuario?: string;
    nombre_usuario?: string;
    id_cliente?: string;
    nombre_cliente?: string;
    zona?: string;
    nombre_zona?: string;
    paquete?: string;
    nombre_paquete?: string;
    mes?: string;
    nombre_mes?: string;
    fecha_inicio?: string;
    fecha_final?: string;
    nombre_doc?: string;
    url_doc?: string;
    fecha_creacion?: string;
    fecha_modificacion?: string;
    estado?: string;
    eventos_relacionados?: number[];
}