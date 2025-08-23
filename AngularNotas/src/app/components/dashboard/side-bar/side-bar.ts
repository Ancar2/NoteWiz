import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [RouterLink, RouterLinkActive,],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {

  constructor(private router: Router){}

  logOut(){
    const confirmacion = confirm ('¿Estás seguro de cerrar Sesion?')
    if (!confirmacion) {
      return
    }
    sessionStorage.clear()
    this.router.navigate(['/home'])
  }
}
