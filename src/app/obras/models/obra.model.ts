
import { Zona, Delegacion, Estado, Obra } from '../interfaces/obra.interface';

export class ObraModel implements Obra {
  constructor(
    public id: number,
    public codigo_obra: string,
    public numero_ot: string,
    public nombre_obra: string,
    public zona: Zona,
    public delegacion: Delegacion,
    public gestor_cliente: string | null,
    public numero_aviso: number,
    public numero_oc: string | null,
    public monto: number,
    public cantidad_uc: number,
    public fecha_llegada: string | null,
    public fecha_inicio: string | null,
    public fecha_termino: string | null,
    public tipo_trabajo: string | null,
    public persona_envia_info: string | null,
    public cargo_persona_envia_info: string | null,
    public empresa_contratista: string | null,
    public coordinador_contratista: string | null,
    public comuna: string | null,
    public ubicacion: string | null,
    public estado: Estado,
    public tipo_obra: string | null,
    public segmento: string | null,
    public eliminada: boolean
  ) {}
}
