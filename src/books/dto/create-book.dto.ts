import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDateString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'The Great Gatsby',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'A novel set in the 1920s about the American dream.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Published date of the book',
    example: '1925-04-10',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  publishedDate?: string;

  @ApiProperty({
    description: 'Author ID of the book',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  authorId: string;
}
