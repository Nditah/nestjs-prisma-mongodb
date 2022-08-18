import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Author } from './author.entity';

@ObjectType()
export class AuthorConnection extends PaginatedResponse(Author) {}
