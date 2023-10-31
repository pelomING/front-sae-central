export interface Jornada {
    id?: number;
    rut_maestro?: string;
    rut_ayudante?: string;
    codigo_turno?: number;
    patente?: string;
    base?: number;
    km_inicial?: number;
    km_final?: number;
    fecha_hora_inicio?: string;
    fecha_hora_fin?: string;
    estado?: number;
}