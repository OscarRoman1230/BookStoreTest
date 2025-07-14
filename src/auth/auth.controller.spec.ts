import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockService = {
    login: jest.fn().mockResolvedValue({ access_token: 'mocked-token' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return token from service', async () => {
    const result = await controller.login({ username: 'admin', password: '123456' });
    expect(result).toEqual({ access_token: 'mocked-token' });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.login).toHaveBeenCalledWith('admin', '123456');
  });
});
