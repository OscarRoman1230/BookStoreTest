import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorsService } from 'src/authors/authors.service';
import {
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Authors')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new author',
    description:
      'Create a new author with name, biography and birthdate optional',
  })
  @ApiCreatedResponse({
    description: 'Author created successfully',
    schema: {
      example: {
        id: 'f3b4fa32-1d61-41f6-8d6e-08c1269fdc3f',
        name: 'Gabriel García Márquez',
        birthDate: '1927-03-06',
        bio: 'Autor colombiano ganador del Premio Nobel de Literatura.',
        createdAt: '2025-07-14T18:21:54.340Z',
        updatedAt: '2025-07-14T18:21:54.340Z',
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Validación fallida',
  })
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateAuthorDto) {
    return this.authorsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get a author',
    description: 'Get all authors',
  })
  @ApiResponse({
    status: 200,
    description: 'Get all authors successfully',
    schema: {
      example: [
        {
          id: 'uuid',
          name: 'Gabriel García Márquez',
          birthDate: '1927-03-06',
          bio: 'Autor colombiano...',
          createdAt: '2025-07-14T...',
          updatedAt: '2025-07-14T...',
        },
      ],
    },
  })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a author by ID',
    description: 'Get a specific author by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Get author by ID successfully',
  })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete a author by ID',
    description: 'Delete a specific author by their ID',
  })
  @ApiResponse({ status: 200, description: 'Author deleted successfully' })
  @ApiResponse({ status: 400, description: 'The author has associated books' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(id);
  }
}
