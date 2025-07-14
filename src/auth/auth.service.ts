import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly hardcodedUser = {
    username: 'admin',
    password: '123456',
    userId: 'demo-uuid-123',
  };

  validateUser(username: string, password: string) {
    if (
      username === this.hardcodedUser.username &&
      password === this.hardcodedUser.password
    ) {
      return { userId: this.hardcodedUser.userId, username };
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  login(username: string, password: string) {
    const user = this.validateUser(username, password);
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
