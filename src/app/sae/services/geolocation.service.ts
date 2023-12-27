import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer: Observer<GeolocationPosition>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position);
            observer.complete();
          },
          (error: GeolocationPositionError) => observer.error(error)
        );
      } else {
        observer.error('La geolocalización no es compatible con este navegador.');
      }
    });
  }
}
