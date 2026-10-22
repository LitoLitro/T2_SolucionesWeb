import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { ProductosComponent } from './pages/productos/productos';
import { PedidosComponent } from './pages/pedidos/pedidos';

import { LayoutComponent } from './components/sidebar/sidebar';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Pantalla de inicio de sesión, sin sidebar
  {
    path: 'login',
    component: LoginComponent
  },

  // Layout que contiene el sidebar y las páginas protegidas
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'productos',
        component: ProductosComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent
      },
      {
        path: '',
        redirectTo: 'productos',
        pathMatch: 'full'
      }
    ]
  },

  // Rutas desconocidas
  {
    path: '**',
    redirectTo: 'login'
  }
];