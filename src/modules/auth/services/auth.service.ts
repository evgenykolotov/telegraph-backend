import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { AuthDataDTO } from '../dto/auth-data.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import { JSONWebTokenService } from './jsonwebtoken.service';
import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { EXCEPTION_MESSAGES } from 'src/types/exception-messages.enum';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jsonwebtokenService: JSONWebTokenService,
  ) {}

  public async registration(dto: CreateUserDTO): Promise<AuthDataDTO> {
    const candidate = await this.findUserByEmail(dto.email);
    if (candidate)
      throw new BadRequestException(EXCEPTION_MESSAGES.FOUND_CANDIDATE);
    const user = await this.createUser(dto);
    return new AuthDataDTO(user);
  }

  public async login(dto: LoginUserDTO): Promise<AuthDataDTO> {
    const user = await this.findUserByEmail(dto.email);
    if (!user) throw new NotFoundException(EXCEPTION_MESSAGES.USER_NOT_FOUND);
    const isPassEquals = await bcrypt.compare(dto.password, user.password);
    if (!isPassEquals)
      throw new BadRequestException(EXCEPTION_MESSAGES.WRONG_AUTH_DATA);
    return new AuthDataDTO(user);
  }

  public async refresh(token: string): Promise<AuthDataDTO> {
    const userData = this.jsonwebtokenService.verifyRefreshToken(token);
    const user = await this.usersService.findUniqueById(userData.id);
    if (!userData || !user)
      throw new UnauthorizedException(EXCEPTION_MESSAGES.UNAUTHORIZED);
    return new AuthDataDTO(user);
  }

  private async findUserByEmail(email: User['email']): Promise<User> {
    return await this.usersService.findOneByEmail(email);
  }

  private async createUser(dto: CreateUserDTO): Promise<User> {
    const password = await this.hashPassword(dto.password);
    return await this.usersService.createUser({ ...dto, password });
  }

  private async hashPassword(password: User['password']): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
