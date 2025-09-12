import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarruselComponent } from '../carrusel/carrusel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CarruselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
