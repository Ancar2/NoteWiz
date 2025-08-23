import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/users/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  userService = inject(Auth)

  formUser! : FormGroup

  constructor(private fb: FormBuilder, private router: Router) {
    this.formUser = fb.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  loginUser () {
    if (!this.formUser.valid) {
      alert('Formulario no válido');
      return;
    }

    this.userService.login(this.formUser.value).subscribe({
      next: (dataApi:any) => {
        sessionStorage.setItem('token', dataApi.token);
        this.router.navigate(['/dashboard']);

      },
      error: (error: any) => {
        console.log('Error al loguear el usuario', error);
      }
    })
  }
}
