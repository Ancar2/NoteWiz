// inactivity.service.ts
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class InactivityService {

  private timeoutInMs =  5 * 60 * 1000;
  private timeoutId: any;

  constructor(
    private authService: Auth,
    private ngZone: NgZone
  ) {
    this.initListener();
    this.resetTimer();
  }


  private initListener() {
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => {
      window.addEventListener(event, () => this.resetTimer());
    });
  }


  private resetTimer() {
    if (this.timeoutId) clearTimeout(this.timeoutId);

    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          if (sessionStorage.getItem('token')) {
            this.authService.logout();
            alert('Sesión cerrada por inactividad');
          }
          return
        });
      }, this.timeoutInMs);

    });
  }
}
