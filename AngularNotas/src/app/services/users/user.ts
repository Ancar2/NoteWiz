import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
    private apiUrl :string = 'http://localhost:3000/api'

    constructor ( private http: HttpClient){}

  register(body: any) {
    return this.http.post(`${this.apiUrl}/users/create`, body)
  }

  verificar(correo:any, token: any) {
    return this.http.post(`${this.apiUrl}/users/verify`, { correo, token })
  }

}
