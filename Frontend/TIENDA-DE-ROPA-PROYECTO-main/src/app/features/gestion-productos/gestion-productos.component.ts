import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../services/productos.service';
import { RouterModule, Router } from '@angular/router';


export class Producto {
  constructor(
    public name: string,
    public code: number,
    public type: string,
    public price: number,
    public images: string,
    public size: number,
    public stock: number // Nuevo atributo
  ) {}
}

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class GestionProductosComponent {
  private codigoActual = 1; // Inicia en 1

  producto = {
    name: '',
    code: 0, // Se asignará automáticamente
    type: '',
    price: 0,
    images: '',
    size: 0,
    stock: 0 // Nuevo atributo
  };
  mensajeError = '';
  productoValido = false;
  productosTemporales: Producto[] = [];

  typeToIdCategoria: { [key: string]: number } = {
    deportivo: 1,
    casual: 2,
    formal: 3,
    uniforme: 4
  };

  constructor(private productosService: ProductosService, public router: Router) {}

  validarProducto(event: Event) {
    event.preventDefault();

    // Validar que todos los datos sean correctos (sin code)
    if (
      !this.producto.name ||
      !this.producto.type ||
      this.producto.price <= 0 ||
      !this.producto.images ||
      this.producto.size <= 0 ||
      this.producto.stock < 0 // Validar stock
    ) {
      this.mensajeError = 'Datos inválidos, por favor revisa los campos';
      return;
    }

    // Asignar código autocreciente
    this.producto.code = this.codigoActual++;

    // Producto válido, añadirlo a la lista temporal
    this.productosTemporales.push(new Producto(
      this.producto.name,
      this.producto.code,
      this.producto.type,
      this.producto.price,
      this.producto.images,
      this.producto.size,
      this.producto.stock // Nuevo atributo
    ));
    this.productoValido = true;
    this.mensajeError = '';

    // Resetear formulario (sin code)
    this.producto = {
      name: '',
      code: 0,
      type: '',
      price: 0,
      images: '',
      size: 0,
      stock: 0 // Nuevo atributo
    };
  }

  anadirOtroProducto() {
    this.productoValido = false;
  }

  registrarProductos() {
    if (this.productosTemporales.length === 0) {
      this.mensajeError = 'No hay productos para registrar';
      return;
    }

    let exitos = 0;
    let errores = 0;

    this.productosTemporales.forEach(producto => {
      // 1. Consultar productos existentes para verificar nombre repetido
      this.productosService.obtenerProductos().subscribe({
        next: productosExistentes => {
          const nombreRepetido = productosExistentes.some(
            (p: any) => p.nombre_producto.toLowerCase() === producto.name.toLowerCase()
          );
          if (nombreRepetido) {
            errores++;
            alert(`El producto "${producto.name}" ya está registrado. No se va a registrar este producto.`);
            if (exitos + errores === this.productosTemporales.length) {
              this.productosTemporales = [];
              this.productoValido = false;
              this.mensajeError = errores === 0
                ? 'Todos los productos registrados correctamente'
                : `${exitos} productos registrados, ${errores} con error`;
            }
            return;
          }

          // Si no está repetido, registrar el producto
          const productoBackend = {
            nombre_producto: producto.name,
            id_categoria: producto.type,
            precio: producto.price,
            url_imagen: producto.images,
            talla: String(producto.size),
            stock: producto.stock
          };

          this.productosService.registrarProducto(productoBackend).subscribe(
            res => {
              exitos++;
              if (exitos + errores === this.productosTemporales.length) {
                this.productosTemporales = [];
                this.productoValido = false;
                this.mensajeError = errores === 0
                  ? 'Todos los productos registrados correctamente'
                  : `${exitos} productos registrados, ${errores} con error`;
              }
            },
            err => {
              errores++;
              if (exitos + errores === this.productosTemporales.length) {
                this.productosTemporales = [];
                this.productoValido = false;
                this.mensajeError = errores === 0
                  ? 'Todos los productos registrados correctamente'
                  : `${exitos} productos registrados, ${errores} con error`;
              }
            }
          );
        },
        error: err => {
          errores++;
          alert('Error al consultar productos existentes');
          if (exitos + errores === this.productosTemporales.length) {
            this.productosTemporales = [];
            this.productoValido = false;
            this.mensajeError = errores === 0
              ? 'Todos los productos registrados correctamente'
              : `${exitos} productos registrados, ${errores} con error`;
          }
        }
      });
    });
  }

  goToCatalogo() {
    this.router.navigateByUrl('/catalogo');
  }
}