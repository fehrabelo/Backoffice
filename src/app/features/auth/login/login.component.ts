import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  form!: FormGroup<{ email: FormControl<string | null>; password: FormControl<string | null>; }>;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}
 
  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
  this.form = this.fb.group({
    email: ['felipe@test.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required]
  });
  }

  submit() {
    const { email, password } = this.form.value;
    if (this.auth.login(email!, password!)) {
      this.router.navigate(['/']);
    } else {
      alert('Credenciais inválidas');
    }
  }
}
