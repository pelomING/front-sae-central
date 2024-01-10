
export interface ReporteDiario {
    id: number;
    id_obra: number; 
    fecha_reporte: string;
    jefe_faena: string;
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
    flexiapp: string;
}



tipooperacion 
{
    "id": 1,
    "nombre": "INSTALACIÓN"
  },


tipoactividad 
  {
    "id": 1,
    "descripcion": "Recargos_x_dist_desde_base_de_CONTRATANTE"
  },




  allmaestroactividad
  {
    "id": 1218,
    "actividad": "MTCU 15E 3/2L A2RA - TMR Paralelo",
    "tipo_actividad": {
      "id": 20,
      "descripcion": "Estructuras_MT"
    },
    "uc_instalacion": 5.7,
    "uc_retiro": 4.1,
    "uc_traslado": 9.8,
    "descripcion": "MTCU 15E 3/2L A2RA - TMR Paralelo",
    "unidad": {
      "id": 1,
      "nombre": "CU",
      "codigo_corto": "CU"
    }
  }



  

