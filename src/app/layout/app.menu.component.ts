import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { PrimeIcons } from 'primeng/api';

import { StorageService } from '../auth/services/storage.service';


@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService,
    private storageService: StorageService) { }

  /*===*/
  ngOnInit() {



    let user = this.storageService.getUser();

    if (user.roles[0] === 'ROLE_ADMINSAE'  ||  user.roles[0] === 'ROLE_ADMIN') 
    {

      this.model = [
        {
          label: 'Gestión Sae',
          items: [
            // {
            //     label: 'Dashboard',
            //     icon: PrimeIcons.STAR_FILL,
            //     routerLink: '/obras/dashboard',
            //   },
            { label: 'Eventos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/evento'] },
            { label: 'Turnos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/jornada'] },
            { label: 'Historico Estado de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/estado'] },
            { label: 'Consultar Estado de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/NewEstado'] },

            { label: 'Detalle PxQ', icon: 'pi pi-fw pi-angle-right', routerLink: ['/detallepxq'] },

            { label: 'Observaciones', icon: 'pi pi-fw pi-angle-right', routerLink: ['/observaciones'] },
            { label: 'Cobros Adicionales', icon: 'pi pi-fw pi-angle-right', routerLink: ['/cobros_adicionales'] },
            { label: 'Descuentos', icon: 'pi pi-fw pi-angle-right', routerLink: ['/descuentos'] },
            { label: 'Horas Extras', icon: 'pi pi-fw pi-angle-right', routerLink: ['/horas_extras'] },
          

          ]
        }

      ];

    }


    //ROLE_ADMINOBRAS
    if (user.roles[0] === 'ROLE_ADMINOBRAS' ||  user.roles[0] === 'ROLE_ADMIN') 
    {

      this.model = [
        {
          label: 'Gestión Sae',
          items: [
            {
              label: 'Dashboard',
              icon: PrimeIcons.STAR_FILL,
              routerLink: '/obras/dashboard',
            },
            { label: 'Eventos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/evento'] },
            { label: 'Turnos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/jornada'] },
            { label: 'Historico Estados de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/estado'] },
            { label: 'Crear Nuevo Estado de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/NewEstado'] }
          ]
        },
        {
          label: 'Gestión Obras',
          items: [
            {
              label: 'Dashboard',
              icon: PrimeIcons.STAR_FILL,
              routerLink: '/obras/dashboard',
            },

            {
              label: 'Listado de Obras',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras',
            },
            {
              label: 'Materiales Obras',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/materiales',
            },
            {
              label: 'Agenda Visita Terreno',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/agendas'
            },
            {
              label: 'Reporte Diario',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/reportediario'
            },
            {
              label: 'Materiales faltantes',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/materialesfaltantes'
            },
            {
              label: 'Cuadratura Materiales',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/cuadraturamateriales'
            },
            {
              label: 'Estado de Pago',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/estadopago'
            },
            {
              label: 'Estado de Obras',
              icon: 'pi pi-fw pi-angle-right',
              routerLink: '/obras/estadoobra'
            }
          ]
        },

      ];

    }


        // this.model = [
        //     {
        //         label: 'Gestión Sae',
        //         items: [
        //             {
        //                 label: 'Dashboard',
        //                 icon: PrimeIcons.STAR_FILL,
        //                 routerLink: '/obras/dashboard',
        //               },
        //             { label: 'Eventos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/evento'] },
        //             { label: 'Turnos Ejecutados', icon: 'pi pi-fw pi-angle-right', routerLink: ['/jornada'] },
        //             { label: 'Historico Estados de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/estado'] },
        //             { label: 'Crear Nuevo Estado de Pago', icon: 'pi pi-fw pi-angle-right', routerLink: ['/NewEstado'] }
        //         ]
        //     },
        //     {
        //         label: 'Gestión Obras',
        //         items: [
        //             {
        //               label: 'Dashboard',
        //               icon: PrimeIcons.STAR_FILL,
        //               routerLink: '/obras/dashboard',
        //             },

        //             {
        //               label: 'Listado de Obras',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras',
        //             },
        //             {
        //               label: 'Materiales Obras',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/materiales',
        //             },
        //             {
        //               label: 'Agenda Visita Terreno',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/agendas'
        //             },
        //             {
        //               label: 'Reporte Diario',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/reportediario'
        //             },
        //             {
        //               label: 'Materiales faltantes',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/materialesfaltantes'
        //             },
        //             {
        //               label: 'Cuadratura Materiales',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/cuadraturamateriales'
        //             },
        //             {
        //               label: 'Estado de Pago',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/estadopago'
        //             },
        //             {
        //               label: 'Estado de Obras',
        //               icon: 'pi pi-fw pi-angle-right',
        //               routerLink: '/obras/estadoobra'
        //             }
        //           ]
        //     },
            // {
            //     label: 'Personal',
            //     items: [
            //         { label: 'Personas', icon: 'pi pi-fw pi-home', routerLink: ['/persona'] }
            //     ]
            // },
            /*
            {
                label: 'UI Components',
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'], routerLinkActiveOptions: { paths: 'subset', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' } },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Prime Blocks',
                items: [
                    { label: 'Free Blocks', icon: 'pi pi-fw pi-eye', routerLink: ['/blocks'], badge: 'NEW' },
                    { label: 'All Blocks', icon: 'pi pi-fw pi-globe', url: ['https://www.primefaces.org/primeblocks-ng'], target: '_blank' },
                ]
            },
            {
                label: 'Utilities',
                items: [
                    { label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', routerLink: ['/utilities/icons'] },
                    { label: 'PrimeFlex', icon: 'pi pi-fw pi-desktop', url: ['https://www.primefaces.org/primeflex/'], target: '_blank' },
                ]
            },*/
            // {
            //     label: 'Pages',
            //     icon: 'pi pi-fw pi-briefcase',
            //     items: [
            //         {
            //             label: 'Landing',
            //             icon: 'pi pi-fw pi-globe',
            //             routerLink: ['/landing']
            //         },
            //         {
            //             label: 'Auth',
            //             icon: 'pi pi-fw pi-user',
            //             items: [
            //                 {
            //                     label: 'Login',
            //                     icon: 'pi pi-fw pi-sign-in',
            //                     routerLink: ['/auth/login']
            //                 },
            //                 {
            //                     label: 'Error',
            //                     icon: 'pi pi-fw pi-times-circle',
            //                     routerLink: ['/auth/error']
            //                 },
            //                 {
            //                     label: 'Access Denied',
            //                     icon: 'pi pi-fw pi-lock',
            //                     routerLink: ['/auth/access']
            //                 }
            //             ]
            //         },
            //         {
            //             label: 'Crud',
            //             icon: 'pi pi-fw pi-pencil',
            //             routerLink: ['/pages/crud']
            //         },
            //         {
            //             label: 'Timeline',
            //             icon: 'pi pi-fw pi-calendar',
            //             routerLink: ['/pages/timeline']
            //         },
            //         {
            //             label: 'Not Found',
            //             icon: 'pi pi-fw pi-exclamation-circle',
            //             routerLink: ['/notfound']
            //         },
            //         {
            //             label: 'Empty',
            //             icon: 'pi pi-fw pi-circle-off',
            //             routerLink: ['/pages/empty']
            //         },
            //     ]
            // },
            // {
            //     label: 'Hierarchy',
            //     items: [
            //         {
            //             label: 'Submenu 1', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 1.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 1.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' }
            //                     ]
            //                 },
            //             ]
            //         },
            //         {
            //             label: 'Submenu 2', icon: 'pi pi-fw pi-bookmark',
            //             items: [
            //                 {
            //                     label: 'Submenu 2.1', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
            //                         { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //                 {
            //                     label: 'Submenu 2.2', icon: 'pi pi-fw pi-bookmark',
            //                     items: [
            //                         { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
            //                     ]
            //                 },
            //             ]
            //         }
            //     ]
            // },
            // {
            //     label: 'Get Started',
            //     items: [
            //         {
            //             label: 'Documentation', icon: 'pi pi-fw pi-question', routerLink: ['/documentation']
            //         },
            //         {
            //             label: 'View Source', icon: 'pi pi-fw pi-search', url: ['https://github.com/primefaces/sakai-ng'], target: '_blank'
            //         }
            //     ]
            // }
            
        //];


  }
  /*===*/
}
