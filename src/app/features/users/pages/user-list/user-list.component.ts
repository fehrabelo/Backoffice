import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConfirmDialogComponent } from '../../../../shared/componentes/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  template: `
    <div class="header">
      <h2>Usuários</h2>
      <button mat-raised-button color="primary" (click)="createUser()">
        <mat-icon>add</mat-icon> Novo Usuário
      </button>
    </div>

    <table mat-table [dataSource]="users" class="mat-elevation-z8 full-width">

      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef> Nome </th>
        <td mat-cell *matCellDef="let user">{{ user.name }}</td>
      </ng-container>

      <ng-container matColumnDef="email">
        <th mat-header-cell *matHeaderCellDef> Email </th>
        <td mat-cell *matCellDef="let user">{{ user.email }}</td>
      </ng-container>

      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef> Perfil </th>
        <td mat-cell *matCellDef="let user">{{ user.role }}</td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef> Ações </th>
        <td mat-cell *matCellDef="let user">
          <button mat-icon-button color="primary" (click)="editUser(user.id)">
            <mat-icon>edit</mat-icon>
          </button>
          <button mat-icon-button color="warn" (click)="confirmDelete(user.id)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayed"></tr>
      <tr mat-row *matRowDef="let row; columns: displayed"></tr>
    </table>
  `,
  styles: [`
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 16px;
    }
    .full-width { width: 100%; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayed = ['name', 'email', 'role', 'actions'];

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {  }

ngOnInit(): void {
  this.loadUsers();
}
  loadUsers() {
    this.users = this.userService.getAll();
  }

  createUser() {
    this.router.navigate(['/users/new']);
  }

  editUser(id: number) {
    this.router.navigate(['/users', id, 'edit']);
  }

  confirmDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Deseja excluir este usuário?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(id);
        this.loadUsers();
      }
    });
  }
}
