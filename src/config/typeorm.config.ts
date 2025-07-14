import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from '../books/entities/book.entity';
import { Author } from '../authors/entities/author.entity';

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 5432,
  username: DB_USER || 'postgres',
  password: DB_PASS || 'postgres',
  database: DB_NAME || 'books_db',
  entities: [Book, Author],
  synchronize: true, // ¡IMPORTANTE! Solo en dev
};
