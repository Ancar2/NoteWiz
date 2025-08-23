import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CardTrash } from "../../templates/card-trash/card-trash";
import { Notas } from '../../../services/notas/notas';

@Component({
  selector: 'app-trash',
  imports: [CardTrash],
  templateUrl: './trash.html',
  styleUrl: './trash.css'
})
export class Trash {
servicesNotas = inject(Notas)
arrayNotas!: any

  constructor(
    private cdr: ChangeDetectorRef
  ) {

  }


  renderNotas() {
    this.servicesNotas.getNotas().subscribe({
      next: (dataApi:any) => {
        this.arrayNotas = dataApi;
        this.cdr.detectChanges()
        console.log(this.arrayNotas);
      },
      error: (error: any) => {
        console.log('Error al cargar las notas');
      }
    })
  }

   ngOnInit () {
    this.renderNotas();
  }

  recoverNota(id: string) {
    this.servicesNotas.recoverNotas(id)?.subscribe({
      next: (dataApi:any) => {
        this.renderNotas();
      },
      error: (error: any) => {
        console.log('Error al recuperar la nota', error);

      }

    })
  }

   eliminarNotaPer(id:string) {

    this.servicesNotas.eliminarNotasper(id)?.subscribe({
      next: (dataApi:any) => {
       this.renderNotas();
      },
      error: (error: any) => {
        console.log('Error al eliminar la nota', error);

      }
    })
  }
}
