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
  template: `
    <h2>{{ editing ? 'Editar Chamado' : 'Novo Chamado' }}</h2>

    <form [formGroup]="form" (ngSubmit)="save()" class="form">
      <mat-form-field appearance="outline">
        <mat-label>Título</mat-label>
        <input matInput formControlName="title" required />
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Descrição</mat-label>
        <textarea matInput formControlName="description" rows="4"></textarea>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Prioridade</mat-label>
        <mat-select formControlName="priority" required>
          <mat-option value="low">Baixa</mat-option>
          <mat-option value="medium">Média</mat-option>
          <mat-option value="high">Alta</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Status</mat-label>
        <mat-select formControlName="status" required>
          <mat-option value="aberto">Aberto</mat-option>
          <mat-option value="em progresso">Em andamento</mat-option>
          <mat-option value="fechado">Fechado</mat-option>
        </mat-select>
      </mat-form-field>

      <div class="actions">
        <button mat-raised-button color="primary" type="submit">
          Salvar
        </button>
        <button mat-stroked-button color="warn" type="button" (click)="cancel()">
          Cancelar
        </button>
      </div>
    </form>
  `,
  styles: [`
    .form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      max-width: 600px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
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
    priority: ['medium', Validators.required],
    status: ['open', Validators.required]
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
