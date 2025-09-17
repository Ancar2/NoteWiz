import { Component, inject } from '@angular/core';
import { User } from '../../../services/users/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify',
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './verify.html',
  styleUrls: ['./verify.css']
})
export class Verify {
  userService = inject(User)
  loading: boolean = false;
  success: boolean = false;
  errorMsg: string | null = null;

  formUser!: FormGroup
  drop: boolean = false;

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {
    this.formUser = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      token: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const correo = params['email'];
      const token = params['token'];
      console.log(correo);
      console.log(token);

      if (correo && token) {
        this.verifyEmail(correo, token);
      }
    });
  }

  verifyEmailInput() {
    if (!this.formUser.valid) {
      alert('Formulario no válido');
      return;
    }

    this.userService.verificar(this.formUser.value.correo, this.formUser.value.token).subscribe({
      next: (dataApi: any) => {
        this.loading = false;
        this.success = true;
        console.log('Correo verificado con éxito');

      },
      error: (error: any) => {
        if (error.status === 0) {
          alert('No se pudo conectar con el servidor');
        } else {
          this.loading = false;
          this.errorMsg = 'Error al verificar tu cuenta. Por favor intenta de nuevo.';
          console.log('Error al verificar el usuario', error);
          alert(error.error?.message || 'Error al verificar el correo');
        }
      }
    })
  }

  verifyEmail(correo: any, token: any) {
    this.loading = true;
    this.success = false;
    this.errorMsg = null;

    this.userService.verificar(correo, token).subscribe({
      next: (dataApi: any) => {
        this.loading = false;
        this.success = true;
        this.errorMsg = null;
        console.log(dataApi.message);

        // Mostrar mensaje en pantalla
        alert(dataApi.message);

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error: any) => {
        this.loading = false;
        if (error.status === 0) {
          alert('No se pudo conectar con el servidor');
        } else {
          this.errorMsg = 'Error al verificar tu cuenta. Por favor intenta de nuevo.';
          console.log('Error al verificar el usuario', error);
          alert(error.error?.message || 'Error al verificar el correo');
        }
      }


    })
  }

}
