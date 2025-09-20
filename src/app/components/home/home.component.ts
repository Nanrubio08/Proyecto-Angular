import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CarruselComponent } from '../carrusel/carrusel.component';
import { DestacadosComponent } from '../destacados/destacados.component';
import { OfertasComponent } from "../ofertas/ofertas.component";
import { ProximamenteComponent } from "../proximamente/proximamente.component";
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, CarruselComponent, DestacadosComponent, OfertasComponent, ProximamenteComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
