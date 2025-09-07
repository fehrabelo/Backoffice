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
CanEditTicketDirective],
  templateUrl:'./ticket-list.component.html' ,
  styleUrl: './ticket-list.component.scss'
})
export class TicketListComponent implements OnInit,AfterViewInit {
  tickets: Ticket[] = [];
  displayed = ['id','title', 'status', 'priority', 'actions'];
  dataSource = new MatTableDataSource<Ticket>();

   @ViewChild(MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort!: MatSort;

  constructor(private ticketService: TicketService, private router: Router,private dialog: MatDialog) {}

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
     this.dataSource.data = this.ticketService.getAll();
      this.dataSource.sort = this.sort; 
    //this.tickets = this.ticketService.getAll();
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
