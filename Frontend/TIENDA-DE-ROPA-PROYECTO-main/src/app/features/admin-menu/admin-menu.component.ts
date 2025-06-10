import { Component } from '@angular/core';
import { Router } from '@angular/router';
import{RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  imports: [CommonModule, RouterModule]
})
export class AdminMenuComponent {
  esAdmin = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    // Validar si el usuario es administrador
    this.esAdmin = usuario?.rol === 'admin';

    // Depuración: Verificar el usuario en la consola
    console.log('Usuario cargado:', usuario);
    console.log('¿Es admin?:', this.esAdmin);
  }

  irA(ruta: string) {
    console.log('Navegando a:', ruta); // <-- Agrega esto
    this.router.navigateByUrl(ruta);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}