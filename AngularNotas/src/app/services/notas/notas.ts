import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Notas {
 public apiUrl: string = 'http://3.19.60.135/NoteWiz/api';

  constructor(public http: HttpClient) { }

  headerToken(){
    const token = sessionStorage.getItem('token')
    const headers = new HttpHeaders({
      'authorization': `Bearer ${token}`,
    })
    return headers
  }

  getNotas() {
    const headers = this.headerToken()
    return this.http.get(`${this.apiUrl}/works`,{headers})
  }

  getOneNota(id: string){
    const headers = this.headerToken();
    return this.http.get(`${this.apiUrl}/works/${id}`,{headers})
  }

  deleteNotas(id: string) {
    const headers = this.headerToken()
    const confirmacion = confirm('¿Estás seguro de eliminar esta nota?');
   if (!confirmacion) {
      console.log('Eliminación cancelada por el usuario');
      return;
    }
    console.log('Nota eliminada');
    return this.http.delete(`${this.apiUrl}/works/delete/${id}`,{headers})
  }

  eliminarNotasper(id: string) {
    const headers = this.headerToken()
    const confirmacion = confirm('¿Estás seguro de eliminar esta nota permanentemente?')
    if (!confirmacion) {
      return;
    }
    console.log("Nota eliminada permanentemente");
    return this.http.delete(`${this.apiUrl}/works/delete/${id}?hard=true`,{headers})
  }

  recoverNotas(id: string) {
    const headers = this.headerToken()
     const confirmacion = confirm(`¿Estás seguro de recuperar esta nota con id ${id}?`);
     if (!confirmacion) {
      console.log('recuperacion cancelada');
      return;
     }
     console.log('Nota recuperada');
    return this.http.put(`${this.apiUrl}/works/update/${id}`,
      {
      "isDeleted" : "false"
      },{ headers })
  }


  createNotas(body: any){
    const headers = this.headerToken()
    return this.http.post(`${this.apiUrl}/works/create`, body, { headers })
  }

  editNota(body:any, id:string){
    const headers = this.headerToken()
    return this.http.put(`${this.apiUrl}/works/update/${id}`, body, { headers })
  }
}
