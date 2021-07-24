import { Injectable } from '@nestjs/common';
import { Role } from 'src/common/enum/role.enum';

// export type User = any;

class User {
  userId: string;
  username: string;
  password: string;
  role: Role[];

  constructor(id: string, name: string, pass: string, rol: Role[] = []) {
    this.userId = id;
    this.username = name;
    this.password = pass;
    this.role = rol;
  }
}

@Injectable()
export class UsersService {
  private readonly users = [
    new User('1', 'john', 'changeme', [Role.Admin, Role.User]),
    new User('2', 'maria', 'guess', [Role.User]),
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
