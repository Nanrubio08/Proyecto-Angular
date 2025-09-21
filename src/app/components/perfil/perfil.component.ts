import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteUpdate } from '../../interfaces/cliente-update.interface';
import { NavbarComponent } from '../navbar/navbar.component';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,NavbarComponent,FooterComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilPageComponent implements OnInit {
  form = this.fb.group({
    nombre: [{ value: '', disabled: true }, Validators.required],
    tipoid: [{ value: '', disabled: true }, Validators.required],
    id: [{ value: 0, disabled: true }, Validators.required],
    correo: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
    telefono: [{ value: '', disabled: true }, Validators.required],
    direccion: [{ value: '', disabled: true }, Validators.required],
    ciudad: [{ value: '', disabled: true }, Validators.required],
    password: [''] // solo se usa en edición
  });

  editMode = false;
  clienteId = '';
  fechaRegistro = '';

  @ViewChild('toastElement', { static: false }) toastElement!: ElementRef;

 constructor(
  private fb: NonNullableFormBuilder,
  private clienteService: ClienteService,
  @Inject(PLATFORM_ID) private platformId: Object
) {}

 ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    const raw = localStorage.getItem('cliente');
    if (raw) {
      const cliente: Cliente = JSON.parse(raw);
      this.clienteId = cliente._id;
      this.fechaRegistro = cliente.fechaRegistro;

      this.form.patchValue({
        nombre: cliente.nombre,
        tipoid: cliente.tipoid,
        id: cliente.id,
        correo: cliente.correo,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        ciudad: cliente.ciudad
      });
    }
  }
}

  toggleEdit(): void {
    this.editMode = !this.editMode;

    if (this.editMode) {
      this.form.enable();
      this.form.get('id')?.disable();
      this.form.get('tipoid')?.disable();
    } else {
      this.form.disable();
      this.form.get('password')?.reset();
    }
  }

onSubmit(): void {
  if (this.form.invalid || !this.clienteId) return;

  const payload: ClienteUpdate = this.form.getRawValue();

  if (!payload.password || payload.password.trim() === '') {
    delete payload.password;
  }

  this.clienteService.actualizarCliente(this.clienteId, payload).subscribe({
    next: (clienteActualizado) => {
      localStorage.setItem('cliente', JSON.stringify(clienteActualizado));
      this.toggleEdit();

      // Mostrar toast solo en navegador
      if (isPlatformBrowser(this.platformId)) {
        import('bootstrap').then(({ Toast }) => {
          const toast = new Toast(this.toastElement.nativeElement);
          toast.show();
        });
      }
    },
    error: (err) => {
      console.error('Error al actualizar perfil:', err);
    }
  });
}
}