
export interface VisitaTerreno {
    id: number;
    id_obra: ObraDetalle;
    fecha_visita: string;
    direccion: string;
    persona_mandante: string;
    cargo_mandante: string;
    persona_contratista: string;
    cargo_contratista: string;
    observacion: string;
    estado: Estado;
    fecha_modificacion: string;
  }
  
  export interface ObraDetalle {
    id: number;
    codigo_obra: string;
  }
  
  export interface Estado {
    id: number;
    nombre: string;
  }
  

  export interface VisitaTerrenoCrear {
    id: number | null;
    id_obra: number | null;
    fecha_visita: string | null;
    direccion: string | null;
    persona_mandante: string | null;
    cargo_mandante: string | null;
    persona_contratista: string | null;
    cargo_contratista: string | null;
    observacion: string | null
  }
