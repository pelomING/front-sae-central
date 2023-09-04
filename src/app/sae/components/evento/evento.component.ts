import { Component, OnInit } from '@angular/core';
import { Evento} from 'src/app/sae/model/evento.model';
import { EventoService } from 'src/app/sae/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {
  eventos?: Evento[];
  constructor(private eventoService: EventoService) { }
  ngOnInit(): void {
    this.recuperaEventos();
  }

  recuperaEventos(): void {
    this.eventoService.getEventos().subscribe({next: (data) => {this.eventos = data }, error: (e) => console.error(e)});

  }
}
