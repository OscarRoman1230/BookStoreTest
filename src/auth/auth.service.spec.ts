import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return JWT on valid credentials', () => {
    const result = service.login('admin', '123456');
    expect(result).toEqual({ access_token: 'mocked-jwt-token' });
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: 'demo-uuid-123',
      username: 'admin',
    });
  });

  it('should throw on invalid credentials', () => {
    expect(() => service.login('wrong', 'wrong')).toThrow(
      UnauthorizedException,
    );
  });
});
