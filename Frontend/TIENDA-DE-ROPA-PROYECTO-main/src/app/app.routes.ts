import { Routes } from '@angular/router';
import { FormIniciarsesionRegistroComponent } from './features/form-iniciarsesion-registro/form-iniciarsesion-registro.component';
import { CatalogoComponent } from './features/catalogo/catalogo.component';
import { GestionCarritoComponent } from './features/gestion-carrito/gestion-carrito.component';
import { AdminMenuComponent } from './features/admin-menu/admin-menu.component';
import { GestionProductosComponent } from './features/gestion-productos/gestion-productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VistaDetalladaProductoComponent } from './features/catalogo/vista-detallada-producto/vista-detallada-producto.component';
import { GestionPagoComponent } from './features/gestion-pago/gestion-pago.component';

export const routes: Routes = [
  { path: '', component: CatalogoComponent },
  { path: 'login', component: FormIniciarsesionRegistroComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'catalogo/:id', component: VistaDetalladaProductoComponent },
  { path: 'carrito', component: GestionCarritoComponent },
  { path: 'pago', component: GestionPagoComponent },
  { path: 'admin-menu', component: AdminMenuComponent },
  { path: 'gestion-productos', component: GestionProductosComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'factura/:id', loadComponent: () => import('./features/factura/factura.component').then(m => m.FacturaComponent) },
  // otras rutas...
];




