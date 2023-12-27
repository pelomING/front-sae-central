export interface Eventos {
    id?: number;
    numero_ot?: string;
    
    tipo_evento?: string;
    obj_tipo_evento?: TipoEvento;

    rut_maestro?: string;
    rut_ayudante?: string;
    nombre_maestro?: string;
    nombre_ayudante?: string;

    obj_maestro?: Maestro;
    obj_ayudante?: Ayudante;

    turno?: string;
    paquete?: string;
    requerimiento?: string;
    trabajo_solicitado?: string;
    trabajo_realizado?: string;
    
    patente?: string;
    obj_camionetas?: Camioneta;

    direccion?: string;
    fecha_hora?: string;
    
    estado?: number;
    
    hora_inicio?: string;
    hora_termino?: string;
    
    brigada?: string;
    obj_brigada?: Brigada;

    tipo_turno?: string;
    obj_tipo_turno?: TipoTurno;

    comuna?: string;
    obj_comuna?: Comuna;

    despachador?: string;
    coordenadas?: Coordenadas;    

    coordenada_x?: string;

    coordenada_y?: string;

}



export interface Coordenadas {
  latitude?: string;
  longitude?: string;
}

export interface Maestro {
  rut?: string;
  nombre?: string;
}

export interface Ayudante {
  rut?: string;
  nombre?: string;
}

export interface Brigada {
  id?: Number;
  brigada?: string;
}

export interface TipoTurno {
  id?: Number;
  nombre?: string;
}
  
export interface Camioneta {
  id?: Number;
  patente?: string;
}

export interface TipoEvento {
  codigo: string;
  descripcion: string;
}

export interface Comuna {
  codigo: Number;
  nombre: string;
}
