import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { ConfirmDialogComponent } from '../../../../shared/componentes/confirm-dialog/confirm-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule],
  templateUrl: 'user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit,AfterViewInit  {
  users: User[] = [];
  displayed = ['name', 'email', 'role', 'actions'];
dataSource = new MatTableDataSource<User>();

@ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {  }

ngOnInit(): void {
  this.loadUsers();
}

ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: User, filter: string) => {
      const search = filter.trim().toLowerCase();
      return (
        data.name.toLowerCase().includes(search) ||
        data.email.toLowerCase().includes(search)
      );
    };
  }

  loadUsers() {
    //this.users = this.userService.getAll();
    this.dataSource.data = this.userService.getAll();
  }

   applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
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
