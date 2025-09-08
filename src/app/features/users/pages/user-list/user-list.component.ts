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
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';

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
    MatDialogModule,
    MatSortModule,
  MatCardModule ],
  templateUrl: 'user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit,AfterViewInit  {
  users: User[] = [];
  displayed = ['name', 'email', 'role', 'actions'];
dataSource = new MatTableDataSource<User>();

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;

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

    this.bindPaginatorAndSort();
  }

  loadUsers() {
    const getAllUsers = this.userService.getAll();
    this.dataSource.data = getAllUsers;
    this.dataSource.sort = this.sort; 
    this.users = getAllUsers;
  }

  private bindPaginatorAndSort() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
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
