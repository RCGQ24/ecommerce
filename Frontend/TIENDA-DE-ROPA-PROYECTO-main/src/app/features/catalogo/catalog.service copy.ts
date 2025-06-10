import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private _products: Product[] = [
    new Product(
      1,
      'Camiseta Xoxo Gris Oscuro',
      63,
      'https://cdn.nude-project.com/cdn-cgi/image/width=600,height=800,quality=90,format=auto/images/productos/NP-SS24-TSHIRT-XOXO-GREY-1.png',
      ['#d9d4c7', '#232323']
    ),
    new Product(
      2,
      'Camiseta Xoxo Blanco Crema',
      63,
      'https://cdn.nude-project.com/cdn-cgi/image/width=600,height=800,quality=90,format=auto/images/productos/NP-SS24-TSHIRT-XOXO-WHITE-1.png',
      ['#d9d4c7', '#232323']
    ),
    new Product(
      3,
      'Pantalón Corto Solid Mesh Verde',
      68,
      'https://cdn.nude-project.com/cdn-cgi/image/width=600,height=800,quality=90,format=auto/images/productos/NP-SS24-SHORTS-CHERRY-GREEN-1.png',
      ['#1d3c34', '#232323']
    ),
    new Product(
      4,
      'Pantalón Corto Solid Mesh Negro',
      68,
      'https://cdn.nude-project.com/cdn-cgi/image/width=600,height=800,quality=90,format=auto/images/productos/NP-SS24-SHORTS-CHERRY-BLACK-1.png',
      ['#232323', '#1d3c34']
    ),
    new Product(
      5,
      'Camiseta Amor de Verano Crema',
      63,
      'LOVE_SD_TEE_EGRET_back_f8485c7f-0339-4fb9-bbff-9f579cbda580_800x.png',
      ['#f5f1e6', '#232323']
    )
  ];

  getProducts(): Product[] {
    return [...this._products];
  }

  findProduct(id: number): Product | undefined {
    return this._products.find(product => product.id === id);
  }
} 