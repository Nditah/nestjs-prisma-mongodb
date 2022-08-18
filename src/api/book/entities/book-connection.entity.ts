import { ObjectType } from '@nestjs/graphql';
import PaginatedResponse from 'src/common/pagination/pagination';
import { Book } from './book.entity';

@ObjectType()
export class BookConnection extends PaginatedResponse(Book) { }
