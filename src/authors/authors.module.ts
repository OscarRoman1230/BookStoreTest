import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './entities/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  exports: [TypeOrmModule],
})
export class AuthorsModule {}
