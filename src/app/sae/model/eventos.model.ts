export interface Eventos {
    id?: number;
    numero_ot?: string;
    tipo_evento?: string;
    rut_maestro?: string;
    rut_ayudante?: string;
    nombre_maestro?: string;
    nombre_ayudante?: string;
    turno?: string;
    paquete?: string;
    requerimiento?: string;
    trabajo_solicitado?: string;
    trabajo_realizado?: string;
        
    direccion?: string;
    fecha_hora?: string;
    estado?: string;
    hora_inicio?: string;
    hora_termino?: string;
    brigada?: string;
    tipo_turno?: string;
    comuna?: string;
    despachador?: string;
    coordenadas?: Coordenadas;    
}

export interface Coordenadas {
  latitude?: string;
  longitude?: string;
}


