import { Component, OnInit } from '@angular/core';
import { Persona} from 'src/app/sae/models/persona.model';
import { Oficina } from 'src/app/sae/models/oficina.model';
import { TipoFuncion } from 'src/app/sae/models/tipoFuncion.model';
import { Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { PersonaService } from 'src/app/sae/services/persona.service';
import { OficinaService } from 'src/app/sae/services/oficina.service';
import { TipoFuncionService } from 'src/app/sae/services/tipoFuncion.service';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  providers: [MessageService]
})
export class PersonaComponent implements OnInit {
  personas?: Persona[] = [];
  persona?: Persona = {};

  oficinas?: Oficina[] = [];
  oficina?: Oficina = {};

  tipoFuncions?: TipoFuncion[] = [];
  tipoFuncion?: TipoFuncion = {};

  selectedPersonas: Persona[] = [];
  selectedOficina: Oficina | undefined;
  selectedTipoFuncion: TipoFuncion | undefined;

  personaDialog: boolean = false;
  submitted: boolean = false;
  cols: any[] = [];

  messages1: Message[] | undefined;

  /*
  form: any = {
    id: null,
    rut: null,
    apellido_1: null,
    apellido_2: null,
    nombres: null,
    base: null,
    cliente: null,
    id_funcion: null,
    activo: true
  };
  */
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private personaService: PersonaService, private oficinaService: OficinaService, private tipoFuncionService: TipoFuncionService) { }


  ngOnInit(): void {
    this.recuperaPersonas();
    this.recuperaOficinas();
    this.recuperaTipoFuncion();
    this.cols = [
        { field: 'rut', header: 'Rut' },
        { field: 'apellido_1', header: 'Primer Apellido' },
        { field: 'apellido_2', header: 'Segundo Apellido' },
        { field: 'nombres', header: 'Nombres' },
        { field: 'base', header: 'Oficina' },
        { field: 'id_funcion', header: 'Funcion' }
    ];
  }

  async recuperaPersonas(): Promise<void> {
    (await this.personaService.getPersonas()).subscribe({next: (data) => {this.personas = data }, error: (e) => console.error(e)});

  }

  recuperaOficinas(): void {
    this.oficinaService.getOficinas().subscribe({next: (data) => {this.oficinas = data }, error: (e) => console.error(e)});
  }

  recuperaTipoFuncion(): void {
    this.tipoFuncionService.getTipoFuncions().subscribe({next: (data) => {this.tipoFuncions = data }, error: (e) => console.error(e)});
  }

  grabaPersona(): void {

      this.submitted = true;
      if (this.persona.rut.trim() && this.persona.apellido_1.trim() && this.persona.apellido_2.trim() && this.persona.nombres.trim() && this.selectedOficina && this.selectedTipoFuncion) {
        this.persona.base = this.selectedOficina.id;
        this.persona.id_funcion = this.selectedTipoFuncion.id;
        console.log('graba');
        console.log(this.persona);
        console.log(this.selectedOficina);
        this.personaService.creaPersona(this.persona).subscribe({
          next: data => {
            console.log(data);
            this.personaDialog = false;
            this.persona = {};
            this.selectedOficina = {};
            this.selectedTipoFuncion = {};
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.messages1 = [
                { severity: 'error', summary: 'Error', detail: err.error.message },
            ];
          }
        })
      }
  }

  openNew() {
    this.persona = {};
    this.submitted = false;
    this.personaDialog = true;
}

hideDialog() {
    this.personaDialog = false;
    this.submitted = false;
}

onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
}
/*
  onSubmit(form:NgForm): void {

    this.personaService.creaPersona(form).subscribe({
      next: data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }*/
}
