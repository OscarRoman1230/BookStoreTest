import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException('Autor no encontrado');
    }
    return author;
  }

  async remove(id: string): Promise<void> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) throw new NotFoundException('Autor no encontrado');
    if (author.books?.length) {
      throw new BadRequestException('El autor tiene libros asociados');
    }

    await this.authorRepository.delete(id);
  }
}
