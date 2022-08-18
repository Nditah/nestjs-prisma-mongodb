import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { BookPaginationArgs as PaginationArgs } from './book.pagination.args';
import { BookRecordOrder as RecordOrder } from './inputs/record-order.input';
import { BookConnection } from './entities/book-connection.entity';

@Resolver(() => Book)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book)
  async createBook(@Args('data') data: CreateBookInput) {
    return this.bookService.create(data);
  }

  @Query(() => BookConnection, { name: 'allBooks' })
  findAll(
    @Args()
    { skip, take, after, before, first, last, publishedYear }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => RecordOrder,
      nullable: true,
    })
    orderBy: RecordOrder,
  ) {
    const params = {
      query,
      orderBy,
      skip,
      take,
      after,
      before,
      first,
      last,
      publishedYear,
    };
    return this.bookService.findAll(params);
  }

  @Query(() => Book, { name: 'oneBook' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.bookService.findOne(id);
  }

  @Mutation(() => Book)
  updateBook(@Args('data') data: UpdateBookInput) {
    return this.bookService.update(data);
  }

  @Mutation(() => Book)
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }

  @Mutation(() => Book)
  dropBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.drop(id);
  }
}
