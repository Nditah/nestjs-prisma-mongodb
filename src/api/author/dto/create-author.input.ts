import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsString,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'Author first Name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(300)
  firstName: string;

  @Field(() => String, {
    nullable: true,
    description: 'Author middle Name',
  })
  @IsOptional()
  @MaxLength(300)
  middleName?: string;

  @Field(() => String, {
    description: 'Author last Name',
  })
  @MaxLength(300)
  @IsNotEmpty()
  lastName: string;

  @Field(() => String, { description: 'Author email' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true, description: 'Author phone' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;
}
