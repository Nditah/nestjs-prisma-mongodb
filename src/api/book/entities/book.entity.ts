import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Author } from 'src/api/author/entities/author.entity';
import { BaseModel } from 'src/common/models/base.model';

@InputType('BookInput')
@ObjectType({ description: 'Book model' })
export class Book extends BaseModel {
  @Field(() => String, { description: 'Book title' })
  title: string;

  @Field(() => String, {
    nullable: true,
    description: 'Book International Standard Book Number',
  })
  isbn?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Book Description or extract',
  })
  description?: string;

  @Field(() => Author, { nullable: true, description: 'Book Author' })
  author?: Author;

  @Field(() => String, { description: 'Book Publisher' })
  publisher: string;

  @Field(() => Int, { description: 'Year the book is published' })
  publishedYear: number;
}
