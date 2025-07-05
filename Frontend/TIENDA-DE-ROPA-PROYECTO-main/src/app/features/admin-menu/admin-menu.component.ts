import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ProductosService } from '../../services/productos.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule]
})
export class AdminMenuComponent implements OnInit {
  showConfirmModal = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    // Check if user is admin
    if (!this.authService.hasRole(['admin'])) {
      this.router.navigate(['/']);
      return;
    }
  }

  irA(ruta: string) {
    console.log('Navegando a:', ruta);
    this.router.navigateByUrl(ruta);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  cancelDeleteCarts() {
    this.showConfirmModal = false;
  }

  confirmDeleteCarts() {
    // Add logic to delete all carts here
    this.showConfirmModal = false;
    this.router.navigate(['/admin-menu']);
  }
}