import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Product } from './product.model';
import { CatalogService } from './catalog.service';
import { CartService } from '../gestion-carrito/cart.service';
import { Observable, map, startWith, switchMap, BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.scss'
})
export class CatalogoComponent {
  cartCount = 0;
  criterioConsulta: string = '';
  private searchSubject = new BehaviorSubject<string>('');
  productosFiltrados$!: Observable<Product[]>;

  constructor(
    private catalogService: CatalogService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartService.items$.subscribe((items: any[]) => {
      this.cartCount = items.reduce((acc: any, item: any) => acc + item.quantity, 0);
    });

    this.route.queryParams.subscribe(params => {
      const busqueda = params['busqueda'] || '';
      this.criterioConsulta = busqueda;
      this.searchSubject.next(busqueda);
    });

    this.productosFiltrados$ = combineLatest([
      this.catalogService.getProducts(),
      this.searchSubject.asObservable()
    ]).pipe(
      map(([products, search]) =>
        products.filter(product =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  }

  loadProducts() {
    this.productosFiltrados$ = this.catalogService.getProducts().pipe(
      map(products =>
        products.filter(product =>
          product.name.toLowerCase().includes(this.criterioConsulta.toLowerCase())
        )
      )
    );
  }

  onSearchChange() {
    this.searchSubject.next(this.criterioConsulta);
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  goToCarrito(): void {
    this.router.navigate(['/carrito']);
  }
}
