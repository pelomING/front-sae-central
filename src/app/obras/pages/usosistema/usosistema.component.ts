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

    x:any[];
    y:any[];
    r:any[];

    constructor(public route: ActivatedRoute, private obrasService: ObrasService) { }

    ngOnInit() {

        this.obrasService.getalllogin().subscribe({
            next: x => {
                console.log("x:", x);
                this.x=x;
            },
            error: err => {
                console.log(err);
            }
        });

        this.obrasService.getResumenobrasrecientes().subscribe({
            next: y => {
                console.log("y:", y);
                this.y=y;
            },
            error: err => {
                console.log(err);
            }
        });

        this.obrasService.getResumenobrasinreportes().subscribe({
            next: r => {
                console.log("r:", r);
                this.r=r;
            },
            error: err => {
                console.log(err);
            }
        });

    }








}
