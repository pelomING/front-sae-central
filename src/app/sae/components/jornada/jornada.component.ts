import { Component, OnInit } from '@angular/core';
import { Jornada} from 'src/app/sae/model/jornada.model';
import { JornadaService } from 'src/app/sae/services/jornada.service';

@Component({
  selector: 'app-jornada',
  templateUrl: './jornada.component.html'
})
export class JornadaComponent implements OnInit {
  jornadas?: Jornada[];
  constructor(private jornadaService: JornadaService) { }
  ngOnInit(): void {
    this.recuperaJornadas();
  }

  recuperaJornadas(): void {
    this.jornadaService.getJornada().subscribe({next: (data) => {this.jornadas = data}, error: (e) => console.error(e)});
  }
}
