import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
  private users: User[] = [
    { id: 1, name: 'Felipe', email: 'felipe@test.com', role: 'admin' },
    { id: 2, name: 'Bob', email: 'bob@dylan.com', role: 'editor' },
    { id: 3, name: 'Corey', email: 'corey@taylor.com', role: 'viewer' }
  ];

  getAll(): User[] { return [...this.users]; }
  getById(id: number): User | undefined { return this.users.find(u => u.id === id); }
  create(user: User) { user.id = this.users.length + 1; this.users.push(user); }
  update(id: number, user: User) {
    const index = this.users.findIndex(u => u.id === id);
    if (index > -1) this.users[index] = { ...user, id };
  }
  delete(id: number) { this.users = this.users.filter(u => u.id !== id); }
}
