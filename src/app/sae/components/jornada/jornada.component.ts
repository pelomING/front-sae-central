import { Component, OnInit } from '@angular/core';
import { Turnos} from 'src/app/sae/model/turnos.model';
import { JornadaService } from 'src/app/sae/services/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html'
})
export class JornadaComponent implements OnInit {
  jornadas?: Turnos[];
  constructor(private jornadaService: JornadaService) { }
  ngOnInit(): void {
    this.recuperaJornadas();
  }

  recuperaJornadas(): void {
    this.jornadaService.getJornada().subscribe({next: (data) => {this.jornadas = data}, error: (e) => console.error(e)});
  }
}
