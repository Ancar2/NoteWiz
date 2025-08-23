import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CardNotes } from "../../templates/card-notes/card-notes";
import { Notas } from '../../../services/notas/notas';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import flashy from '@pablotheblink/flashyjs';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-body',
  imports: [CardNotes, ReactiveFormsModule],
  templateUrl: './body.html',
  styleUrls: ['./body.css']
})
export class Body {
servicesNotas = inject(Notas)
authService = inject(Auth)
private intervalId: any;
formNotes!: FormGroup
arrayNotas!: any

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.formNotes = fb.group({
      titulo: ['',[Validators.required]],
      descripcion: ['',[Validators.required]]
    })
  }
  notaIdEditando: string = '';

  renderNotas() {
    this.servicesNotas.getNotas().subscribe({
      next: (dataApi:any) => {
        this.arrayNotas = dataApi;
        this.cdr.detectChanges()
        console.log(this.arrayNotas);
      },
      error: (error: any) => {
        console.log('Error al cargar las notas', error);
      }
    })
  }

  createNote(){
    if (!this.formNotes.valid) {
      flashy.warning('formulario invalido',{
        position: 'top-center'
      });
      return;
    }

    this.servicesNotas.createNotas(this.formNotes.value).subscribe({
      next: (dataApi: any) => {
        this.formNotes.reset()
        flashy.success('¡Nota creada!',{
          position: 'top-center'
        });
        console.log('nota creada', dataApi);
        this.renderNotas()
      },

      error(error:any){
        console.log('error al crear nota', error);
      }
    })
  }

  statusNota(nuevoStatus: string){
    const actualizacion = {status: nuevoStatus}
    this.servicesNotas.editNota(actualizacion, this.notaIdEditando).subscribe({
      next: (dataApi:any) => {
        this.renderNotas();
      },
      error: (error: any) => {
        console.log('Error al actualizar la nota', error);

      }
    })
  }

  editarNota(id:any){
    this.notaIdEditando = id
    console.log(this.notaIdEditando);
    this.servicesNotas.getOneNota(id).subscribe({
      next: (dataApi:any) => {
        this.formNotes.patchValue({
          titulo: dataApi.titulo,
          descripcion: dataApi.descripcion
        })
      },
      error: (error: any) => {
        console.log('Error al editar la nota', error);

      }
    })
  }

  actualizarNota(){
    this.servicesNotas.editNota(this.formNotes.value, this.notaIdEditando).subscribe({
      next: (dataApi:any) => {
        this.renderNotas();
      },
      error: (error: any) => {
        console.log('Error al actualizar la nota', error);

      }
    })
  }

  eliminarNota(id: string) {
    this.servicesNotas.deleteNotas(id)?.subscribe({
      next: (dataApi:any) => {
        this.renderNotas();
      },
      error: (error: any) => {
        console.log('Error al eliminar la nota', error);

      }

  })
  }

  tokenExp() {

   this.intervalId = setInterval(() => {
      if (this.authService.isTokenExpired()) {
        this.authService.logout(); // Borra token y redirige
        clearInterval(this.intervalId); // Para el chequeo cuando ya cerró sesión
      }
    }, 3600000); // milisegundos
  }

  ngOnInit () {
    this.renderNotas();
    this.tokenExp()
    if (this.authService.isTokenExpired()) {
        this.authService.logout();
    }
  }
}

