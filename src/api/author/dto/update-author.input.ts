import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateAuthorInput } from './create-author.input';

@InputType()
export class UpdateAuthorInput extends PartialType(CreateAuthorInput) {
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'PrimaryKey' })
  id: string;
}
