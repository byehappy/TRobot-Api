import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as process from 'process';
import { ObjectId } from 'mongodb';

const jwtService = new JwtService({
  secret: process.env.SECRETJWT,
  signOptions: { expiresIn: '1h' },
});

export const createTestToken = (user: Partial<User>) => {
  return jwtService.sign({
    login: user.login,
    email: user.email,
    id: user.id,
    role: user.role,
  });
};

export const mockUser: User = {
  id: new ObjectId().toHexString(),
  email: 'admin@example.com',
  passwordHash: 'hashedpassword', // Обычно это будет хэшированный пароль
  login: 'Admin User',
  role: 'ADMIN', // Или другая роль, имеющая доступ к действиям администратора
  refreshToken: null, // Добавьте недостающее свойство
};

export const mockTeacherUser: User = {
  id: new ObjectId().toHexString(),
  email: 'teacher@example.com',
  passwordHash: 'hashedpassword', // Обычно это будет хэшированный пароль
  login: 'Teacher User',
  role: 'TEACHER', // Роль учителя
  refreshToken: null, // Добавьте недостающее свойство
};

export const mockRegularUser: User = {
  id: new ObjectId().toHexString(),
  email: 'user@example.com',
  passwordHash: 'hashedpassword',
  login: 'Regular User',
  role: 'USER', // Роль обычного пользователя, не имеющего доступа к действиям администратора или учителя
  refreshToken: null,
};
