import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma.service';
import { Prisma, Role, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
  }

  async findById(id: string): Promise<User> {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!findUser) {
      throw new NotFoundException('Пользователь с данным id не существует');
    }
    return findUser;
  }

  async getUserByEmail(email: string):Promise<User> {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async getUserByLogin(login: string):Promise<User> {
    return await this.prisma.user.findFirst({
      where: {
        login: login,
      },
    });
  }

  async registration(userData: CreateUserDto): Promise<User> {
    // Проверяем, существует ли пользователь с таким логином или email

    const userByEmail = await this.getUserByEmail(userData.email);
    if (userByEmail) {
      throw new ConflictException('Пользователь с таким email уже существует', 'email');
    }
    const userByLogin = await this.getUserByLogin(userData.login);
    if (userByLogin) {
      throw new ConflictException('Пользователь с таким логином уже существует', 'login');
    }

    const payload = { login: userData.login, email: userData.email };
    const refreshToken = await this.generateRefreshToken(payload);
    const password = await bcrypt.hash(userData.passwordHash, 10);

    return this.prisma.user.create({
      data: {
        ...userData,
        refreshToken: refreshToken,
        passwordHash: password,
      },
    });
  }

  async validateUser(login:string,password:string):Promise<User> {
    const userValid = await this.getUserByLogin(login);
    const passwordValid = await bcrypt.compare(password, userValid.passwordHash);
    if (userValid && passwordValid) {
      return userValid;
    }
    if(!userValid){
    throw new ConflictException('Неправильный логин');
    } else if (!passwordValid){
      throw new ConflictException('Неправильный пароль');
    }
  }

  async login(login:string,password:string) {
    const user = await this.validateUser(login,password)
    const payload = {login:user.login,email:user.email,id:user.id,role:user.role}
    const refreshTokenValid = this.validateRefreshToken(user.refreshToken);
    if(!refreshTokenValid){
      const refreshToken = this.generateRefreshToken({ login: user.login, email: user.email })
      await this.updateRefreshToken(user.id,refreshToken)
      return {
        accessToken: await this.jwtService.signAsync(payload,{expiresIn:'3h'}),
        refreshToken: refreshToken
      }
    }
    return{
      accessToken: await this.jwtService.signAsync(payload,{expiresIn:'3h'}),
      refreshToken: user.refreshToken
    }
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      throw new NotFoundException('Данный пользователь не существует');
    }
    if (updateUserDto.passwordHash) {
      updateUserDto.passwordHash = await bcrypt.hash(updateUserDto.passwordHash, 10);
    }
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
        where,
      },
    );
  }

  async refreshTokens(tokens: { accessToken: string; refreshToken: string }) {
    const userInToken = this.decodeToken(tokens.accessToken)
    const user = await this.findById(userInToken.id);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Доступ запрещен');

    const accessTokenValid = this.validateAccessToken(tokens.accessToken);
    const refreshTokenValid = this.validateRefreshToken(tokens.refreshToken);

    // Проверяем, истек ли срок действия access token
    if (!accessTokenValid) {
      // Если истек срок действия refresh token, обновляем оба токена
      if (!refreshTokenValid) {
        const accessPayload = {login:user.login,email:user.email,id:user.id,role:user.role};
        const refreshPayload = { login: user.login, email: user.email };
        const newAccessToken = this.generateAccessToken(accessPayload);
        const newRefreshToken = this.generateRefreshToken(refreshPayload);
        await this.updateRefreshToken(user.id,newRefreshToken)
        // Возвращаем новые токены
        return {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          user
        };
      }

      // Генерируем новый access token
      const payload = { login: user.login, email: user.email };
      const newAccessToken = this.generateAccessToken(payload);

      // Возвращаем новые токены
      return {
        accessToken: newAccessToken,
        refreshToken: tokens.refreshToken,
        user
      };
    }

    // Проверяем, истек ли срок действия refresh token
    if (!refreshTokenValid) {
      // Если истек срок действия refresh token, обновляем только refresh token
      const newRefreshToken = this.generateRefreshToken({ login: user.login, email: user.email });

      // Обновляем refresh token в базе данных
      await this.updateRefreshToken(user.id, newRefreshToken);

      // Возвращаем новый refresh token и старый access token
      return {
        accessToken: tokens.accessToken,
        refreshToken: newRefreshToken,
        user
      };
    }

    // Токены валидны, возвращаем их без изменений
    return {
      accessToken:tokens.accessToken,
      refreshToken:tokens.refreshToken,
      user
    };
  }

  private async updateRefreshToken(userId: string, newRefreshToken: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: newRefreshToken },
    });
  }

  private validateAccessToken(accessToken: string): boolean {
    try {
      this.jwtService.verify(accessToken);
      return true;
    } catch (error) {
      return false;
    }
  }

  private validateRefreshToken(refreshToken: string): boolean {
    try {
      this.jwtService.verify(refreshToken);
      return true;
    } catch (error) {
      return false;
    }
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '3h' });
  }

  private generateRefreshToken(payload: any): string {
    return this.jwtService.sign(payload, { expiresIn: '30d' });
  }

  decodeToken(token: string) {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new Error('Невозможно расшифровать токен');
    }
  }

  changeUserRole(user:User,role:Role){
    return this.prisma.user.update({
      where:{
        id:user.id
      },
      data:{
        role:role
      }
    })
  }
}
