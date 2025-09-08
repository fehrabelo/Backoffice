import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Ticket } from '../../models/tickets';
import { TicketService } from '../../services/tickets.service';
import { ConfirmDialogComponent } from '../../../../shared/componentes/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { HasPermissionDirective } from '../../../auth/directives/haspermission/haspermission.directive';
import { CanEditTicketDirective } from '../../../auth/directives/can-edit-ticket/caneditticket.directive';
import { UserService } from '../../../users/services/user.service';
import { User } from '../../../users/models/user';
import { AttendantNamePipe } from '../../../../core/services/pipes/attendant-name.pipe';


@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule,
  MatTableModule, 
  MatButtonModule, 
  MatIconModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatSortModule,
  HasPermissionDirective,
  CanEditTicketDirective,
  AttendantNamePipe ],
  templateUrl:'./ticket-list.component.html' ,
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit,AfterViewInit {
  tickets: Ticket[] = [];
  attendantData: User[] = [];
  displayed = ['id','title', 'status','attendant', 'priority', 'createdAt','actions'];
  dataSource = new MatTableDataSource<Ticket>();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private ticketService: TicketService, 
    private router: Router,
    private dialog: MatDialog,
    private users: UserService
  ) {}

  ngOnInit(): void {
    this.loadTickets();
  }
  ngAfterViewInit(): void {
     this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data: Ticket, filter: string) => {
      const search = filter.trim().toLowerCase();
      return (
        data.title.toLowerCase().includes(search) ||
        data.id.toString().includes(search)
      );
    };

    this.bindPaginatorAndSort()
  }

  loadTickets() {
    const getAllTickets = this.ticketService.getAll();
    this.dataSource.data = getAllTickets;
    this.dataSource.sort = this.sort; 
    this.tickets = getAllTickets;
     this.getUsersById();
  }

 getUsersById() {
  this.attendantData = this.tickets
    .map(m => this.users.getById(m.assignedTo))
    .filter((u): u is User => !!u); 
}
  
   private bindPaginatorAndSort() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.dataSource.filter = value.trim().toLowerCase();
  }

  createTicket() {
    this.router.navigate(['/tickets/new']);
  }

  editTicket(id: number) {
    this.router.navigate(['/tickets', id, 'edit']);
  }

  confirmDelete(id: number) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: { message: 'Deseja excluir esse ticket?' }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.ticketService.delete(id);
          this.loadTickets();
        }
      });
    }
}
