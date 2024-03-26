import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { Product } from '../../interfaces/product.interface';
import { VisitaTerreno } from '../../interfaces/visita-terreno.interface';

import { ProductService } from '../../services/productservice';
import { AgendaService } from '../../services/agenda.service';

import { ObrasService } from '../../services/obras.service';

import { Obra } from '../../interfaces/obra.interface';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-usosistema',
  templateUrl: './usosistema.component.html',
  styleUrls: ['./usosistema.component.scss']
})


export class UsoSistemaComponent implements OnInit {

  all_login_maule_norte: any[];
  all_login_maule_sur: any[];
  all_login_total: any[];

  resumen_obras_recientes_maule_norte: any[];
  resumen_obras_recientes_maule_sur: any[];
  resumen_obras_recientes_total: any[];

  resumen_obra_sin_reportes: any[];

  data_line_1: any;
  data_line_2: any;
  data_line_3: any;

  data_line_1_resumen_obras: any;
  data_line_2_resumen_obras: any;
  data_line_3_resumen_obras: any;

  activeTabIndex = 0;

  constructor(public route: ActivatedRoute, private obrasService: ObrasService) { }

  onTabChange(event) {

    this.getResumanObrasRecientes();

  }

  ngOnInit() {

    this.obrasService.getalllogin().subscribe({
      next: x => {

        console.log("getalllogin:", x);

        this.all_login_maule_norte = x.maule_norte;
        this.all_login_maule_sur = x.maule_sur;
        this.all_login_total = x.total;

        const labels = this.all_login_total.map(item => item.dia);
        const dataSet = this.all_login_total.map(item => item.cantidad);

        const labels1 = this.all_login_maule_norte.map(item => item.dia);
        const dataSet1 = this.all_login_maule_norte.map(item => item.cantidad);

        const labels2 = this.all_login_maule_sur.map(item => item.dia);
        const dataSet2 = this.all_login_maule_sur.map(item => item.cantidad);


        this.data_line_1 = {
          labels: labels,
          datasets: [
            {
              label: 'Total Ingresos',
              data: dataSet,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

        this.data_line_2 = {
          labels: labels1,
          datasets: [
            {
              label: 'Ingresos Maule Norte',
              data: dataSet1,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

        this.data_line_3 = {
          labels: labels2,
          datasets: [
            {
              label: 'Ingresos Maule Sur',
              data: dataSet2,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

      },
      error: err => {
        console.log(err);
      }
    });

    this.getResumanObrasRecientes();

    this.obrasService.getResumenobrasinreportes().subscribe({
      next: r => {
        console.log("getResumenobrasinreportes:", r);
        this.resumen_obra_sin_reportes = r.detalle;
      },
      error: err => {
        console.log(err);
      }
    });

  }



  getResumanObrasRecientes() {

    this.obrasService.getResumenobrasrecientes().subscribe({
      next: y => {
        
        console.log("getResumenobrasrecientes:", y);
        
        this.resumen_obras_recientes_maule_norte = y.maule_norte;
        this.resumen_obras_recientes_maule_sur = y.maule_sur;
        this.resumen_obras_recientes_total = y.total;

        const labels = this.resumen_obras_recientes_total.map(item => item.dia);
        const dataSet = this.resumen_obras_recientes_total.map(item => item.cantidad);

        const labels1 = this.resumen_obras_recientes_maule_norte.map(item => item.dia);
        const dataSet1 = this.resumen_obras_recientes_maule_norte.map(item => item.cantidad);

        const labels2 = this.resumen_obras_recientes_maule_sur.map(item => item.dia);
        const dataSet2 = this.resumen_obras_recientes_maule_sur.map(item => item.cantidad);

        this.data_line_1_resumen_obras = {
          labels: labels,
          datasets: [
            {
              label: 'Total Obras',
              data: dataSet,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

        this.data_line_2_resumen_obras = {
          labels: labels1,
          datasets: [
            {
              label: 'Obras Maule Norte',
              data: dataSet1,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

        this.data_line_3_resumen_obras = {
          labels: labels2,
          datasets: [
            {
              label: 'Obras Maule Sur',
              data: dataSet2,
              showLine: true,
              interaction: {
                intersect: true
              },
              radius: 1,
              spanGaps: true,
              borderColor: 'rgb(0, 188, 212)',  //#00BCD4  //'rgb(75, 192, 192)',
              backgroundColor: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
              borderCapStyle: 'rgb(0, 188, 212)', //'rgb(75, 192, 192)',
            }
          ]
        };

      },
      error: err => {
        console.log(err);
      }
    });

  }






}
