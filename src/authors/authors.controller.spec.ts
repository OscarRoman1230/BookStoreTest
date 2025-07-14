import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

const mockAuthor = {
  id: 'uuid-1',
  name: 'Gabriel García Márquez',
};

describe('AuthorsController', () => {
  let controller: AuthorsController;
  let service: AuthorsService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockAuthor),
    findAll: jest.fn().mockResolvedValue([mockAuthor]),
    findOne: jest.fn().mockResolvedValue(mockAuthor),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [
        {
          provide: AuthorsService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthorsController>(AuthorsController);
    service = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an author', async () => {
    const dto = { name: 'Gabriel García Márquez' };
    const result = await controller.create(dto);
    expect(result).toEqual(mockAuthor);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all authors', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([mockAuthor]);
  });
});
