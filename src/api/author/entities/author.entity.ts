import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { Book } from 'src/api/book/entities/book.entity';
import { BaseModel } from 'src/common/models/base.model';

@InputType('AuthorInput')
@ObjectType({ description: 'Author model' })
export class Author extends BaseModel {
  @Field(() => String, { description: 'Author first Name' })
  firstName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Author middle Name',
  })
  middleName?: string;

  @Field(() => String, {
    description: 'Author last Name',
  })
  lastName: string;

  @Field(() => String, { description: 'Author email' })
  email: string;

  @Field(() => String, { nullable: true, description: 'Author phone' })
  phone?: string;

  @Field(() => [Book], { nullable: true, description: 'Author array of Books' })
  books?: Book[];
}
