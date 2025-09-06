import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  template: 'user-form.component.html',
  styleUrl: 'user-form.component.scss'
})
export class UserFormComponent implements OnInit {

  form!: FormGroup<{ name: FormControl<string | null>; email: FormControl<string | null>; role: FormControl<string | null>; }>;
  editing = false;
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
   
  }
 
  ngOnInit(): void {
  this.buildForm();
  this.getUserIdByUrlParam();
  }

  buildForm() {
     this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required]
  });
  }
  
 getUserIdByUrlParam() {
   this.route.params.subscribe(params => {
      if (params['id']) {
        this.editing = true;
        this.userId = +params['id'];
        const user = this.userService.getById(this.userId);
        if (user) this.form.patchValue(user);
      }
    });
 }

  save() {
    if (this.form.invalid) return;

    const user = this.form.value as User;

    if (this.editing && this.userId) {
      this.userService.update(this.userId, user);
    } else {
      this.userService.create(user);
    }

    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
