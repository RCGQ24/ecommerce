import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from '../product.model';
import { CartService } from '../../gestion-carrito/cart.service';
import { CatalogService } from '../catalog.service';
import { AuthService } from '../../../services/auth.service';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-vista-detallada-producto',
  templateUrl: './vista-detallada-producto.component.html',
  styleUrl: './vista-detallada-producto.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class VistaDetalladaProductoComponent {
  product: Product | undefined;
  cartCount = 0;
  added = false;
  showLoginModal = false;
  
  // Variables para admin
  isAdmin = false;
  isEmpleado = false;
  showEditModal = false;
  showDeleteModal = false;
  editingProduct: any = null;
  originalProductData: any = null;
  
  // Mapeo de categorías
  categorias: { [key: number]: string } = {
    1: 'Deportivo',
    2: 'Casual', 
    3: 'Formal',
    4: 'Uniforme'
  };

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private catalogService: CatalogService,
    private authService: AuthService,
    private productosService: ProductosService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Cargar datos originales del backend para admin
    if (this.authService.hasRole(['admin'])) {
      this.productosService.obtenerProductos().subscribe((productos: any[]) => {
        const productoOriginal = productos.find((p: any) => p.id === id);
        if (productoOriginal) {
          this.originalProductData = productoOriginal;
        }
      });
    }
    
    this.catalogService.findProduct(id).subscribe((product: Product) => {
      this.product = product;
    });
    this.cartService.items$.subscribe((items: any[]) => {
      this.cartCount = items.reduce((acc: any, item: any) => acc + item.quantity, 0);
    });
    
    // Verificar roles
    this.isAdmin = this.authService.hasRole(['admin']);
    this.isEmpleado = this.authService.hasRole(['empleado']);
  }

  // Función para determinar si mostrar el botón de añadir al carrito
  get showAddToCartButton(): boolean {
    return !this.isEmpleado; // No mostrar si es empleado
  }

  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  goToCarrito() {
    this.router.navigate(['/carrito']);
  }

  addToCart() {
    if (!this.authService.isAuthenticated) {
      this.showLoginModal = true;
      return;
    }

    if (this.product) {
      this.cartService.addToCart({
        id: this.product.id,
        name: this.product.name,
        price: this.product.price,
        quantity: 1,
        image: this.product.image
      });
      this.added = true;
      setTimeout(() => this.added = false, 1200);
    }
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  goToLogin() {
    this.showLoginModal = false;
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  // Funciones para admin
  editProduct() {
    if (this.originalProductData) {
      this.editingProduct = { ...this.originalProductData };
      this.showEditModal = true;
    } else if (this.product) {
      // Fallback si no tenemos los datos originales
      this.editingProduct = { ...this.product };
      this.showEditModal = true;
    }
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editingProduct = null;
  }

  saveProductChanges() {
    if (this.editingProduct) {
      // Validación básica
      if (!this.editingProduct.nombre_producto || !this.editingProduct.precio || !this.editingProduct.id_categoria || 
          !this.editingProduct.url_imagen || !this.editingProduct.talla || !this.editingProduct.stock) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }
      
      // Convertir tipos de datos para el backend
      const productoParaEnviar = {
        ...this.editingProduct,
        precio: parseFloat(this.editingProduct.precio),
        id_categoria: parseInt(this.editingProduct.id_categoria),
        stock: parseInt(this.editingProduct.stock)
      };
      
              this.productosService.actualizarProducto(this.editingProduct.id, productoParaEnviar).subscribe({
        next: () => {
          // Actualizar los datos originales
          if (this.originalProductData) {
            Object.assign(this.originalProductData, this.editingProduct);
          }
          // Actualizar el producto local
          if (this.product) {
            this.product.name = this.editingProduct.nombre_producto;
            this.product.price = this.editingProduct.precio;
            this.product.image = this.editingProduct.url_imagen;
          }
          this.closeEditModal();
          alert('Producto actualizado exitosamente');
        },
        error: (error) => {
          console.error('Error al actualizar producto:', error);
          if (error.status === 404) {
            alert('Producto no encontrado en el servidor');
          } else if (error.status === 500) {
            alert('Error interno del servidor. Verifica los datos ingresados.');
          } else {
            alert('Error al actualizar el producto: ' + (error.message || 'Error desconocido'));
          }
        }
      });
    }
  }

  deleteProduct() {
    if (this.product && confirm('¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer.')) {
      this.productosService.eliminarProducto(this.product.id).subscribe({
        next: () => {
          alert('Producto eliminado exitosamente');
          this.router.navigate(['/catalogo']);
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
          if (error.status === 404) {
            alert('Producto no encontrado en el servidor');
          } else if (error.status === 500) {
            alert('Error interno del servidor. No se pudo eliminar el producto.');
          } else {
            alert('Error al eliminar el producto: ' + (error.message || 'Error desconocido'));
          }
        }
      });
    }
  }

  // Función para obtener el nombre de la categoría actual
  getCategoriaActual(producto: any): string {
    if (producto && producto.id_categoria) {
      const categoriaId = producto.id_categoria as number;
      return this.categorias[categoriaId] || 'Categoría no encontrada';
    }
    return 'Categoría no encontrada';
  }
}
