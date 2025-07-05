import { Routes } from '@angular/router';
import { FormIniciarsesionRegistroComponent } from './features/form-iniciarsesion-registro/form-iniciarsesion-registro.component';
import { CatalogoComponent } from './features/catalogo/catalogo.component';
import { GestionCarritoComponent } from './features/gestion-carrito/gestion-carrito.component';
import { AdminMenuComponent } from './features/admin-menu/admin-menu.component';
import { GestionProductosComponent } from './features/gestion-productos/gestion-productos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { VistaDetalladaProductoComponent } from './features/catalogo/vista-detallada-producto/vista-detallada-producto.component';
import { GestionPagoComponent } from './features/gestion-pago/gestion-pago.component';
import { SupervisorComponent } from './features/supervisor/supervisor.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';
import { roleGuard } from './guards/role.guard';

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
  {
    path: 'supervisor',
    loadComponent: () => import('./features/supervisor/supervisor.component').then(m => m.SupervisorComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['supervisor'] }
  },
  {
    path: 'payment-history',
    loadComponent: () => import('./features/admin-menu/gestion-pago-admin/admin-payment-management.component').then(m => m.AdminPaymentManagementComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'user-payment-history',
    loadComponent: () => import('./features/gestion-pago/user-payment-history/user-payment-history.component').then(m => m.UserPaymentHistoryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'gestionar-pagos',
    loadComponent: () => import('./features/admin-menu/gestion-pago-admin/admin-payment-management.component').then(m => m.AdminPaymentManagementComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  {
    path: 'admin-payment-history',
    loadComponent: () => import('./features/admin-menu/admin-payment-history/admin-payment-history.component').then(m => m.AdminPaymentHistoryComponent),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['admin'] }
  },
  // otras rutas...
];




