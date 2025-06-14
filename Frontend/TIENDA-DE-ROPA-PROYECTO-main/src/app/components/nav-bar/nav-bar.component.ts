import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../features/gestion-carrito/cart.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar" *ngIf="!isLoginPage && !isSupervisorPage">
      <ul class="nav-list">
        <li>Hombre</li>
        <li>Colecciones</li>
        <li><a routerLink="/">Inicio</a></li>
      </ul>
      <div class="logo">ecommerce-app</div>
      <ul class="nav-list nav-list-right">
        <li>VE | USD $</li>
        <ng-container *ngIf="!authService.isAuthenticated">
          <li><a routerLink="/login">Iniciar Sesión</a></li>
        </ng-container>
        <ng-container *ngIf="authService.isAuthenticated">
          <li>
            <span>{{ authService.currentUser?.email }}</span>
            <button (click)="authService.logout()">Cerrar Sesión</button>
          </li>
          <li *ngIf="authService.hasRole(['admin'])">
            <a routerLink="/admin-menu">Admin</a>
          </li>
          <li *ngIf="authService.hasRole(['supervisor'])">
            <a routerLink="/supervisor">Supervisor</a>
          </li>
          <li *ngIf="!authService.hasRole(['admin'])">
            <a routerLink="/user-payment-history" class="nav-link">
              <i class="fas fa-history"></i>
              Mis Compras
            </a>
          </li>
        </ng-container>
        <li>
          <a routerLink="/carrito" class="cart-link">
            Carrito
            <span class="cart-count" *ngIf="cartCount > 0">{{ cartCount }}</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.2rem 2.5rem;
      background: linear-gradient(120deg, #2fc5a9 0%, #4b2fbb 100%);
      font-family: 'Inter', Arial, sans-serif;
      position: sticky;
      top: 0;
      z-index: 10;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .nav-list {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
      font-size: 1.08rem;
      font-weight: 500;
      color: black;

      a {
        color: inherit;
        text-decoration: none;
        transition: opacity 0.2s;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }
      }
    }

    .logo {
      font-size: 2.1rem;
      font-weight: 700;
      letter-spacing: 1px;
      color: #3a2d29;
      font-family: 'Inter', Arial, sans-serif;
    }

    .nav-list-right {
      gap: 1.5rem;
      font-size: 1rem;
      color: white;

      a {
        color: white;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        
        &:hover {
          opacity: 0.9;
        }

        i {
          font-size: 1.1rem;
        }
      }

      button {
        background: none;
        border: 1px solid white;
        color: white;
        padding: 0.3rem 0.8rem;
        border-radius: 4px;
        cursor: pointer;
        margin-left: 0.5rem;
        
        &:hover {
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .cart-link {
      position: relative;
      display: inline-block;
    }

    .cart-count {
      position: absolute;
      top: -10px;
      right: -18px;
      background: #2fc5a9;
      color: white;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 50%;
      width: 22px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.12);
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `]
})
export class NavBarComponent implements OnInit {
  cartCount = 0;
  isLoginPage = false;
  isSupervisorPage = false;

  constructor(
    public authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    // Subscribe to router events to check current page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url.includes('/login');
      this.isSupervisorPage = this.router.url.includes('/supervisor');
    });
  }

  ngOnInit() {
    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }
} 