import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <ng-container *ngIf="user; else notFound">
      <mat-card>
        <mat-card-header>
          <mat-card-title>{{ user.name }}</mat-card-title>
          <mat-card-subtitle>{{ user.role | uppercase }}</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>ID:</strong> {{ user.id }}</p>
        </mat-card-content>

        <mat-card-actions>
          <button mat-stroked-button color="primary" (click)="goBack()">
            <mat-icon>arrow_back</mat-icon> Voltar
          </button>
          <button mat-stroked-button color="accent" (click)="editUser()">
            <mat-icon>edit</mat-icon> Editar
          </button>
        </mat-card-actions>
      </mat-card>
    </ng-container>

    <ng-template #notFound>
      <p>Usuário não encontrado.</p>
      <button mat-stroked-button color="primary" (click)="goBack()">Voltar</button>
    </ng-template>
  `,
  styles: [`
    mat-card { max-width: 600px; margin: auto; }
    mat-card-actions { display: flex; justify-content: flex-end; gap: 8px; }
  `]
})
export class UserDetailComponent {
  user?: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.user = this.userService.getById(id);
    });
  }

  goBack() {
    this.router.navigate(['/users']);
  }

  editUser() {
    if (this.user) {
      this.router.navigate(['/users', this.user.id, 'edit']);
    }
  }
}
