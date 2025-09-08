import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from '../models/user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should return all users', () => {
    const users = service.getAll();
    expect(users.length).toBe(7);
  });

  it('should get user by id', () => {
    const user = service.getById(1);
    expect(user).toBeTruthy();
    expect(user?.name).toBe('Felipe');
  });

  it('should return undefined if user not found', () => {
    const user = service.getById(999);
    expect(user).toBeUndefined();
  });

  it('should create a new user', () => {
    const newUser: User = { id: 0, name: 'Test', email: 'test@test.com', role: 'viewer' };
    service.create(newUser);
    const created = service.getById(8);
    expect(created).toBeTruthy();
    expect(created?.name).toBe('Test');
  });

  it('should update an existing user', () => {
    const updateUser: User = { id: 2, name: 'Updated Bob', email: 'bob@dylan.com', role: 'editor' };
    service.update(2, updateUser);
    const user = service.getById(2);
    expect(user?.name).toBe('Updated Bob');
  });

  it('should delete a user', () => {
    service.delete(1);
    const user = service.getById(1);
    expect(user).toBeUndefined();
  });
});
