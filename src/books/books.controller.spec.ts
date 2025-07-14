import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

const mockBook = {
  id: 'book-uuid',
  title: 'Cien años de soledad',
  author: { id: 'author-uuid', name: 'Gabriel García Márquez' },
};

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  const mockService = {
    create: jest.fn().mockResolvedValue(mockBook),
    findAll: jest.fn().mockResolvedValue({ data: [mockBook], total: 1 }),
    findOne: jest.fn().mockResolvedValue(mockBook),
    update: jest.fn().mockResolvedValue(mockBook),
    remove: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a book', async () => {
    const dto = {
      title: 'Cien años de soledad',
      authorId: 'author-uuid',
    };
    const result = await controller.create(dto);
    expect(result).toEqual(mockBook);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should return all books', async () => {
    const result = await controller.findAll('', 1, 10);
    expect(result).toEqual({ data: [mockBook], total: 1 });
  });

  it('should return a book by id', async () => {
    const result = await controller.findOne('book-uuid');
    expect(result).toEqual(mockBook);
  });

  it('should update a book', async () => {
    const result = await controller.update('book-uuid', {
      title: 'Nuevo título',
    });
    expect(result).toEqual(mockBook);
  });

  it('should delete a book', async () => {
    const result = await controller.remove('book-uuid');
    expect(result).toBeUndefined();
  });
});
