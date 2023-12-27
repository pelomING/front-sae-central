export interface Turnos {

    id?: number;

    rut_maestro?: string;
    rut_ayudante?: string;
    
    nombre_maestro?: string;
    nombre_ayudante?: string;

    obj_maestro?: Maestro;
    obj_ayudante?: Ayudante;

    patente?: string;
    obj_camionetas?: Camioneta;
    
    km_inicial?: string;
    km_final?: string;
    fecha_hora_ini?: string;
    fecha_hora_fin?: string;

    brigada?: string;
    obj_brigada?: Brigada;

    tipo_turno?: string;
    obj_tipo_turno?: TipoTurno;

    turno?: string;
    paquete?: string;
    estado?: number;
    
    coordenadas?: Coordenadas;

    coordenada_x?: string,
    coordenada_y?: string


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

    

  
