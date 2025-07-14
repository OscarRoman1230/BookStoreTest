import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockBook = {
  id: 'book-uuid',
  title: 'Cien años de soledad',
  description: 'Una historia épica de la familia Buendía.',
  publishedDate: '1967-05-30',
  author: {
    id: 'author-uuid',
    name: 'Gabriel García Márquez',
  },
};

describe('BooksService', () => {
  let service: BooksService;
  let bookRepo: Repository<Book>;
  let authorRepo: Repository<Author>;

  const mockBookRepo = {
    create: jest.fn().mockReturnValue(mockBook),
    save: jest.fn().mockResolvedValue(mockBook),
    findAndCount: jest.fn().mockResolvedValue([[mockBook], 1]),
    findOne: jest.fn().mockResolvedValue(mockBook),
    findOneBy: jest.fn().mockResolvedValue(mockBook),
    delete: jest.fn().mockResolvedValue(undefined),
  };

  const mockAuthorRepo = {
    findOneBy: jest.fn().mockResolvedValue(mockBook.author),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        { provide: getRepositoryToken(Book), useValue: mockBookRepo },
        { provide: getRepositoryToken(Author), useValue: mockAuthorRepo },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookRepo = module.get(getRepositoryToken(Book));
    authorRepo = module.get(getRepositoryToken(Author));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a book', async () => {
    const dto = {
      title: 'Cien años de soledad',
      description: 'Una historia épica',
      publishedDate: '1967-05-30',
      authorId: 'author-uuid',
    };

    const result = await service.create(dto);
    expect(result).toEqual(mockBook);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(bookRepo.create).toHaveBeenCalledWith({
      ...dto,
      author: mockBook.author,
    });
  });

  it('should throw if author not found', async () => {
    jest.spyOn(authorRepo, 'findOneBy').mockResolvedValueOnce(null);
    await expect(
      service.create({ ...mockBook, authorId: 'invalid-id' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return paginated list of books', async () => {
    const result = await service.findAll({ title: '', page: 1, limit: 10 });
    expect(result).toEqual({ data: [mockBook], total: 1 });
  });

  it('should find a book by id', async () => {
    const result = await service.findOne('book-uuid');
    expect(result).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const updated = await service.update('book-uuid', {
      title: 'Nuevo título',
    });
    expect(updated).toEqual(mockBook);
  });

  it('should remove a book', async () => {
    await expect(service.remove('book-uuid')).resolves.toBeUndefined();
  });
});
