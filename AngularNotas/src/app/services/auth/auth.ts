import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private apiUrl :string = 'https://d37ol04tnp8z3s.cloudfront.net/NoteWiz/api'
  constructor (private http: HttpClient, private router: Router){}

  login(body: any) {
    return this.http.post(`${this.apiUrl}/login`, body)
  }

  logout() {
  sessionStorage.clear();
  this.router.navigate(['/login']);
}


isTokenExpired(): boolean {
  const token = sessionStorage.getItem('token');
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // decodifica payload


    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);

    const diff = exp - now; // diferencia en segundos (puede ser negativa)

    // Formato: horas:minutos:segundos
    const absDiff = Math.abs(diff);
    const hours = Math.floor(absDiff / 3600);
    const minutes = Math.floor((absDiff % 3600) / 60);
    const seconds = absDiff % 60;

    if (diff > 0) {
      console.log(`El token expira en ${hours}h ${minutes}m ${seconds}s`);
    } else {
      console.log(`El token expiró hace ${hours}h ${minutes}m ${seconds}s`);
    }

    return now >= exp; // true si ya expiró

  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return true;
  }
}




}


