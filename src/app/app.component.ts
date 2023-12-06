import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
        @Inject(LOCALE_ID) private locale: string) {

        // Cambiar la configuración regional a español
        if (locale === 'es') {
            // Usar configuración regional en español
            document.documentElement.lang = 'es';
        }

    }

    ngOnInit() {

        this.primengConfig.setTranslation({
            startsWith: "Comience con",
            contains: "Contenga",
            notContains: "No contenga",
            endsWith: "Termine con",
            equals: "Igual a",
            notEquals: "Diferente a",
            noFilter: "Sin filtro",
            lt: "Menor que",
            lte: "Menor o igual a",
            gt: "Mayor que",
            gte: "Mayor o igual a",
            dateIs: "Fecha igual a",
            dateIsNot: "Fecha diferente a",
            dateBefore: "Fecha antes de",
            dateAfter: "Fecha después de",

            clear: "Limpiar",
            apply: "Aplicar",
            matchAll: "Coincidir todo",
            matchAny: "Coincidir con cualquiera",
            addRule: "Agregar regla",
            removeRule: "Eliminar regla",
            accept: "Sí",
            reject: "No",
            choose: "Escoger",
            upload: "Subir",
            cancel: "Cancelar",
           
            dayNames: [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ],
            dayNamesShort: [
                "Dom",
                "Lun",
                "Mar",
                "Mié",
                "Jue",
                "Vie",
                "Sáb"
            ],
            dayNamesMin: [
                "D",
                "L",
                "M",
                "M",
                "J",
                "V",
                "S"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ],
            monthNamesShort: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ],
            //"dateFormat": "dd-mm-yy"
        });

        this.primengConfig.ripple = true;
    }

}
