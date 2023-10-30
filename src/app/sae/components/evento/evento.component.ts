import { Component, OnInit } from '@angular/core';
import { Eventos} from 'src/app/sae/model/eventos.model';
import { EventoService } from 'src/app/sae/services/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {
  eventos?: Eventos[];
  constructor(private eventoService: EventoService) { }
  ngOnInit(): void {
    this.recuperaEventos();
  }

  recuperaEventos(): void {
    this.eventoService.getEventos().subscribe({next: (data) => {
      
      console.log("data eventos:",data);
      
      this.eventos = data 

    }, error: (e) => console.error(e)});
  }
}
