import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from 'src/books/books.service';
import { CreateBookDto } from './dto/create-book.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBearerAuth,
  ApiTags, ApiResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Books')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Libro creado exitosamente' })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateBookDto) {
    return this.booksService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all books',
    description:
      'Retrieve a list of books with optional title filtering and pagination',
  })
  @ApiResponse({
    status: 200,
    description: 'List of books retrieved successfully with pagination',
    schema: {
      example: {
        total: 1,
        data: [
          {
            id: 'uuid',
            title: 'Cien años de soledad',
            description: 'Una historia épica...',
            publishedDate: '1967-05-30',
            author: {
              id: 'uuid',
              name: 'Gabriel García Márquez',
            },
          },
        ],
      },
    },
  })
  findAll(
    @Query('title') title?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.booksService.findAll({
      title,
      page: Number(page),
      limit: Number(limit),
    });
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a book by ID',
    description: 'Retrieve a specific book by its ID',
  })
  @ApiResponse({ status: 200, description: 'Get book by ID successfully' })
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a book by ID',
    description: 'Update a specific book by its ID with partial data',
  })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateBookDto>) {
    return this.booksService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a book by ID',
    description: 'Delete a specific book by its ID',
  })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
