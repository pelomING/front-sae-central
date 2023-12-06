export interface Turnos {
    id?: number;
    rut_maestro?: string;
    rut_ayudante?: string;
    nombre_maestro?: string;
    nombre_ayudante?: string;
    turno?: string;
    patente?: string;
    paquete?: string;
    km_inicial?: string;
    km_final?: string;
    fecha_hora_ini?: string;
    fecha_hora_fin?: string;
    estado?: string;
    brigada?: string;
    tipo_turno?: string;
    coordenadas: Coordenadas;
}

export interface Coordenadas {
    latitude?: string;
    longitude?: string;
  }



    

  
