import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './app.html'
})
export class App {

  private authService = inject(AuthService);
  private router = inject(Router);

  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);
  }
}