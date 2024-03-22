import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

import { ObrasService } from '../../services/obras.service';

import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);


@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-page.component.html',
    styleUrls: ['./dashboard-page.component.scss']
})

export class DashboardPageComponent implements OnInit {


    Highcharts: typeof Highcharts = Highcharts; // required


    submitted: boolean;
    statuses: any[];

    chartData: any;
    chartOptions: any;

    chartDataPie: any;
    chartOptionsPie: any;

    chartDataPie_maule_norte: any;
    chartDataPie_maule_sur: any;


    chartDataPie2: any;
    chartOptionsPie2: any;

    pieData: any;
    pieOptions: any;

    constructor(private obrasService: ObrasService, 
                private messageService: MessageService, 
                private confirmationService: ConfirmationService) { }


    ngOnInit() {

        this.listadoObras();

    }


    private codigo_vista = 111;

    graficas_resumen_estados: any;
    graficas_resumen_maule_norte: any;
    graficas_resumen_maule_sur: any;

    graficas_resumen_tipos_obra: any;
    graficas_resumen_mnorte_tipo_obra: any;
    graficas_resumen_msur_tipo_obra: any;

    obras_estados_total: any;
    obras_ingresadas: any;
    obras_visita_exitosa: any;
    obras_enfaena: any;
    obras_paralizadas: any;
    obras_finalizadas: any;
    obras_eliminadas: any;

    chartOptionsHighcharts: any;

    listadoObras() {
        this.obrasService.getResumenObras().subscribe(
            (Respuesta: any) => {


                console.log("Respuesta",Respuesta);

                this.graficas_resumen_estados = Respuesta.resumen_estados;


                this.graficas_resumen_tipos_obra = Respuesta.resumen_tipos_obra;
                
                this.graficas_resumen_mnorte_tipo_obra = Respuesta.resumen_mnorte_tipo_obra;
                
                this.graficas_resumen_msur_tipo_obra = Respuesta.resumen_msur_tipo_obra;


                console.log("this.graficas_resumen_estados",this.graficas_resumen_estados);

                this.obras_estados_total = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 999);
                this.obras_ingresadas = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 1);
                this.obras_visita_exitosa = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 4);
                this.obras_enfaena = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 5);
                this.obras_paralizadas = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 6);
                this.obras_finalizadas = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 7);
                this.obras_eliminadas = this.graficas_resumen_estados.find((item: { id: number; }) => item.id == 8);

                
                this.graficas_resumen_maule_norte = Respuesta.resumen_maule_norte;  

                console.log("this.graficas_resumen_maule_norte",this.graficas_resumen_maule_norte);


                this.graficas_resumen_maule_sur = Respuesta.resumen_maule_sur;

                console.log("this.graficas_resumen_maule_sur",this.graficas_resumen_maule_sur);
 

                this.initChart();

            },
            (error: any) => {
                console.error('Error al obtener las obras:', error);
            }
        );
    }



    initChart() {

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        
        let porcentajes = this.graficas_resumen_estados.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        let estados = porcentajes.map((item: { estado: any; cantidad: string; }) => item.estado +':'+item.cantidad );
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => parseFloat(item.porcentaje));

        this.chartDataPie = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };

        this.chartOptionsPie = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };



        porcentajes = this.graficas_resumen_maule_norte.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        estados = porcentajes.map((item: { estado: any; cantidad: string; }) => item.estado +':'+item.cantidad );
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => item.porcentaje );

        this.chartDataPie_maule_norte = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };



        porcentajes = this.graficas_resumen_maule_sur.filter((item: { estado: string; }) => item.estado !== "TOTAL");
        estados = porcentajes.map((item: { estado: any; cantidad: string; }) => item.estado +':'+item.cantidad );
        porcentajes = porcentajes.map((item: { porcentaje: string; }) => parseFloat(item.porcentaje));
        
        this.chartDataPie_maule_sur = {
            labels: estados,
            datasets: [{
                data: porcentajes,
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-300'),
                    documentStyle.getPropertyValue('--green-300'),
                    documentStyle.getPropertyValue('--yellow-300'),
                    documentStyle.getPropertyValue('--cyan-300'),
                    documentStyle.getPropertyValue('--pink-300'),
                    documentStyle.getPropertyValue('--indigo-300'),
                    documentStyle.getPropertyValue('--teal-400'),
                    documentStyle.getPropertyValue('--orange-400'),
                ]
            }]
        };


        // this.chartOptionsHighcharts = {
        //     chart: {
        //         type: 'line'
        //     },
        //     title: {
        //         text: 'My Chart'
        //     },
        //     series: [{
        //         data: [1, 2, 3, 4, 5]
        //     }]
        // };

    }


}
