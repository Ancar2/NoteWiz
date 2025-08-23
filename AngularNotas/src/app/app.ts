import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./components/dashboard/navbar/navbar";
import { Footer } from "./components/dashboard/footer/footer";
import { SideBar } from "./components/dashboard/side-bar/side-bar";
import { InactivityService } from './services/inactivity/inactivity';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, SideBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})


export class App {

  constructor(private inactivityService: InactivityService) {}

  protected title = 'Angular-2025';



  get tokenGuardado(): boolean {

    const token = sessionStorage.getItem('token');

    if (token !== null && token !== '') {
      return true;
    } else {
      return false;
    }
  }

}
















//   get tokenGuardado(): boolean {
  //   return !!sessionStorage.getItem('token');
  // }


