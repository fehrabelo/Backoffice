import { AttendantNamePipe } from './attendant-name.pipe';
import { UserService } from '../../../features/users/services/user.service';
import { TestBed } from '@angular/core/testing';

describe('AttendantNamePipe', () => {
  let pipe: AttendantNamePipe;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getById']);

    TestBed.configureTestingModule({
      providers: [
        AttendantNamePipe,
        { provide: UserService, useValue: spy }
      ]
    });

    pipe = TestBed.inject(AttendantNamePipe);
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should return user name if user exists', () => {
    userService.getById.and.returnValue({ id: 1, name: 'Felipe', email: '', role: 'admin' });
    expect(pipe.transform(1)).toBe('Felipe');
  });

  it('should return "---" if user does not exist', () => {
    userService.getById.and.returnValue(undefined);
    expect(pipe.transform(999)).toBe('---');
  });
});
