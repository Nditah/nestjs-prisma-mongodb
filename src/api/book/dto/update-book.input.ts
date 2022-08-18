import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateBookInput } from './create-book.input';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'PrimaryKey' })
  id: string;
}
