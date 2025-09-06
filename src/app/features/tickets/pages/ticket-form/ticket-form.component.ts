import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TicketService } from '../../services/tickets.service';
import { Ticket } from '../../models/tickets';

@Component({
  selector: 'app-ticket-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: 'ticket-form.component.html',
  styleUrl: 'ticket-form.component.scss'
})
export class TicketFormComponent implements OnInit {
  
  form!: FormGroup<{ title: FormControl<string | null>; description: FormControl<string | null>; priority: FormControl<string | null>; status: FormControl<string | null>; }>;
  editing = false;
  ticketId?: number;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    
  }

ngOnInit(): void {
  this.buildForm();
  this.getTicketIdByUrlParam();
}

  buildForm() {
   this.form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    status: ['', Validators.required]
  });
  }

 getTicketIdByUrlParam() {
   this.route.params.subscribe(params => {
      if (params['id']) {
        this.editing = true;
        this.ticketId = +params['id'];
        const ticket = this.ticketService.getById(this.ticketId);
        if (ticket) this.form.patchValue(ticket);
      }
    });
 }

  save() {
    if (this.form.invalid) return;

    const ticket = this.form.value as Ticket;

    if (this.editing && this.ticketId) {
      this.ticketService.update(this.ticketId, ticket);
      this.snackBar.open('Chamado atualizado com sucesso!', 'Fechar', { duration: 3000 });
    } else {
      this.ticketService.create(ticket);
      this.snackBar.open('Chamado criado com sucesso!', 'Fechar', { duration: 3000 });
    }

    this.router.navigate(['/tickets']);
  }

  cancel() {
    this.router.navigate(['/tickets']);
  }
}
