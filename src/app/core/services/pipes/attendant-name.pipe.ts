import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../../features/users/services/user.service';

@Pipe({ name: 'attendantName', pure: false })
export class AttendantNamePipe implements PipeTransform {
  constructor(private users: UserService) {}

  transform(userId: number): string {
    const user = this.users.getById(userId);
    return user ? user.name : '---';
  }
}
