import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Book } from 'src/books/entities/book.entity';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { Author } from 'src/authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(dto: CreateBookDto): Promise<Book> {
    const author = await this.authorRepository.findOneBy({ id: dto.authorId });
    if (!author) {
      throw new NotFoundException('Autor no encontrado');
    }

    const book = this.bookRepository.create({
      ...dto,
      author,
    });

    return this.bookRepository.save(book);
  }

  async findAll(query?: {
    title?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: Book[]; total: number }> {
    const { title = '', page = 1, limit = 10 } = query || {};
    const skip = (page - 1) * limit;

    const [data, total] = await this.bookRepository.findAndCount({
      where: {
        title: ILike(`%${title}%`),
      },
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return { data, total };
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) throw new NotFoundException('Libro no encontrado');
    return book;
  }

  async update(id: string, dto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException('Libro no encontrado');

    if (dto.authorId) {
      const author = await this.authorRepository.findOneBy({
        id: dto.authorId,
      });
      if (!author) throw new NotFoundException('Autor no encontrado');
      book.author = author;
    }

    Object.assign(book, dto);
    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id });
    if (!book) throw new NotFoundException('Libro no encontrado');
    await this.bookRepository.delete(id);
  }
}
