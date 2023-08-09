import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import {AuthDto, RefreshTokenDto, RegisterDto} from './dto/Auth.dto';
import { PrismaService } from '../prima/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async login(dto: AuthDto) {
    try {
      const user = await this.validateUser(dto);

      if (!user) new NotFoundException('User not found');

      const tokens = await this.issueTokens(user.id);

      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async register(dto: RegisterDto) {
    try {
      const oldUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (oldUser) new BadRequestException('User already exists');

      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: await hash(dto.password),
        },
      });

      const tokens = await this.issueTokens(user.id);

      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  async getNewTokens(dto: RefreshTokenDto) {
    try {
      const result = await this.jwt.verifyAsync(dto.refreshToken);

      if (!result) new UnauthorizedException('Invalid refresh token');

      const user = await this.prisma.user.findUnique({
        where: { id: result.id },
      });

      const tokens = await this.issueTokens(user.id);

      return {
        user: this.returnUserFields(user),
        ...tokens,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  private returnUserFields(user: User) {
    try {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  private async issueTokens(userId: number) {
    try {
      const payload = { id: userId };

      return {
        accessToken: this.jwt.sign(payload, {
          expiresIn: '15m',
        }),
        refreshToken: this.jwt.sign(payload, {
          expiresIn: '7d',
        }),
      };
    } catch (e) {
      throw new Error(e);
    }
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await verify(user.password, dto.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }
}
