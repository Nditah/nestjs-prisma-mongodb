import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  Max,
  Min,
  IsOptional,
  IsISBN,
  IsString,
} from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field(() => String, { description: 'Book title' })
  @MaxLength(300)
  @IsNotEmpty()
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'Book International Standard Book Number',
  })
  @IsOptional()
  @IsISBN()
  isbn?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Book Description or extract',
  })
  @IsOptional()
  description?: string;

  @Field(() => String, { nullable: true, description: 'Book Author' })
  @IsOptional()
  author?: string;

  @Field(() => String, { description: 'Book Publisher' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  publisher: string;

  @Field(() => Int, { description: 'Year the book is published' })
  @Min(1001)
  @Max(2030)
  publishedYear: number;
}
