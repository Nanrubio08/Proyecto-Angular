import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  form = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.form.invalid) return;

    const { correo, password } = this.form.value as { correo: string; password: string };

    this.loading = true;
    this.errorMsg = '';

    this.auth.login({ correo, password }).subscribe({
      next: () => this.router.navigate(['/perfil']),
      error: (err) => {
        this.errorMsg = err.error?.error || 'Error al iniciar sesión';
        this.loading = false;
      }
    });
  }
}