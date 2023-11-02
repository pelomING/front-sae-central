import { Component, OnInit } from '@angular/core';
import { Turnos} from 'src/app/sae/model/turnos.model';
import { TurnosService } from 'src/app/sae/services/turnos.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html'
})
export class JornadaComponent implements OnInit {
  jornadas?: Turnos[];
  constructor(private turnosService: TurnosService) { }
  ngOnInit(): void {
    this.recuperaJornadas();
  }

  recuperaJornadas(): void {
    this.turnosService.getJornada().subscribe({next: (data) => {this.jornadas = data}, error: (e) => console.error(e)});
  }
}
