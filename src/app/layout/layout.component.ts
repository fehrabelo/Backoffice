import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../core/services/auth/auth.service';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,MatTabsModule],
  templateUrl: './layout.component.html',
  styleUrl:'./layout.component.scss'
})
export class LayoutComponent implements OnInit {
 selectedTabIndex = 0;
  constructor(private auth: AuthService,private router: Router) {}

  ngOnInit(): void {
    this.syncTabWithRoute();
  }

  logoutUser() {
    this.auth.logout();
  }

   onTabChange(index: number) {
    if (index === 0) {
      this.router.navigate(['/users']);
    } else if (index === 1) {
      this.router.navigate(['/tickets']);
    }
  }

  syncTabWithRoute() {
     this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('/users')) {
          this.selectedTabIndex = 0;
        } else if (event.url.includes('/tickets')) {
          this.selectedTabIndex = 1;
        }
      }
    });
  }

}
