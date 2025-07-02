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
  showProductosModal = false;
  showEditarModal = false;
  productos: any[] = [];
  accion: 'editar' | 'eliminar' | null = null;
  productoSeleccionado: any = null;

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

  abrirModalProductos(accion: 'editar' | 'eliminar') {
    this.accion = accion;
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.showProductosModal = true;
    });
  }

  cerrarModalProductos() {
    this.showProductosModal = false;
    this.accion = null;
  }

  seleccionarProductoParaEditar(producto: any) {
    this.productoSeleccionado = producto;
    this.showEditarModal = true;
  }

  cerrarEditarModal() {
    this.showEditarModal = false;
    this.productoSeleccionado = null;
  }

  eliminarProducto(producto: any) {
    // Aquí puedes agregar confirmación si quieres
    this.productosService.eliminarProducto(producto.id).subscribe(() => {
      this.productos = this.productos.filter(p => p.id !== producto.id);
    });
  }

  guardarCambiosProducto() {
    if (!this.productoSeleccionado) return;
    this.productosService.actualizarProducto(this.productoSeleccionado.id, this.productoSeleccionado).subscribe(() => {
      // Actualizar la lista local de productos si es necesario
      const idx = this.productos.findIndex(p => p.id === this.productoSeleccionado.id);
      if (idx !== -1) {
        this.productos[idx] = { ...this.productoSeleccionado };
      }
      this.cerrarEditarModal();
    });
  }
}