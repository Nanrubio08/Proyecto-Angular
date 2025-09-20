import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    tipoid: ['', Validators.required],
    id: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: [''],
    direccion: [''],
    ciudad: [''],
    password: ['', Validators.required]
  });

  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  onSubmit(): void {
  if (this.form.invalid) return;

  const raw = this.form.value;

  const payload = {
    nombre: raw.nombre ?? '',
    tipoid: raw.tipoid ?? '',
    id: Number(raw.id), 
    correo: raw.correo ?? '',
    telefono: raw.telefono ?? '',
    direccion: raw.direccion ?? '',
    ciudad: raw.ciudad ?? '',
    password: raw.password ?? ''
  };

  this.loading = true;
  this.errorMsg = '';

  this.auth.register(payload).subscribe({
    next: () => this.router.navigate(['/perfil']),
    error: (err) => {
      this.errorMsg = err.error?.error || 'Error al registrar';
      this.loading = false;
    }
  });

  }
}