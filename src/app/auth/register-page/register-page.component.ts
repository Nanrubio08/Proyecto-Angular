import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  form = this.fb.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    const { nombre, correo, password } = this.form.value as {
      nombre: string;
      correo: string;
      password: string;
    };

    this.loading = true;
    this.errorMsg = '';

    this.auth.register({ nombre, correo, password }).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al registrar';
        this.loading = false;
      }
    });
  }
}