import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../product.model';
import { CartService } from '../../gestion-carrito/cart.service';
import { CatalogService } from '../catalog.service';

@Component({
  selector: 'app-vista-detallada-producto',
  templateUrl: './vista-detallada-producto.component.html',
  styleUrl: './vista-detallada-producto.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class VistaDetalladaProductoComponent {
  product: Product | undefined;
  cartCount = 0;
  added = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private catalogService: CatalogService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.catalogService.findProduct(id).subscribe((product: Product) => {
      this.product = product;
    });
    this.cartService.items$.subscribe((items: any[]) => {
      this.cartCount = items.reduce((acc: any, item: any) => acc + item.quantity, 0);
    });
  }

  goToCatalogo() {
    this.router.navigate(['/catalogo']);
  }

  goToCarrito() {
    this.router.navigate(['/carrito']);
  }

  addToCart() {
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
}
