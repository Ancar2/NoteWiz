import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/users/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userService = inject(User)

  formUser!: FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    this.formUser = fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  registerUser() {
    if (!this.formUser.valid) {
      alert('Formulario no válido');
      return;

    }

    this.userService.register(this.formUser.value).subscribe({
      next: (dataApi: any) => {
        console.log('Usuario registrado con éxito', dataApi);


        let timerInterval: any;

        Swal.fire({
          title: "Usuario Registrado",
          html: "Enviando token en <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer: any = Swal.getPopup()?.querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }

        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("usuario registrado");
          }
        });


        this.router.navigate(['/verify']);
      },
      error: (error: any) => {
        console.log('Error al registrar el usuario', error);
        return alert (error.error)
      }
    })
  }
}
