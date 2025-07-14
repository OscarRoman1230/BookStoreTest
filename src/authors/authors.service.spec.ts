import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';
import { Repository } from 'typeorm';

const mockAuthor = {
  id: 'uuid-1',
  name: 'Gabriel García Márquez',
  birthDate: '1927-03-06',
  bio: 'Autor colombiano',
};

describe('AuthorsService', () => {
  let service: AuthorsService;
  let repo: Repository<Author>;

  const mockRepo = {
    create: jest.fn().mockReturnValue(mockAuthor),
    save: jest.fn().mockResolvedValue(mockAuthor),
    find: jest.fn().mockResolvedValue([mockAuthor]),
    findOne: jest.fn().mockResolvedValue(mockAuthor),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        {
          provide: getRepositoryToken(Author),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
    repo = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an author', async () => {
    const result = await service.create({ name: 'Gabriel García Márquez' });
    expect(result).toEqual(mockAuthor);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(repo.create).toHaveBeenCalledWith({
      name: 'Gabriel García Márquez',
    });
  });

  it('should return all authors', async () => {
    const result = await service.findAll();
    expect(result).toEqual([mockAuthor]);
  });

  it('should return one author', async () => {
    const result = await service.findOne('uuid-1');
    expect(result).toEqual(mockAuthor);
  });
});
