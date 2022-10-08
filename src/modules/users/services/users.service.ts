import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    return user;
  }

  public async createUser(userData: CreateUserDTO): Promise<User> {
    const newUser = await this.prismaService.user.create({
      data: {
        email: userData.email,
        password: userData.password,
        first_name: userData.firstName,
        last_name: userData.lastName,
      },
    });

    return newUser;
  }

  public async findUniqueById(id: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({ where: { id } });

    return user;
  }
}
